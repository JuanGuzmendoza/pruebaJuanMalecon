import { paintNavbar } from './components/navbar.js';

const API_URL = 'http://localhost:3000/api/farms';
const TECHNICIANS_URL = 'http://localhost:3000/api/technicians';
const CROPS_URL = 'http://localhost:3000/api/crops';

// Elements
const form = document.getElementById('farm-form');
const cancelBtn = document.getElementById('cancel-edit');
const tableBody = document.querySelector('#farms-table tbody');
const technicianSelect = document.getElementById('technical_id');
const cropSelect = document.getElementById('crop_id');

// ==================== INICIO ====================
document.addEventListener('DOMContentLoaded', async function () {
    paintNavbar();
    await loadTechnicians();
    await loadCrops();
    await loadFarms();
});

window.editFarm = editFarm;
window.deleteFarm = deleteFarm;

// Load technicians in the select
async function loadTechnicians() {
  try {
    const res = await fetch(TECHNICIANS_URL);
    const technicians = await res.json();
    technicianSelect.innerHTML = '<option value="">Select Technician</option>';
    technicians.forEach(t => {
      technicianSelect.innerHTML += `<option value="${t.technical_id}">${t.name}</option>`;
    });
  } catch (err) {
    console.error('Error load technicians:', err);
  }
}

// load crops in the select
async function loadCrops() {
  try {
    const res = await fetch(CROPS_URL);
    const crops = await res.json();
    cropSelect.innerHTML = '<option value="">Select Crop</option>';
    crops.forEach(c => {
      cropSelect.innerHTML += `<option value="${c.crop_id}">${c.type_crop}</option>`;
    });
  } catch (err) {
    console.error('Error load crops:', err);
  }
}

// Load farms in the table
async function loadFarms() {
  try {
    const res = await fetch(API_URL);
    const farms = await res.json();
    tableBody.innerHTML = '';
    farms.forEach(f => {
      const row = `
        <tr>
          <td>${f.farm_id}</td>
          <td>${f.name}</td>
          <td>${f.region}</td>
          <td>${f.Technical.name}</td>
          <td>${f.Crop.type_crop}</td>
          <td>
            <button class="btn btn-sm btn-warning" onclick="editFarm(${f.farm_id})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="deleteFarm(${f.farm_id})">Eliminar</button>
          </td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  } catch (err) {
    console.error('Error load farms:', err);
  }
}

// save or update farm 
form.addEventListener('submit', async e => {
  e.preventDefault();

  const id = form.farm_id.value;

  const farmData = {
    name: form.name.value,
    region: form.region.value,
    technical_id: form.technical_id.value,
    crop_id: form.crop_id.value
  };

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_URL}/${id}` : API_URL;

  try {
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(farmData)
    });
    resetForm();
    loadFarms();
  } catch (err) {
    console.error('Error save farm:', err);
  }
});

// edit farm 
async function editFarm(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const farm = await res.json();
    form.farm_id.value = farm.farm_id;
    form.name.value = farm.name;
    form.region.value = farm.region;
    form.technical_id.value = farm.technical_id;
    form.crop_id.value = farm.crop_id;
  } catch (err) {
    console.error('Error load farm:', err);
  }
}

// delete farm in the database with confirmation to avoid mistakes
async function deleteFarm(id) {
  if (!confirm('Are you sure you want to delete this farm?')) return;
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    loadFarms();
  } catch (err) {
    console.error('Error eliminando farm:', err);
  }
}

// cancel edit the button 
cancelBtn.addEventListener('click', resetForm);

function resetForm() {
  form.farm_id.value = '';
  form.reset();
}