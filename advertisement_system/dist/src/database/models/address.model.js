"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
const user_model_1 = __importDefault(require("./user.model"));
class Address extends sequelize_1.Model {
}
Address.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    house_no: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    street_no: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    area: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    landmark: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: sequelize_1.DataTypes.BLOB,
        allowNull: false,
    },
    cou: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    zip_code: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_model_1.default,
            key: 'id'
        }
    }
}, {
    timestamps: true,
    sequelize: database_1.default,
    tableName: 'address',
});
user_model_1.default.hasMany(Address);
Address.belongsTo(user_model_1.default, { foreignKey: 'user_id' });
Address.sync();
exports.default = Address;
