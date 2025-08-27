import { paintNavbar } from './components/navbar.js';
const API_URL = 'http://localhost:3000/api/technicians'; // Ajusta tu endpoint

// Elemnts
const form = document.getElementById('technician-form');
const cancelBtn = document.getElementById('cancel-edit');
const tableBody = document.querySelector('#technicians-table tbody');

// ==================== Start ====================
document.addEventListener('DOMContentLoaded', async function () {
    paintNavbar()
    await loadTechnicians();
});

window.editTechnician = editTechnician;
window.deleteTechnician = deleteTechnician;

// load technicians in the table
async function loadTechnicians() {
  try {
    const res = await fetch(API_URL);
    const technicians = await res.json();
    console.log(technicians);
    tableBody.innerHTML = '';
    technicians.forEach(c => {
      const row = `
        <tr>
          <td>${c.technical_id}</td>
          <td>${c.name}</td>
          <td>
            <button class="btn btn-sm btn-warning" onclick="editTechnician(${c.technical_id})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="deleteTechnician(${c.technical_id})">Eliminar</button>
          </td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  } catch (err) {
    console.error('Error cargando clientes:', err);
  }
}

// save or update technician with with the form and send to the database
form.addEventListener('submit', async e => {
  e.preventDefault();

  const id = form.technician_id.value;

  const technicianData = {
    name: form.full_name.value,
  };

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_URL}/${id}` : API_URL;

  try {
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(technicianData)
    });
    resetForm();
    loadTechnicians();
  } catch (err) {
    console.error('Error saved the :', err);
  }
});

// edit technician in the form to update in the database
async function editTechnician(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const technician = await res.json();
    console.log(technician);
    form.technician_id.value = technician.technical_id;
    form.full_name.value = technician.name;

  } catch (err) {
    console.error('Error load technician:', err);
  }
}

// delete technician in the database with confirmation to avoid mistakes
async function deleteTechnician(id) {
  if (!confirm('Are you sure you want to delete this Technician?')) return;
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    loadTechnicians();
  } catch (err) {
    console.error('Error deleting client:', err);
  }
}

// cancel edit the button 
cancelBtn.addEventListener('click', resetForm);

function resetForm() {
  form.technician_id.value = '';
  form.reset();
}


