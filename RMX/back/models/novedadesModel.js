var pool = require('./bd'); // llamando datos BD

async function getNovedades() {
  var query = 'select * from novedades';
  var rows = await pool.query(query);
  return rows;
}

async function getComprar() {
  var query = 'select * from comprar';
  var rows = await pool.query(query);
  return rows;
}

async function insertNovedades(obj) {
  try {
    var query = "insert into novedades set ?"; // set ? toma todo el objeto se van a insertar todos los campo
    var rows = await pool.query(query, [obj]);
    return rows;

  } catch (error) {
    console.log(error);
    throw error;
  } // cierra catch
} //cierra insert

async function deleteNovedadesById(id) {
  var query = 'delete from novedades where id = ?';
  var rows = await pool.query(query, [id]);
  return rows;
} // cierra eliminar


// para modificar algun dato del formulario editar

// esta funcion es para que cargue los datos de una sola novedad a modificar
async function getNovedadesByid(id) {
  var query = 'select * from novedades where id = ?';
  var rows = await pool.query(query, [id]);
  return rows[0]; // esto es para que me traiga solo un ide el primero que conicida
}

// esta funcion es para modificar update de los datos
async function modificarNovedadesByid(obj, id) {
  try {
    var query = 'update novedades set ? where id=?';
    var rows = await pool.query(query, [obj, id]);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getComprarByid(id) {
  var query = 'select * from comprar where id = ?';
  var rows = await pool.query(query, [id]);
  return rows[0]; // esto es para que me traiga solo un ide el primero que conicida
}




module.exports = { getNovedades, getComprar, insertNovedades, deleteNovedadesById, getNovedadesByid, modificarNovedadesByid }