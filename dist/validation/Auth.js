"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
class Authentication {
    constructor() {
        this.secret = process.env.SECRET || '';
    }
    sign(user, expires = "2h") {
        const payload = {
            userID: user.id,
            username: user.username
        };
        return jsonwebtoken_1.default.sign(payload, this.secret, { expiresIn: expires });
    }
    verify(token) {
        try {
            jsonwebtoken_1.default.verify(token, this.secret);
            return true;
        }
        catch (e) {
            console.log(`Error JWT: ${e}`);
            return false;
        }
    }
    decode(token) {
        try {
            const decodedToken = jsonwebtoken_1.default.decode(token);
            return decodedToken;
        }
        catch (e) {
            console.error(`Error: ${e}`);
            return null;
        }
    }
}
const Auth = new Authentication();
exports.default = Auth;
