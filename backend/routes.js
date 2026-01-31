const express = require('express');
const db = require('./db');
const router = express.Router();

router.get('/leads', (req, res) => {
  db.all('SELECT * FROM leads', [], (err, rows) => {
    res.json(rows);
  });
});

router.post('/leads', (req, res) => {
  const { nome, email, telefone, status } = req.body;
  db.run(
    'INSERT INTO leads (nome, email, telefone, status) VALUES (?,?,?,?)',
    [nome, email, telefone, status],
    function () {
      res.json({ id: this.lastID });
    }
  );
});

module.exports = router;
