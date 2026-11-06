const { Pool } = require("pg");

const pool = new Pool({
  user: "myuser",
  host: "localhost",
  database: "mydatabase",
  password: "mypassword",
  port: 5432,
});

const db = {
  getAllEquipment: async () => {
    const result = await pool.query("SELECT * FROM equipment ORDER BY id ASC");
    return result.rows;
  },

  getEquipmentById: async (id) => {
    const result = await pool.query("SELECT * FROM equipment WHERE id = $1", [id]);
    return result.rows[0];
  },

  createEquipment: async ({ name, type, ip_address, status, location }) => {
    const result = await pool.query(
      "INSERT INTO equipment (name, type, ip_address, status, location) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, type, ip_address, status, location]
    );
    return result.rows[0];
  },

  updateEquipment: async (id, { name, type, ip_address, status, location }) => {
    const result = await pool.query(
      "UPDATE equipment SET name = $1, type = $2, ip_address = $3, status = $4, location = $5 WHERE id = $6 RETURNING *",
      [name, type, ip_address, status, location, id]
    );
    return result.rows[0];
  },

  deleteEquipment: async (id) => {
    const result = await pool.query(
      "DELETE FROM equipment WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },
};

module.exports = db;
