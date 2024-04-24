"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRoute_1 = __importDefault(require("../routes/UserRoute"));
const web = (ports) => {
    const server = (0, express_1.default)();
    const port = ports;
    // Middleware to parse JSON request bodies
    server.use(express_1.default.json());
    server.get("/", (req, res) => {
        res.send('test server');
    });
    server.use('/user', UserRoute_1.default);
    server.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
};
exports.default = web;
