const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'your_crm_db',
  password: 'your_db_password',
  port: 5432,
});

app.get('/api/clients', async (req, res) => {
  try {
    const query = `
      SELECT 
        c.id, c.name, c.email, c.phone, c.status, c.created_at,
        COUNT(d.id) AS deal_count, 
        COALESCE(SUM(d.value), 0) AS total_deal_value
      FROM clients c
      LEFT JOIN deals d ON c.id = d.client_id
      GROUP BY c.id
      ORDER BY c.name ASC;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/api/clients', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const status = 'Lead'; 
    if (!name || !email) {
      return res.status(400).json({ msg: 'Please include a name and email' });
    }
    const newClient = await pool.query(
      "INSERT INTO clients (name, email, phone, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, phone, status]
    );
    const newClientData = { ...newClient.rows[0], deal_count: 0, total_deal_value: 0 };
    res.status(201).json(newClientData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`CRM server running on http://localhost:${port}`);
});
