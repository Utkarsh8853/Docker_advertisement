import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

class Category extends Model {
  public id!: number;
  public name!: string;
  public parent_id!: number;
}
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { 
        model: Category,
        key: 'id'
      }
    },
  },
  {
    sequelize,
    tableName: 'categories',
  },
);
Category.belongsTo(Category, {foreignKey: 'parent_id' ,as: 'subcategories' })
Category.sync();
export default Category;