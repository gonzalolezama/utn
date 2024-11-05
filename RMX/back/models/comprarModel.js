var pool = require('./bd'); // llamando datos BD

async function getComprar() {
  var query = 'select * from comprar';
  var rows = await pool.query(query);
  return rows;
}

async function insertComprar(obj) {
  try {
    var query = "insert into comprar set ?"; // set ? toma todo el objeto se van a insertar todos los campo
    var rows = await pool.query(query, [obj]);
    return rows;

  } catch (erro) {
    console.log(error);
    throw error;
  } // cierra catch
} //cierra insert
module.exports = { getComprar, insertComprar }