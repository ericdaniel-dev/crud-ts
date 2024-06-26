"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web_1 = __importDefault(require("./application/web"));
require('dotenv').config();
const port = parseInt(process.env.PORT || '9000', 10);
const app = (0, web_1.default)(port);
