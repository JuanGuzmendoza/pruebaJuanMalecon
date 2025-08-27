import Farm from '../models/Farms.js';
import Crop from '../models/Crops.js';
import Technical from '../models/Technicians.js';
// obtain all farms
export const getFarms = async (req, res) => {
  try {
    const farms = await Farm.findAll({
      include: [Crop, Technical],

    });
    res.json(farms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// obtain one farm
export const getFarm = async (req, res) => {
  try {
    const farm = await Farm.findByPk(req.params.id);
    if (!farm) return res.status(404).json({ message: 'No encontrado' });
    res.json(farm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a farm
export const createFarm = async (req, res) => {
  try {
    const farm = await Farm.create(req.body);
    res.status(201).json(farm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a farm
export const updateFarm = async (req, res) => {
  try {
    const [updated] = await Farm.update(req.body, {
      where: { farm_id: req.params.id },
    });
    if (!updated) return res.status(404).json({ message: 'not found' });
    res.json({ message: 'Update great' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a farm
export const deleteFarm = async (req, res) => {
  try {
    const deleted = await Farm.destroy({
      where: { farm_id: req.params.id },
    });
    if (!deleted) return res.status(404).json({ message: 'not found' });
    res.json({ message: 'Delete great' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
