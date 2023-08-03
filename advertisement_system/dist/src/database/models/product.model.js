"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
const user_model_1 = __importDefault(require("./user.model"));
const categories_model_1 = __importDefault(require("./categories.model"));
const address_model_1 = __importDefault(require("./address.model"));
class Product extends sequelize_1.Model {
}
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "Here is new product to sell"
    },
    base_price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    bidding_price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    bidding_user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        references: {
            model: user_model_1.default,
            key: 'id'
        }
    },
    category_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: categories_model_1.default,
            key: 'id'
        }
    },
    seller_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_model_1.default,
            key: 'id'
        }
    },
    address_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: address_model_1.default,
            key: 'id'
        }
    },
}, {
    timestamps: true,
    sequelize: database_1.default,
    tableName: 'products',
});
user_model_1.default.hasMany(Product);
Product.belongsTo(user_model_1.default, { foreignKey: 'bidding_user_id' });
categories_model_1.default.hasMany(Product);
Product.belongsTo(categories_model_1.default, { foreignKey: 'category_id' });
user_model_1.default.hasMany(Product);
Product.belongsTo(user_model_1.default, { foreignKey: 'seller_id' });
address_model_1.default.hasMany(Product);
Product.belongsTo(address_model_1.default, { foreignKey: 'address_id' });
Product.sync();
exports.default = Product;
