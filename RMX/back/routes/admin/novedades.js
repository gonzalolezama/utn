var express = require('express');
var router = express.Router();
var novedadesModel = require('./../../models/novedadesModel');



router.get('/', async function (req, res, next) {

    var novedades = await novedadesModel.getNovedades(); // comunica con novedades llama la informacin que necesito para imprimirla en el render y en hbs

    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        novedades
    });
});

router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', { //me mustra el render de agregar
        layout: 'admin/layout'
    }); //cierra render 
}); //cierra get

router.post('/agregar', async (req, res, nest) => { //usamos router.post porque es un formulario
    try {
        if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
            await novedadesModel.insertNovedades(req.body);
            res.redirect('/admin/novedades')
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            })
        }
    } catch (error) {
        console.log(error)
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se cargo la Novedad'
        })
    }
})

module.exports = router;