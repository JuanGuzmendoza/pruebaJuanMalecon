
import express from 'express';
import multer from 'multer';
import XLSX from 'xlsx';
import {
    sequelize,
    Crop,
    Sensor,
    Technical,
    Farm
} from '../models/index.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Endpoint to upload and process Excel file
router.post('/uploadExcel', upload.single('file'), async (req, res) => {
    const filePath = req.file.path;

    try {
        // Read excel file
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        //start transition
        const t = await sequelize.transaction();

        for (const row of data) {
            const mappedRow = {
                farm_name: row['Nombre de la Finca'],
                type_crop: row['Tipo de Cultivo'],
                region: row['Región'],
                name_technical: row['Técnico Responsable'],
                sensor_code: row['ID del Sensor'],
                type_sensor: row['Tipo de Sensor'],
                price: row['Valor'],
                datetime: row['Fecha y Hora'],
                tons_produced: row['Producción (Toneladas)'],
                crop_variety: row['Variedad del Cultivo'],
                type_soil: row['Tipo de Suelo'],
                irrigation_system: row['Sistema de Riego'],
                fertilizer: row['Fertilizante Usado'],
                sensor_status: row['Estado del Sensor'],
                maintenance: row['Fecha de Mantenimiento'],
                it_organic: row['Es Orgánico'],
            };

            // 1️⃣ Create or find  tech
            const [technical] = await Technical.findOrCreate({
                where: { name: mappedRow.name_technical },
                defaults: {
                    name: mappedRow.name_technical,
                },
                transaction: t,
            });

            // 2️⃣ Create or find Sensor
            const [sensor] = await Sensor.findOrCreate({
                where: { sensor_code: mappedRow.sensor_code },
                defaults: {
                    sensor_code: mappedRow.sensor_code,
                    type_sensor: mappedRow.type_sensor,
                    price: mappedRow.price,
                    watering: mappedRow.datetime,
                    irrigation_system: mappedRow.irrigation_system,
                    sensor_status: mappedRow.sensor_status,
                    maintenance: mappedRow.maintenance,
                },
                transaction: t,
            });

            // 3️⃣  Create or find Crop and Farm
            const [crop] = await Crop.findOrCreate({
                where: { type_crop: mappedRow.type_crop, sensor_id: sensor.sensor_id },
                defaults: {
                    type_crop: mappedRow.type_crop,
                    type_soil: mappedRow.type_soil,
                    fertilizer: mappedRow.fertilizer,   
                    it_organic: mappedRow.it_organic === 'Sí' || mappedRow.it_organic === 'si' || mappedRow.it_organic === 'SI',
                    crop_variety: mappedRow.crop_variety,
                    tons_produced: mappedRow.tons_produced,
                    sensor_id: sensor.sensor_id,
                },
                transaction: t,
            });

            // 4️⃣ Create Farm
            await Farm.create(
                {
                    name: mappedRow.farm_name,
                    region: mappedRow.region,
                    technical_id: technical.technical_id,
                    crop_id: crop.crop_id,
                },
                { transaction: t }
            );

        }

        await t.commit();
        res.json({ message: 'Data loaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
