const express = require('express');
const db = require('./db');
const router = express.Router();

router.get('/leads', (req, res) => {
  db.all('SELECT * FROM leads', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao carregar leads.' });
    }
    res.json(rows);
  });
});

router.post('/leads', (req, res) => {
  const { nome, email, telefone, status } = req.body;
  db.run(
    'INSERT INTO leads (nome, email, telefone, status) VALUES (?,?,?,?)',
    [nome, email, telefone, status],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao salvar lead.' });
      }
      res.json({ id: this.lastID });
    }
  );
});

router.put('/leads/:id', (req, res) => {
  const { status } = req.body;
  db.run(
    'UPDATE leads SET status = ? WHERE id = ?',
    [status, req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Erro ao atualizar lead.' });
      }
      res.json({ updated: this.changes });
    }
  );
});

router.delete('/leads/:id', (req, res) => {
  db.run('DELETE FROM leads WHERE id = ?', [req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao remover lead.' });
    }
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
