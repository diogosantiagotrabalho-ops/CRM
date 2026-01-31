const API = 'http://localhost:3000';

function addLead() {
  fetch(`${API}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: nome.value,
      email: email.value,
      telefone: telefone.value,
      status: 'Novo'
    })
  }).then(loadLeads);
}

function loadLeads() {
  fetch(`${API}/leads`)
    .then(r => r.json())
    .then(data => {
      lista.innerHTML = data.map(l =>
        `<li>${l.nome} - ${l.status}</li>`
      ).join('');
    });
}

loadLeads();
