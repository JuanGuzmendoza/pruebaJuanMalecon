import Crop from '../models/Crops.js';
import Sensor from '../models/Sensors.js';

// obtain all Crops
export const getCrops = async (req, res) => {
  try {
    const crop = await Crop.findAll({
      include: [Sensor],
    });

    res.json(crop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// obtain one Crop
export const getCrop = async (req, res) => {
  try {
    const crop = await Crop.findByPk(req.params.id);
    if (!crop) return res.status(404).json({ message: 'No encontrado' });
    res.json(crop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a Crop
export const createCrop = async (req, res) => {
  try {
    const crop = await Crop.create(req.body);
    res.status(201).json(crop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Crop
export const updateCrop = async (req, res) => {
  try {
    const [updated] = await Crop.update(req.body, {
      where: { crop_id: req.params.id },
    });
    if (!updated) return res.status(404).json({ message: 'not found' });
    res.json({ message: 'Update great' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Crop
export const deleteCrop = async (req, res) => {
  try {
    const deleted = await Crop.destroy({
      where: { crop_id: req.params.id },
    });
    if (!deleted) return res.status(404).json({ message: 'not found' });
    res.json({ message: 'Delete great' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
