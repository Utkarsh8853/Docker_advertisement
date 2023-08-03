"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
const product_model_1 = __importDefault(require("./product.model"));
class Image extends sequelize_1.Model {
}
Image.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: product_model_1.default,
            key: 'id'
        }
    }
}, {
    timestamps: true,
    sequelize: database_1.default,
    tableName: 'image',
});
product_model_1.default.hasMany(Image);
Image.belongsTo(product_model_1.default, { foreignKey: 'product_id' });
Image.sync();
exports.default = Image;
