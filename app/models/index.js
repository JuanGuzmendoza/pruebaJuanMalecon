import sequelize from '../config/db.js';
import Crop from './Crops.js';
import Sensor from './Sensors.js';
import Technical from './Technicians.js';
import Farm from './Farms.js';

// Define associations between models here if needed the models

//Sensor y Crop has a relationship one-to-many
Sensor.hasMany(Crop, { foreignKey: 'sensor_id'  , onDelete: 'SET NULL' } );

//Technical y Farm has a relationship one-to-many
Technical.hasMany(Farm, { foreignKey: 'technical_id' , onDelete: 'SET NULL' } );

//Crop y Farm has a relationship one-to-many
Crop.hasMany(Farm, { foreignKey: 'crop_id' ,onDelete: 'SET NULL' } );


export {
  sequelize,
  Crop,
  Sensor,
  Technical,
  Farm
};