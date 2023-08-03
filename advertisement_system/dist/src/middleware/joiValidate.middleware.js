"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductValidator = exports.biddingValidator = exports.addProductValidator = exports.updateAddressValidation = exports.addAddressValidation = exports.updateProfileValidate = exports.setPasswordValidate = exports.forgetPasswordValidate = exports.userLoginValidate = exports.newUserValidate = void 0;
const joi_1 = __importDefault(require("joi"));
//Fucntion for user validation
const newUserValidate = (req, res, next) => {
    const userSchema = joi_1.default.object({
        username: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        email: joi_1.default.string().regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
        password: joi_1.default.string().min(8).required()
    });
    const result = userSchema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error);
    }
    else {
        next();
    }
};
exports.newUserValidate = newUserValidate;
const userLoginValidate = (req, res, next) => {
    const userSchema = joi_1.default.object({
        email: joi_1.default.string().regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
        password: joi_1.default.string().min(8).required()
    });
    const result = userSchema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error);
    }
    else {
        next();
    }
};
exports.userLoginValidate = userLoginValidate;
const forgetPasswordValidate = (req, res, next) => {
    const userSchema = joi_1.default.object({
        email: joi_1.default.string().regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    });
    const result = userSchema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error);
    }
    else {
        next();
    }
};
exports.forgetPasswordValidate = forgetPasswordValidate;
const setPasswordValidate = (req, res, next) => {
    const userSchema = joi_1.default.object({
        newPassword: joi_1.default.string().min(8).required()
    });
    const result = userSchema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error);
    }
    else {
        next();
    }
};
exports.setPasswordValidate = setPasswordValidate;
//Fucntion for user-dashboard validation
const updateProfileValidate = (req, res, next) => {
    const userSchema = joi_1.default.object({
        name: joi_1.default.string().optional(),
        username: joi_1.default.string().optional(),
        email: joi_1.default.string().regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).optional(),
        gender: joi_1.default.string().equal(...['male', 'female', 'other']).optional(),
        ph_no: joi_1.default.number().integer().min(10 ** 9).max(10 ** 10 - 1).optional(),
    });
    const result = userSchema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error);
    }
    else {
        next();
    }
};
exports.updateProfileValidate = updateProfileValidate;
const addAddressValidation = (req, res, next) => {
    const addressSchema = joi_1.default.object({
        house_no: joi_1.default.string().required(),
        street_no: joi_1.default.string().required(),
        area: joi_1.default.string().required(),
        landmark: joi_1.default.string().allow('').optional(),
        city: joi_1.default.string().required(),
        state: joi_1.default.string().required(),
        country: joi_1.default.string().required(),
        zip_code: joi_1.default.number().required()
    });
    const result = addressSchema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error);
    }
    else {
        next();
    }
};
exports.addAddressValidation = addAddressValidation;
const updateAddressValidation = (req, res, next) => {
    const addressSchema = joi_1.default.object({
        house_no: joi_1.default.string().optional(),
        street_no: joi_1.default.string().optional(),
        area: joi_1.default.string().optional(),
        landmark: joi_1.default.string().allow('').optional(),
        city: joi_1.default.string().optional(),
        state: joi_1.default.string().optional(),
        country: joi_1.default.string().optional(),
        zip_code: joi_1.default.number().optional()
    });
    const result = addressSchema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error);
    }
    else {
        next();
    }
};
exports.updateAddressValidation = updateAddressValidation;
//Fucntion for product validation
const addProductValidator = (req, res, next) => {
    const productSchema = joi_1.default.object({
        name: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        base_price: joi_1.default.number().required(),
        category_id: joi_1.default.number().required(),
        address_id: joi_1.default.number().required()
    });
    const result = productSchema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error);
    }
    else {
        next();
    }
};
exports.addProductValidator = addProductValidator;
const biddingValidator = (req, res, next) => {
    const productSchema = joi_1.default.object({
        product_id: joi_1.default.number().required(),
        new_bidding_price: joi_1.default.number().required()
    });
    const result = productSchema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error);
    }
    else {
        next();
    }
};
exports.biddingValidator = biddingValidator;
const updateProductValidator = (req, res, next) => {
    const productSchema = joi_1.default.object({
        name: joi_1.default.string().optional(),
        description: joi_1.default.string().optional(),
        base_price: joi_1.default.number().optional(),
        category_id: joi_1.default.number().optional(),
        address_id: joi_1.default.number().optional()
    });
    const result = productSchema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error);
    }
    else {
        next();
    }
};
exports.updateProductValidator = updateProductValidator;
