import { Router } from "express";
import {prisma} from "../db/index"
const router = Router(); 

router.get("/available",async (req, res) => {
    try {
        const actions = await prisma.availableAction.findMany({
            where:{}
        });
        res.status(200).json(actions);
    } catch (error) {
        res.status(500).json({message: error});
    }
   
})

export const actionRouter = router;    