import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Technical = sequelize.define(
  'Technical',
  {
    technical_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  },
  {
    tableName: 'Technicians',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export default Technical;