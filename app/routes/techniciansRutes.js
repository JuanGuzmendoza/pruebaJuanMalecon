import { Router } from 'express';
import {
  getTechnicians,
  getTechnician,
  createTechnician,
  updateTechnician,
  deleteTechnician
} from '../controllers/techniciansController.js';

const router = Router();

// endpoint to obtain all Technicianss
router.get('/', getTechnicians);

// endpoint to obtain a Technicians by ID
router.get('/:id', getTechnician);

// endpoint to create a Technicians
router.post('/', createTechnician);

// endpoint to update a Technicians
router.put('/:id', updateTechnician);

// endpoint to delete a Technicians
router.delete('/:id', deleteTechnician);

export default router;
