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
exports.userEntry = exports.verifyUserExist = void 0;
const sequelize_1 = require("sequelize");
const user_model_1 = __importDefault(require("../database/models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const verifyUserExist = (username, email) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUser = yield user_model_1.default.findOne({ where: { [sequelize_1.Op.or]: [{ username: username }, { email: email }] } });
    console.log('/////////////', checkUser);
    return checkUser;
});
exports.verifyUserExist = verifyUserExist;
const userEntry = (name, username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('bbb', name);
    console.log('bbb', username);
    console.log('bbb', email);
    console.log('bbb', password);
    const hashPwd = yield bcrypt_1.default.hash(password, 3);
    const createUser = yield user_model_1.default.create({ name: name, username: username, email: email, password: hashPwd });
    return createUser;
});
exports.userEntry = userEntry;
