import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
export function authMiddleware(req:Request, res:Response, next:NextFunction) {
    const token = req.headers.authorization;
    if(!token) return res.status(401).send("No token provided");
    const data = jwt.verify(token, JWT_SECRET);
    if(!data) return res.status(401).send("Invalid token");
    //@ts-ignore
    req.username = data.email
    //@ts-ignore
    req.id = data.id
    next();
}