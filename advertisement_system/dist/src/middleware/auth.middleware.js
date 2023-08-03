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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_db_1 = __importDefault(require("../database/redis_db"));
const session_model_1 = __importDefault(require("../database/models/session.model"));
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token)
            return res.status(401).send("ACCESS_DENIED");
        try {
            const decoded = jsonwebtoken_1.default.verify(token, 'appinventiv');
            console.log('token ', decoded);
            console.log('session_id', decoded.session_id);
            const findSession = (yield redis_db_1.default.get(`${decoded.id}_${decoded.session_id}`)) || (yield session_model_1.default.findOne({ where: { id: decoded.session_id } }));
            if (findSession.isActive === false) {
                return res.status(400).send("Session out");
            }
            req.body.id = decoded.id;
            console.log('123456jhgfds', req.body.id);
            req.body.session_id = decoded.session_id;
            next();
        }
        catch (err) {
            res.status(400).send("INVALID_TOKEN");
        }
    });
}
exports.default = auth;
