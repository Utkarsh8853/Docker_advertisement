import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import User from './user.model';

class Address extends Model {
  public id!: number;
  public house_no!: string;
  public street_no!: string;
  public area!: string;
  public landmark?: string;
  public city!: string;
  public state!: string;
  public country!: string;
  public zip_code!: number;
  public user_id!: number;
}
Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    house_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    area: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    landmark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    cou: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { 
            model: User,
            key: 'id'
        }
      }
  },
  {
    timestamps:true,
    sequelize,
    tableName: 'address',
  },
);
User.hasMany(Address);
Address.belongsTo(User, {foreignKey: 'user_id'})
Address.sync();
export default Address;