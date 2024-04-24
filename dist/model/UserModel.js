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
const database_1 = require("../application/database");
const EscapeString_1 = __importDefault(require("../validation/EscapeString"));
const UserExist_1 = __importDefault(require("../validation/UserExist"));
const Auth_1 = __importDefault(require("../validation/Auth"));
class UserModel {
    constructor() {
        this.prisma = database_1.database;
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.prisma.user.findMany();
                return {
                    status: 'success',
                    message: 'success on grab users',
                    data: data
                };
            }
            catch (e) {
                console.error(`Error: ${e}`);
                throw e;
            }
        });
    }
    getUserByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.prisma.user.findFirst({
                    where: {
                        id: id
                    }
                });
                if (data === null) {
                    return {
                        status: 'failed',
                        message: 'User not found',
                        data: null
                    };
                }
                return {
                    status: 'success',
                    message: 'success on grab user',
                    data: data
                };
            }
            catch (e) {
                console.error(`Error: ${e}`);
                throw e;
            }
        });
    }
    createUser(username_1, password_1) {
        return __awaiter(this, arguments, void 0, function* (username, password, email = null) {
            try {
                const user = (0, EscapeString_1.default)(username);
                const pass = (0, EscapeString_1.default)(password);
                const emails = (email) ? (0, EscapeString_1.default)(email) : null;
                // Check if username already exist
                const checkUser = yield (0, UserExist_1.default)(user);
                if (checkUser) {
                    return {
                        status: 'failed',
                        message: 'Username already taken',
                        data: null
                    };
                }
                const data = yield this.prisma.user.create({
                    data: {
                        username: user,
                        password: pass,
                        email: emails
                    }
                });
                return {
                    status: 'succed',
                    message: 'Registration success',
                    data: data
                };
            }
            catch (e) {
                console.error(`Error: ${e}`);
                throw e;
            }
        });
    }
    userLogin(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = (0, EscapeString_1.default)(username);
                const pass = (0, EscapeString_1.default)(password);
                const checkUser = yield (0, UserExist_1.default)(user);
                if (!checkUser) {
                    return {
                        status: 'failed',
                        message: 'Username not found',
                        data: null
                    };
                }
                const data = yield this.prisma.user.findFirst({
                    where: {
                        username: user,
                        password: pass
                    }
                });
                if (!data) {
                    return {
                        status: 'failed',
                        message: 'Username or password invalid',
                        data: null
                    };
                }
                const userdata = {
                    id: data.id,
                    username: data.username
                };
                const token = Auth_1.default.sign(userdata);
                return {
                    status: 'succed',
                    message: 'Login Succed',
                    data: token
                };
            }
            catch (e) {
                console.error(`Error: ${e}`);
                throw e;
            }
        });
    }
}
const userModel = new UserModel();
exports.default = userModel;
