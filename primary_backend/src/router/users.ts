import e, { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import {prisma} from "../db/index" 
import { SignInSchema,SignUpSchema } from "../types";
import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";

export const router = Router();

router.post("/signup",async (req,res)=>{
    const body = req.body; 
    //Validate Email and password from db 
    const parsedData = SignUpSchema.safeParse(req.body);
    if(!parsedData.success){
        return res.status(411).json({
            message:"Improper format provided"
        })
    }
    const {email,password,name} = parsedData.data;
    const user = await prisma.user.findFirst({
        where:{
            email: email
        }
    });
    if(user){
        return res.status(409).json({
            message: "User already exists"
        })
    }
    //await sendEmail()
    const newUser = await prisma.user.create({
        data:{
            email: email,
            password: password,
            name: name
        }
    })
    res.status(200).json({
        message: "User created"
    })   

})
router.post("/signin",async (req,res)=>{
    const body = req.body; 
    //Validate Email and password from db 
    const parsedData = SignInSchema.safeParse(req.body);
    if(!parsedData.success){
        return res.status(411).json({
            message:"Improper format provided"
        })
    }
    const {email,password} = parsedData.data;
    const user = await prisma.user.findFirst({
        where:{
            email: email,
            password: password
        }
    });
    if(!user){
        return res.status(404).json({
            message: "User not found or password incorrect"
        })
    }
    
    const token = jwt.sign({
        id:user.id,
        email: user.email
    },JWT_SECRET)
    return res.status(200).json({
        token: token
    })
})
router.get("/",authMiddleware,async (req,res)=>{
    //@ts-ignore
    const id = req.id; 
    //@ts-ignore
    const email = req.email;
    res.status(200).json({
        id: id,
        email: email
    })
})

export const userRouter = router;