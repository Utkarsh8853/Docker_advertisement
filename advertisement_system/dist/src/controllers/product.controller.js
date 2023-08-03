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
exports.productController = void 0;
const product_model_1 = __importDefault(require("../database/models/product.model"));
const fs_1 = __importDefault(require("fs"));
const image_model_1 = __importDefault(require("../database/models/image.model"));
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
class ProductController {
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.body.id;
                const { name, description, base_price, category_id, address_id } = req.body;
                const result = yield product_model_1.default.create({ name: name, description: description, base_price: base_price, bidding_price: base_price, bidding_user_id: user_id, category_id: category_id, address_id: address_id, seller_id: user_id });
                console.log('Product added', result);
                return res.status(200).json({ result: "product added" });
            }
            catch (err) {
                console.error(err);
                return res.status(200).json({ result: "Please send proper detail" });
            }
        });
    }
    addProductImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { product_id } = req.body;
                const user_id = req.body.id;
                const file = req.file;
                console.log(file.buffer);
                const fileData = fs_1.default.readFileSync(file.path);
                const bufferData = Buffer.from(fileData);
                console.log(bufferData);
                yield image_model_1.default.create({ image: bufferData, user_id: user_id, product_id: product_id });
                fs_1.default.unlink(file.path, (data) => {
                    console.log("File deleted");
                });
                return res.status(200).send("Product image uploaded");
            }
            catch (err) {
                console.error(err);
                return res.status(200).send("Product image is not uploaded");
            }
        });
    }
    viewProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { product_id } = req.body;
                const result = yield product_model_1.default.findOne({ where: { id: product_id } });
                console.log('Product added', result);
                return res.status(200).json({ result });
            }
            catch (err) {
                console.error(err);
                return res.status(200).json({ result: "wrong product id" });
            }
        });
    }
    bidding(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.body.id;
                const { product_id, new_bidding_price } = req.body;
                const check1 = yield product_model_1.default.findOne({ where: { id: product_id } });
                console.log("check1  ", check1);
                if (check1) {
                    const check2 = yield product_model_1.default.findOne({ where: { id: product_id, seller_id: user_id } });
                    console.log("check2  ", check2);
                    if (check2) {
                        return res.status(400).send("You cannot bid on your own product");
                    }
                    else if (check1.bidding_price >= new_bidding_price) {
                        return res.status(400).send("bidding prize must greater than base price");
                    }
                    const result = yield product_model_1.default.update({ bidding_price: new_bidding_price, bidding_user_id: user_id }, { where: { id: product_id } });
                    console.log('Bidding done ', result);
                    return res.status(200).send("Bidding done");
                }
                return res.status(400).send("Worng user id");
            }
            catch (err) {
                console.error(err);
                return res.status(200).json({ result: "wrong product id" });
            }
        });
    }
    removeProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { product_id } = req.body;
                yield product_model_1.default.destroy({ where: { id: product_id } });
                try {
                    yield image_model_1.default.destroy({ where: { product_id: product_id } });
                }
                catch (error) {
                    return res.status(200).send('Product removed');
                }
                return res.status(200).send('Product removed');
            }
            catch (err) {
                console.error(err);
                return res.status(400).send('wrong product id');
            }
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product_id = req.body;
                const { name, description, base_price, category_id, address_id } = req.body;
                yield product_model_1.default.update({ name: name, description: description, base_price: base_price, category_id: category_id, address_id: address_id }, { where: { id: product_id } });
                return res.status(200).send('Product info updated');
            }
            catch (err) {
                console.error(err);
                return res.status(400).send('provide proper information');
            }
        });
    }
    removeProductImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { image_id } = req.body;
                yield image_model_1.default.destroy({ where: { id: image_id } });
                return res.status(200).send('Product image removed');
            }
            catch (err) {
                console.error(err);
                return res.status(400).send('wrong image id');
            }
        });
    }
    filter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category_id } = req.body;
                console.log('//////////////////////////////////////////////', category_id);
                // const allProductId = JSON.stringify(await Category.findAll({where:{[Op.or]:[{parent_id: category_id},{id: category_id}]},attributes: ['id']}))
                // const arrayOfId= Object.values(JSON.parse(allProductId)).map((obj: any) => obj.id);
                // console.log(arrayOfId);
                // const result = await Product.findOne({
                //     attributes: [
                //       [sequelize.fn('GROUP_CONCAT', sequelize.col(category_id)), 'ids']
                //     ]
                //   });
                // const query = await sequelize.query(`SELECT array_agg(id) AS ids FROM categories `);
                const query = yield database_1.default.query(`SELECT array_agg(id) AS ids FROM categories WHERE "categories"."parent_id" = ${category_id} OR "id" = ${category_id}`, { type: sequelize_1.QueryTypes.SELECT });
                const category_list = JSON.parse(JSON.stringify(query))[0].ids;
                console.log(category_list);
                const products = yield product_model_1.default.findAll({
                    attributes: ['name'],
                    where: {
                        category_id: category_list,
                    }
                });
                console.log(products);
                return res.status(200).json(products);
            }
            catch (err) {
                console.error(err);
                return res.status(400).send('wrong category id');
            }
        });
    }
}
exports.productController = new ProductController();
// GUI, Datatypes, pub-sub in redis
