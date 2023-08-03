"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('advertisement_db', 'postgres', '      ', {
    host: '192.168.2.175',
    dialect: 'postgres'
});
exports.default = sequelize;
