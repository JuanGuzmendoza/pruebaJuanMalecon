import Sensor from '../models/Sensors.js';


// obtain all Sensors
export const getSensors = async (req, res) => {
  try {
    const sensor = await Sensor.findAll();
    res.json(sensor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// obtain one Sensor
export const getSensor = async (req, res) => {
  try {
    const sensor = await Sensor.findByPk(req.params.id);
    if (!sensor) return res.status(404).json({ message: 'No encontrado' });
    res.json(sensor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a Sensor
export const createSensor = async (req, res) => {
  try {
    const sensor = await Sensor.create(req.body);
    res.status(201).json(sensor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Sensor
export const updateSensor = async (req, res) => {
  try {
    const [updated] = await Sensor.update(req.body, {
      where: { sensor_id: req.params.id },
    });
    if (!updated) return res.status(404).json({ message: 'not found' });
    res.json({ message: 'Update great' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Sensor
export const deleteSensor = async (req, res) => {
  try {
    const deleted = await Sensor.destroy({
      where: { sensor_id: req.params.id },
    });
    if (!deleted) return res.status(404).json({ message: 'not found' });
    res.json({ message: 'Delete great' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
