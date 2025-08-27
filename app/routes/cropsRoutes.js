import { Router } from 'express';
import {
    getCrops,
    getCrop,
    createCrop,
    updateCrop,
    deleteCrop
} from '../controllers/CropsController.js';

const router = Router();

// endpoint to obtain all Corps
router.get('/', getCrops);

// endpoint to obtain a Corp by ID
router.get('/:id', getCrop);

// endpoint to create a Corp
router.post('/', createCrop);

// endpoint to update a Corp
router.put('/:id', updateCrop);

// endpoint to delete a Corp
router.delete('/:id', deleteCrop);

export default router;
