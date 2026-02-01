const API = 'http://localhost:3000';
const statusOptions = ['Novo', 'Contato feito', 'Proposta enviada', 'Fechado'];

const leadForm = document.getElementById('leadForm');
const refreshButton = document.getElementById('refresh');
const totalLeads = document.getElementById('totalLeads');
const novosLeads = document.getElementById('novosLeads');

function buildStatusBadge(status) {
  const badge = document.createElement('span');
  badge.className = 'chip';
  badge.textContent = status;
  return badge;
}

function buildLeadCard(lead) {
  const card = document.createElement('li');
  card.className = 'lead-card';

  const info = document.createElement('div');
  const name = document.createElement('h3');
  name.textContent = lead.nome;
  const email = document.createElement('small');
  email.textContent = lead.email;
  info.append(name, email);

  const phone = document.createElement('div');
  phone.innerHTML = `<strong>Telefone</strong><small>${lead.telefone}</small>`;

  const status = document.createElement('div');
  const statusLabel = document.createElement('small');
  statusLabel.textContent = 'Status atual';
  status.append(statusLabel, buildStatusBadge(lead.status));

  const actions = document.createElement('div');
  actions.className = 'lead-actions';
  const statusSelect = document.createElement('select');
  statusOptions.forEach(option => {
    const item = document.createElement('option');
    item.value = option;
    item.textContent = option;
    if (option === lead.status) {
      item.selected = true;
    }
    statusSelect.appendChild(item);
  });

  statusSelect.addEventListener('change', () => {
    updateLeadStatus(lead.id, statusSelect.value);
  });

  const deleteButton = document.createElement('button');
  deleteButton.className = 'danger';
  deleteButton.textContent = 'Remover';
  deleteButton.addEventListener('click', () => removeLead(lead.id));

  actions.append(statusSelect, deleteButton);

  card.append(info, phone, status, actions);
  return card;
}

function updateLeadStats(leads) {
  totalLeads.textContent = leads.length;
  novosLeads.textContent = leads.filter(lead => lead.status === 'Novo').length;
}

async function addLead(event) {
  event.preventDefault();
  const payload = {
    nome: nome.value.trim(),
    email: email.value.trim(),
    telefone: telefone.value.trim(),
    status: status.value
  };

  if (!payload.nome || !payload.email || !payload.telefone) {
    return;
  }

  await fetch(`${API}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  leadForm.reset();
  status.value = 'Novo';
  loadLeads();
}

async function loadLeads() {
  const response = await fetch(`${API}/leads`);
  const data = await response.json();
  lista.innerHTML = '';
  data.forEach(lead => lista.appendChild(buildLeadCard(lead)));
  updateLeadStats(data);
}

async function updateLeadStatus(id, status) {
  await fetch(`${API}/leads/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  loadLeads();
}

async function removeLead(id) {
  await fetch(`${API}/leads/${id}`, { method: 'DELETE' });
  loadLeads();
}

leadForm.addEventListener('submit', addLead);
refreshButton.addEventListener('click', loadLeads);

loadLeads();
