var pool = require('./bd'); // llamando datos BD


async function insertComprar(obj) {
  try {
    var query = "insert into comprar set ?"; // set ? toma todo el objeto se van a insertar todos los campo
    var rows = await pool.query(query, [obj]);
    return rows;

  } catch (error) {
    console.log(error);
    throw error;
  } // cierra catch
} //cierra insert
module.exports = { insertComprar }