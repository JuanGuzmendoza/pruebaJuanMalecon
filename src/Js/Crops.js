import { paintNavbar } from './components/navbar.js';
const API_URL = 'http://localhost:3000/api/crops'; // Ajusta tu endpoint

// Elements
const form = document.getElementById('crop-form');
const cancelBtn = document.getElementById('cancel-edit');
const tableBody = document.querySelector('#crops-table tbody');

// ==================== Start ====================
document.addEventListener('DOMContentLoaded', async function () {
    paintNavbar();
    await loadCrops();
});

window.editCrop = editCrop;
window.deleteCrop = deleteCrop;

// Fill sensor select
async function llenarSelectSensores() {
    const sensorSelect = document.getElementById('sensor_id');
    try {
        const res = await fetch('http://localhost:3000/api/sensors');
        const sensors = await res.json();
        sensorSelect.innerHTML = '<option value="">Seleccione un sensor</option>';
        sensors.forEach(sensor => {
            const option = document.createElement('option');
            option.value = sensor.sensor_id;
            option.textContent = sensor.sensor_code;
            sensorSelect.appendChild(option);   
        }
        );
    } catch (err) {
        console.error('Error cargando sensores:', err);
    }
}

// Load crops in the table 
async function loadCrops() {
  await llenarSelectSensores();
  try {
    const res = await fetch(API_URL);
    const crops = await res.json();
    tableBody.innerHTML = '';
    crops.forEach(c => {
      const row = `
        <tr>
          <td>${c.crop_id}</td>
          <td>${c.type_crop || ''}</td>
          <td>${c.type_soil || ''}</td>
          <td>${c.fertilizer || ''}</td>
          <td>${c.it_organic}</td>
          <td>${c.crop_variety || ''}</td>
          <td>${c.tons_produced || ''}</td>
          <td>${c.Sensor ? c.Sensor.sensor_code : c.sensor_id}</td>
          <td>
            <button class="btn btn-sm btn-warning" onclick="editCrop(${c.crop_id})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="deleteCrop(${c.crop_id})">Eliminar</button>
          </td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  } catch (err) {
    console.error('Error cargando cultivos:', err);
  }
}

// Save or update crop
form.addEventListener('submit', async e => {
  e.preventDefault();

  const id = form.crop_id.value;

  const cropData = {
    type_crop: form.type_crop.value,
    type_soil: form.type_soil.value,
    fertilizer: form.fertilizer.value,
    it_organic: form.it_organic.value === 'true',
    crop_variety: form.crop_variety.value,
    tons_produced: form.tons_produced.value,
    sensor_id: form.sensor_id.value
  };

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_URL}/${id}` : API_URL;

  try {
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cropData)
    });
    resetForm();
    loadCrops();
  } catch (err) {
    console.error('Error guardando cultivo:', err);
  }
});

// Edit crop
async function editCrop(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const crop = await res.json();
    form.crop_id.value = crop.crop_id;
    form.type_crop.value = crop.type_crop || '';
    form.type_soil.value = crop.type_soil || '';
    form.fertilizer.value = crop.fertilizer || '';
    form.it_organic.value = crop.it_organic ? 'true' : 'false';
    form.crop_variety.value = crop.crop_variety || '';
    form.tons_produced.value = crop.tons_produced || '';
    form.sensor_id.value = crop.sensor_id;
  } catch (err) {
    console.error('Error cargando cultivo:', err);
  }
}

// delete crop
async function deleteCrop(id) {
  if (!confirm('Are you sure you want to delete this crop?')) return;
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    loadCrops();
  } catch (err) {
    console.error('Error eliminando cultivo:', err);
  }
}

// Cancel edit
cancelBtn.addEventListener('click', resetForm);

function resetForm() {
  form.crop_id.value = '';
  form.reset();
}