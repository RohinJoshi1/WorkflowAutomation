"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function authMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token)
        return res.status(401).send("No token provided");
    const data = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
    if (!data)
        return res.status(401).send("Invalid token");
    //@ts-ignore
    req.username = data.email;
    //@ts-ignore
    req.id = data.id;
    next();
}
exports.authMiddleware = authMiddleware;
