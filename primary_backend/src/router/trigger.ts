import { Router } from "express";
import {prisma} from "../db/index"
const router = Router(); 


//Get all available triggers
router.get("/available",async (req, res) => {
    try {
        const triggers = await prisma.availableTrigger.findMany({
            where:{}
        });
        res.status(200).json(triggers);
    } catch (error) {
        res.status(500).json({message: error});
    }
   
})

export const triggerRouter = router;    