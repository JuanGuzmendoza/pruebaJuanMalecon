

import Technician from '../models/Technicians.js';


// obtain all Technicians
export const getTechnicians = async (req, res) => {
  try {
    const technicians = await Technician.findAll();
    res.json(technicians);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// obtain one Technician
export const getTechnician = async (req, res) => {
  try {
    const technicians = await Technician.findByPk(req.params.id);
    if (!technicians) return res.status(404).json({ message: 'No encontrado' });
    res.json(technicians);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a Technician
export const createTechnician = async (req, res) => {
  try {
    const technicians = await Technician.create(req.body);
    res.status(201).json(technicians);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Technician
export const updateTechnician = async (req, res) => {
  try {
    const [updated] = await Technician.update(req.body, {
      where: { technical_id: req.params.id },
    });
    if (!updated) return res.status(404).json({ message: 'not found' });
    res.json({ message: 'Update great' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Technician
export const deleteTechnician = async (req, res) => {
  try {
    const deleted = await Technician.destroy({
      where: { technical_id: req.params.id },
    });
    if (!deleted) return res.status(404).json({ message: 'not found' });
    res.json({ message: 'Delete great' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
