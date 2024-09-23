"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zapRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const types_1 = require("../types");
const db_1 = require("../db");
const router = (0, express_1.Router)();
router.post("/", auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const id = req.id;
    const body = req.body;
    const parsedData = types_1.ZapCreateSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }
    console.log(parsedData.data);
    try {
        const zapId = yield db_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            // Validate that all actionIds exist in AvailableAction
            const actionIds = parsedData.data.actions.map(x => x.availableActionId);
            const availableActions = yield tx.availableAction.findMany({
                where: {
                    name: {
                        in: actionIds
                    }
                }
            });
            const zap = yield tx.zap.create({
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
            const availableTrigger = yield tx.availableTrigger.findMany({
                where: {
                    name: {
                        in: [triggerName]
                    }
                },
            });
            const trigger = yield tx.trigger.create({
                data: {
                    triggerId: availableTrigger[0].id,
                    zapId: zap.id
                }
            });
            yield tx.zap.update({
                where: {
                    id: zap.id
                },
                data: {
                    triggerId: trigger.id
                }
            });
            return zap.id;
        }));
        return res.json({
            zapId
        });
    }
    catch (error) {
        console.error("Error creating Zap:", error);
        return res.status(500).json({
            message: "Error creating Zap",
            error: error instanceof Error ? error.message : String(error)
        });
    }
}));
router.get("/", auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const id = req.id;
    const zaps = yield db_1.prisma.zap.findMany({
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
    });
}));
router.get("/:zapId", auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const id = req.id;
    const zapId = req.params.zapId;
    const zap = yield db_1.prisma.zap.findFirst({
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
    });
}));
exports.zapRouter = router;
