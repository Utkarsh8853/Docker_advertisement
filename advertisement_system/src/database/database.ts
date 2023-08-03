import { Sequelize } from "sequelize";

const sequelize = new Sequelize('advertisement_db', 'postgres', '      ', {
    host: '192.168.2.175',
    dialect: 'postgres'
  });

  export default sequelize;