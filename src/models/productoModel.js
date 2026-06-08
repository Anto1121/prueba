const pool = require("../config/db");

const Producto = {
  all: async () => {
    const result = await pool.query("SELECT * FROM productos");
    return result.rows;
  },

  find: async (id) => {
    const result = await pool.query(
      "SELECT * FROM productos WHERE id=$1",
      [id]
    );
    return result.rows[0];
  },

  create: async (nombre, precio, stock) => {
    const result = await pool.query(
      "INSERT INTO productos(nombre, precio, stock) VALUES($1,$2,$3) RETURNING *",
      [nombre, precio, stock]
    );
    return result.rows[0];
  },

  update: async (id, nombre, precio, stock) => {
    const result = await pool.query(
      "UPDATE productos SET nombre=$1, precio=$2, stock=$3 WHERE id=$4 RETURNING *",
      [nombre, precio, stock, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    await pool.query(
      "DELETE FROM productos WHERE id=$1",
      [id]
    );
  }
};

module.exports = Producto;