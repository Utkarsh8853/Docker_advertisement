import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

class User extends Model {
  public id!: number;
  public name!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public gender?: string;
  public image?: Blob;
  public ph_no?: number;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM,
      values: ['male', 'female', 'other'],
      allowNull: true,
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    ph_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    timestamps:true,
    sequelize,
    tableName: 'users',
  },
);
User.sync();
export default User;