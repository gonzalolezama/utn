var express = require('express');
var router = express.Router();
var comprarModel = require('./../../models/comprarModel');



router.get('/', async function (req, res, next) {

    var comprar = await comprarModel.getComprar(); // comunica con novedades llama la informacin que necesito para imprimirla en el render y en hbs

    res.render('admin/comprar', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        comprar
    });
});

router.get('/comprar', (req, res, next) => {
    res.render('admin/comprar', { //me mustra el render de agregar
        layout: 'admin/layout'
    }); //cierra render 
}); //cierra get

router.post('/comprar', async (req, res, nest) => { //usamos router.post porque es un formulario
    try {
        if (req.body.titulo != "" && req.body.zona != "" && req.body.tipo != "" && req.body.precio != "" && req.body.descripcion != "" && req.body.img != "") {
            await comprarModel.insertComprar(req.body);
            res.redirect('/admin/novedades')
        } else {
            res.render('admin/comprar', {
                layout: 'admin/layout',
                error: true,
                message: 'Titulo, Zona, Tipo e Imagen son Requedidos'
            })
        }
    } catch (error) {
        console.log(error)
        res.render('admin/comprar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se cargo la Porpiedad'
        })
    }
})

module.exports = router;