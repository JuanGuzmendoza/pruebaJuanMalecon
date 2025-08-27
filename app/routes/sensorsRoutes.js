import { Router } from 'express';
import {
    getSensors,
    getSensor,
    createSensor,
    updateSensor,
    deleteSensor
} from '../controllers/sensorsController.js';

const router = Router();

// endpoint to obtain all Sensors
router.get('/', getSensors);

// endpoint to obtain a Sensor by ID
router.get('/:id', getSensor);

// endpoint to create a Sensor
router.post('/', createSensor);

// endpoint to update a Sensor
router.put('/:id', updateSensor);

// endpoint to delete a Sensor
router.delete('/:id', deleteSensor);

export default router;
