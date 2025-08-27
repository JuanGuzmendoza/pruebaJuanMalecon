import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Technician from './Technicians.js';
import Crop from './Crops.js';

const Farm = sequelize.define(
  'Farm',
  {
    farm_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    technical_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Technician, key: 'technical_id' },
    },
    crop_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Crop, key: 'crop_id' },
    },
    
  },
  {
    tableName: 'Farms',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);


Farm.belongsTo(Technician, { foreignKey: 'technical_id' , onDelete: 'SET NULL' });
Farm.belongsTo(Crop, { foreignKey: 'crop_id' , onDelete: 'SET NULL' });

export default Farm;