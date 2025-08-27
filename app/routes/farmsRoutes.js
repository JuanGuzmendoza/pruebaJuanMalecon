import { Router } from 'express';
import {
    getFarm,
    getFarms,
    createFarm,
    updateFarm,
    deleteFarm
} from '../controllers/farmsController.js';

const router = Router();

// endpoint to obtain all farms
router.get('/', getFarms);

// endpoint to obtain a farm by ID
router.get('/:id', getFarm);

// endpoint to create a farm
router.post('/', createFarm);

// endpoint to update a farm
router.put('/:id', updateFarm);

// endpoint to delete a farm
router.delete('/:id', deleteFarm);

export default router;
