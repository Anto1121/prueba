const pool = require("../config/db");


class Producto {


  static async all() {

    const result = await pool.query(
      "SELECT * FROM productos ORDER BY id"
    );

    return result.rows;

  }



  static async find(id) {

    const result = await pool.query(
      "SELECT * FROM productos WHERE id = $1",
      [id]
    );

    return result.rows[0];

  }



  static async create(nombre, precio, stock) {

    const result = await pool.query(
      `
      INSERT INTO productos(nombre, precio, stock)
      VALUES($1,$2,$3)
      RETURNING *
      `,
      [
        nombre,
        precio,
        stock
      ]
    );

    return result.rows[0];

  }



  static async update(id, nombre, precio, stock) {

    const result = await pool.query(
      `
      UPDATE productos
      SET nombre=$1,
          precio=$2,
          stock=$3
      WHERE id=$4
      RETURNING *
      `,
      [
        nombre,
        precio,
        stock,
        id
      ]
    );


    return result.rows[0];

  }



  static async delete(id) {

    const result = await pool.query(
      `
      DELETE FROM productos
      WHERE id=$1
      RETURNING *
      `,
      [id]
    );


    return result.rows[0];

  }

}


module.exports = Producto;