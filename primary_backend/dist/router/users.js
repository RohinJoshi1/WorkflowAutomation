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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = exports.router = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const index_1 = require("../db/index");
const types_1 = require("../types");
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.router = (0, express_1.Router)();
exports.router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    //Validate Email and password from db 
    const parsedData = types_1.SignUpSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Improper format provided"
        });
    }
    const { email, password, name } = parsedData.data;
    const user = yield index_1.prisma.user.findFirst({
        where: {
            email: email
        }
    });
    if (user) {
        return res.status(409).json({
            message: "User already exists"
        });
    }
    //await sendEmail()
    const newUser = yield index_1.prisma.user.create({
        data: {
            email: email,
            password: password,
            name: name
        }
    });
    res.status(200).json({
        message: "User created"
    });
}));
exports.router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    //Validate Email and password from db 
    const parsedData = types_1.SignInSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Improper format provided"
        });
    }
    const { email, password } = parsedData.data;
    const user = yield index_1.prisma.user.findFirst({
        where: {
            email: email,
            password: password
        }
    });
    if (!user) {
        return res.status(404).json({
            message: "User not found or password incorrect"
        });
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email
    }, config_1.JWT_SECRET);
    return res.status(200).json({
        token: token
    });
}));
exports.router.get("/", auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const id = req.id;
    //@ts-ignore
    const email = req.email;
    res.status(200).json({
        id: id,
        email: email
    });
}));
exports.userRouter = exports.router;
