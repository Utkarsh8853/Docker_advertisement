import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import User from './user.model';
import Category from './categories.model';
import Address from './address.model';

class Product extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public base_price!: number;
  public bidding_price!: number;
  public bidding_user_id!: number;
  public category_id!: number;
  public seller_id!: number;
  public address_id!: number;
}
Product.init(
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Here is new product to sell"
    },
    base_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bidding_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    bidding_user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:0,
        references: { 
          model: User,
          key: 'id'
        }
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { 
          model: Category,
          key: 'id'
        }
    },
    seller_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { 
          model: User,
          key: 'id'
        }
    },
    address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { 
          model: Address,
          key: 'id'
        }
    },
  },
  {
    timestamps:true,
    sequelize,
    tableName: 'products',
  },
);
User.hasMany(Product);
Product.belongsTo(User, {foreignKey: 'bidding_user_id'})
Category.hasMany(Product);
Product.belongsTo(Category, {foreignKey: 'category_id'})
User.hasMany(Product);
Product.belongsTo(User, {foreignKey: 'seller_id'})
Address.hasMany(Product);
Product.belongsTo(Address, {foreignKey: 'address_id'})
Product.sync();
export default Product;