import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import Product from './product.model';

class Image extends Model {
  public id!: number;
  public image!: Blob;
  public user_id!: number;
  public product_id!: number;
}

Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { 
        model: Product,
        key: 'id'
      }
    }
  },
  {
    timestamps:true,
    sequelize,
    tableName: 'image',
  },
);
Product.hasMany(Image);
Image.belongsTo(Product, {foreignKey: 'product_id'})
Image.sync();
export default Image;