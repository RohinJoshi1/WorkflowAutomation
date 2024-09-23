import express from "express"
import { PrismaClient } from "@prisma/client"
const app = express()
const client = new PrismaClient()

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const userId = req.params.userId 
    const zapId = req.params.zapId 
    console.log("hook triggered")
    try {
        await client.$transaction(async tx =>{
            const zap = await tx.zapRun.create({
                data:{
                    metadata:{},
                    zapId:zapId
                }
            })
            const outbox = await tx.zapRunOutbox.create({
                data:{
                    zapRunId:zap.id,
                }
            })
        })
        return res.status(200).json({"message":`Created hook for zap ID : ${zapId}`});
    } catch (error) {
     console.log("error");  
     res.status(500).json({"message":`Error creating hook for zap ID : ${zapId}`});
    }
   
    console.log("hook done")
    
})
const port = 3002;
app.listen(port, () => {console.log(`hooks server listening on port ${port}`)});