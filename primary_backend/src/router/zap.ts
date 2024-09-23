
import { Router } from "express";
import {authMiddleware}  from "../middleware/auth";
import { ZapCreateSchema } from "../types";
import { prisma } from "../db";

const router = Router();


router.post("/", authMiddleware, async (req, res) => {
    // @ts-ignore
    const id: string = req.id;
    const body = req.body;
    const parsedData = ZapCreateSchema.safeParse(body);
    
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }   
    console.log(parsedData.data);

    try {
        const zapId = await prisma.$transaction(async tx => {
            // Validate that all actionIds exist in AvailableAction
            const actionIds = parsedData.data.actions.map(x => x.availableActionId);
            const availableActions = await tx.availableAction.findMany({
                where: {
                    name: {
                        in: actionIds
                    }
                }
            });
            const zap = await tx.zap.create({
                data: {
                    userId: parseInt(id),
                    triggerId: "",
                    actions: {
                        create: availableActions.map((x, index) => ({
                            actionId: x.id,
                            sortingOrder: index
                        }))
                    }
                }
            });
            const triggerName = parsedData.data.availableTriggerId; 
            const availableTrigger = await tx.availableTrigger.findMany({
                where: {
                    name: {
                        in: [triggerName]
                    }
                },
            });
            const trigger = await tx.trigger.create({
                data: {
                    triggerId: availableTrigger[0].id,
                    zapId: zap.id
                }
            });

            await tx.zap.update({
                where: {
                    id: zap.id
                },
                data: {
                    triggerId: trigger.id
                }
            });

            return zap.id;
        });

        return res.json({
            zapId
        });
    } catch (error) {
        console.error("Error creating Zap:", error);
        return res.status(500).json({
            message: "Error creating Zap",
            error: error instanceof Error ? error.message : String(error)
        });
    }
});


router.get("/", authMiddleware, async (req, res) => {
    // @ts-ignore
    const id = req.id;
    const zaps = await prisma.zap.findMany({
        where: {
            userId: id
        },
        include: {
            actions: {
               include: {
                    type: true
               }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });

    return res.json({
        zaps
    })
})

router.get("/:zapId", authMiddleware, async (req, res) => {
    //@ts-ignore
    const id = req.id;
    const zapId = req.params.zapId;

    const zap = await prisma.zap.findFirst({
        where: {
            id: zapId,
            userId: id
        },
        include: {
            actions: {
               include: {
                    type: true
               }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });

    return res.json({
        zap
    })

})

export const zapRouter = router;