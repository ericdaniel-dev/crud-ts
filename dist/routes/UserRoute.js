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
const express_1 = __importDefault(require("express"));
const UserModel_1 = __importDefault(require("../model/UserModel"));
const UserRoute = express_1.default.Router();
UserRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserModel_1.default.getAllUsers();
    res.status(200).json({
        data: users.data
    });
}));
UserRoute.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required!' });
    }
    const data = yield UserModel_1.default.createUser(username, password, email);
    if (data.status === 'failed') {
        return res.status(400).json(data);
    }
    return res.status(200).json(data);
}));
UserRoute.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required!' });
    }
    const data = yield UserModel_1.default.userLogin(username, password);
    if (data.status === 'failed') {
        return res.status(400).json(data);
    }
    return res.status(200).json(data);
}));
UserRoute.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = parseInt(req.params.id, 10);
    if (isNaN(userID)) {
        return res.status(400).json({ error: 'Invalid User ID' });
    }
    const user = yield UserModel_1.default.getUserByID(userID);
    if (!user) {
        return res.status(404).json(user);
    }
    else {
        return res.status(200).json(user);
    }
}));
exports.default = UserRoute;
