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



// para modificar algun dato del formulario editar

// esta funcion es para que cargue los datos de una sola novedad a modificar
async function getComprarByid(id) {
  var query = 'select * from comprar where id = ?';
  var rows = await pool.query(query, [id]);
  return rows[0]; // esto es para que me traiga solo un ide el primero que conicida
}

// esta funcion es para modificar update de los datos
async function modificarComprarByid(obj, id) {
  try {
    var query = 'update comprar set ? where id=?';
    var rows = await pool.query(query, [obj, id]);
    return rows;
  } catch (error) {
    throw error;
  }
}

// delete comparar 

async function deleteComprarById(id) {
  var query = 'delete from comprar where id = ?';
  var rows = await pool.query(query, [id]);
  return rows;
} // cierra eliminar

module.exports = { insertComprar, deleteComprarById, getComprarByid, modificarComprarByid }