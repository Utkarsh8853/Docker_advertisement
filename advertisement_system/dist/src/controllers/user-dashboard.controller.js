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
exports.dashboardController = void 0;
const user_model_1 = __importDefault(require("../database/models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const fs_1 = __importDefault(require("fs"));
const address_model_1 = __importDefault(require("../database/models/address.model"));
const product_model_1 = __importDefault(require("../database/models/product.model"));
const image_model_1 = __importDefault(require("../database/models/image.model"));
const redis_db_1 = __importDefault(require("../database/redis_db"));
const session_model_1 = __importDefault(require("../database/models/session.model"));
class DashboardController {
    uploadProfilePhoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.body.id;
                const file = req.file;
                const fileData = fs_1.default.readFileSync(file.path);
                const bufferData = Buffer.from(fileData);
                console.log(bufferData);
                yield user_model_1.default.update({ image: bufferData }, { where: { id: user_id } });
                fs_1.default.unlink(file.path, (data) => {
                    console.log("File deleted");
                });
                return res.status(200).send("Profile Uploaded");
            }
            catch (err) {
                console.error(err);
                return res.status(200).send("Profile is not uploaded due to some error");
            }
        });
    }
    updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.body.id;
                const { name, username, email, gender, ph_no } = req.body;
                yield user_model_1.default.update({ name: name, username: username, email: email, gender: gender, ph_no: ph_no }, { where: { id: user_id } });
                return res.status(200).send('Profile updated');
            }
            catch (err) {
                console.error(err);
                return res.status(400).send('Please provide proper information');
            }
        });
    }
    addAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.body.id;
                const { house_no, street_no, area, landmark, city, state, country, zip_code } = req.body;
                const result = yield address_model_1.default.create({ house_no: house_no, street_no: street_no, area: area, landmark: landmark, city: city, state: state, country: country, zip_code: zip_code, user_id: user_id });
                console.log('Address is added', result);
                return res.status(200).json({ message: "Address is added" });
            }
            catch (err) {
                console.error(err);
                return res.status(200).json({ message: "Give proper detail" });
            }
        });
    }
    updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.body.id;
                const { password } = req.body;
                const hashPwd = yield bcrypt_1.default.hash(password, 3);
                yield user_model_1.default.update({ password: hashPwd }, { where: { id: user_id } });
                return res.status(200).send('password updated');
            }
            catch (err) {
                console.error(err);
                return res.status(400).send('Server problem');
            }
        });
    }
    updateAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.body.id;
                const { house_no, street_no, area, landmark, city, state, zip_code } = req.body;
                yield user_model_1.default.update({ house_no: house_no, street_no: street_no, area: area, landmark: landmark, city: city, state: state, zip_code: zip_code }, { where: { id: user_id } });
                return res.status(200).send('Address updated');
            }
            catch (err) {
                console.error(err);
                return res.status(400).send('Please provide proper information');
            }
        });
    }
    deleteAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { address_id } = req.body;
                const user_id = req.body.id;
                yield address_model_1.default.destroy({ where: { id: address_id, user_id: user_id } });
                return res.status(200).send('address deleted');
            }
            catch (err) {
                console.error(err);
                return res.status(400).send('wrong address id');
            }
        });
    }
    allAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.body.id;
                const result = yield address_model_1.default.findAll({ where: { user_id: user_id } });
                console.log(result);
                return res.status(200).json({ result });
            }
            catch (err) {
                console.error(err);
                return res.status(400).send('Server problem');
            }
        });
    }
    viewProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.body.id;
                const result = yield user_model_1.default.findOne({ where: { user_id: user_id } });
                console.log(result);
                return res.status(200).json({ result });
            }
            catch (err) {
                console.error(err);
                return res.status(400).send('Server problem');
            }
        });
    }
    deleteAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.body.id;
                const session_id = req.body.session_id;
                yield user_model_1.default.destroy({ where: { id: user_id } });
                yield session_model_1.default.update({ isActive: false, }, { where: { id: session_id } });
                yield redis_db_1.default.del(`${user_id}_${session_id}`);
                try {
                    yield address_model_1.default.destroy({ where: { user_id: user_id } });
                    yield product_model_1.default.destroy({ where: { user_id: user_id } });
                    yield image_model_1.default.destroy({ where: { user_id: user_id } });
                }
                catch (error) {
                    return res.status(200).send('Account removed');
                }
                return res.status(200).send('Account removed');
            }
            catch (err) {
                console.error(err);
                return res.status(400).send('Account is not deleted due to error');
            }
        });
    }
}
exports.dashboardController = new DashboardController();
