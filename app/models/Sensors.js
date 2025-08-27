import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Sensor = sequelize.define(
  'Sensor',
  {
    sensor_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    sensor_code: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    type_sensor: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    watering: {
      type: DataTypes.DATE,
      allowNull: false
    },
    irrigation_system: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    sensor_status: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    maintenance: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: 'Sensors',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export default Sensor;