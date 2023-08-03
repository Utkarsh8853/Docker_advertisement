"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
class Session extends sequelize_1.Model {
}
Session.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    device_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    device_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    timestamps: true,
    sequelize: database_1.default,
    tableName: 'session',
});
Session.sync();
exports.default = Session;
// import { Schema, model, Document, Types } from 'mongoose';
// import user from './user.model';
// // post schema
// interface Session extends Document {
//   user_id: Types.ObjectId;
//   device_type: string;
//   device_id: string;
// }
// const sessionSchema = new Schema<Session>({
//   user_id: {
//     type: Schema.Types.ObjectId,
//     ref: user,
//     required: true
//   },
//   device_type: {
//     type: String,
//     required: true
//   },
//   device_id: {
//     type: String,
//     required: true
//   }
// },{timestamps: { createdAt: 'created_at'}});
// export default model<Session>('Session', sessionSchema);
