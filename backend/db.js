const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./crm.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      email TEXT,
      telefone TEXT,
      status TEXT
    )
  `);
});

module.exports = db;
