import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import cors from 'cors';
import uploadCsv from './routes/uploadCsv.js';

// Importing routes of the app
import techinciasRoutes from './routes/techniciansRutes.js';
import farmsRoutes from './routes/farmsRoutes.js';
import sensorRoutes from './routes/sensorsRoutes.js';
import cropsRoutes from './routes/cropsRoutes.js';
// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
app.use(cors());
app.use(express.json());


/**== ROUTES == */
app.use('/api/csv', uploadCsv);
app.use('/api/technicians', techinciasRoutes);
app.use('/api/farms', farmsRoutes);
app.use('/api/sensors', sensorRoutes);
app.use('/api/crops', cropsRoutes);


const PORT = process.env.PORT || 3000;

// Sync database and start the server
sequelize.sync({ force: false })
  .then(() => {
    console.log('DB sincronizada');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error(err));