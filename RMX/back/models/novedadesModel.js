var pool = require('./bd'); // llamando datos BD

async function getNovedades() {
  var query = 'select * from novedades';
  var rows = await pool.query(query);
  return rows;
}

async function insertNovedades(obj) {
  try {
    var query = "insert into novedades set ?"; // set ? toma todo el objeto se van a insertar todos los campo
    var rows = await pool.query(query, [obj]);
    return rows;

  } catch (erro) {
    console.log(error);
    throw error;
  } // cierra catch
} //cierra insert
module.exports = { getNovedades, insertNovedades }