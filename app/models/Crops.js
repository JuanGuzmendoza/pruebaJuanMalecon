import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Sensor from './Sensors.js';

const Crop = sequelize.define(
  'Crop',
  {
    crop_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type_crop: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    type_soil: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fertilizer: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    it_organic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    crop_variety: {
      type: DataTypes.STRING(205),
      allowNull: false,
    },
    tons_produced: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    sensor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Sensor, key: 'sensor_id' },
    },
  },
  {
    tableName: 'Crops',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

Crop.belongsTo(Sensor, { foreignKey: 'sensor_id' , onDelete: 'SET NULL' });

export default Crop;