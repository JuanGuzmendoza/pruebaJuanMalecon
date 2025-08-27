import { paintNavbar } from './components/navbar.js';
const API_URL = 'http://localhost:3000/api/sensors'; // Ajusta tu endpoint

// Elementos
const form = document.getElementById('sensor-form');
const cancelBtn = document.getElementById('cancel-edit');
const tableBody = document.querySelector('#sensors-table tbody');

// ==================== INICIO ====================
document.addEventListener('DOMContentLoaded', async function () {
  paintNavbar();  
  await loadSensors();
});

window.editSensor = editSensor;
window.deleteSensor = deleteSensor;

// Cargar sensores
async function loadSensors() {
  try {
    const res = await fetch(API_URL);
    const sensors = await res.json();
    tableBody.innerHTML = '';
    sensors.forEach(s => {
      const row = `
        <tr>
          <td>${s.sensor_id}</td>
          <td>${s.sensor_code}</td>
          <td>${s.type_sensor || ''}</td>
          <td>${s.price}</td>
          <td>${s.watering}</td>
          <td>${s.irrigation_system || ''}</td>
          <td>${s.sensor_status || ''}</td>
          <td>${s.maintenance || ''}</td>
          <td>
            <button class="btn btn-sm btn-warning" onclick="editSensor(${s.sensor_id})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="deleteSensor(${s.sensor_id})">Eliminar</button>
          </td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  } catch (err) {
    console.error('Error cargando sensores:', err);
  }
}

// Guardar o actualizar sensor 
form.addEventListener('submit', async e => {
  e.preventDefault();

  const id = form.sensor_id.value;

  const sensorData = {
    sensor_code: form.sensor_code.value,
    type_sensor: form.type_sensor.value,
    price: form.price.value,
    watering: form.watering.value,
    irrigation_system: form.irrigation_system.value,
    sensor_status: form.sensor_status.value,
    maintenance: form.maintenance.value
  };

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_URL}/${id}` : API_URL;

  try {
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sensorData)
    });
    resetForm();
    loadSensors();
  } catch (err) {
    console.error('Error guardando sensor:', err);
  }
});

// Editar sensor
async function editSensor(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const sensor = await res.json();
    form.sensor_id.value = sensor.sensor_id;
    form.sensor_code.value = sensor.sensor_code;
    form.type_sensor.value = sensor.type_sensor || '';
    form.price.value = sensor.price;
    form.watering.value = sensor.watering;
    form.irrigation_system.value = sensor.irrigation_system || '';
    form.sensor_status.value = sensor.sensor_status || '';
    form.maintenance.value = sensor.maintenance || '';
  } catch (err) {
    console.error('Error cargando sensor:', err);
  }
}

// Eliminar sensor
async function deleteSensor(id) {
  if (!confirm('¿Seguro que deseas eliminar este sensor?')) return;
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    loadSensors();
  } catch (err) {
    console.error('Error eliminando sensor:', err);
  }
}

// Cancelar edición
cancelBtn.addEventListener('click', resetForm);

function resetForm() {
  form.sensor_id.value = '';
  form.reset();
}