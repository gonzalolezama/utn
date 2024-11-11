var express = require('express');
var router = express.Router();
var novedadesModel = require('./../../models/novedadesModel');
var comprarModel = require('./../../models/comprarModel');

router.get('/', async function (req, res, next) {

    var novedades = await novedadesModel.getNovedades(); // comunica con novedades llama la informacin que necesito para imprimirla en el render y en hbs

    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        novedades
    });
});

router.get('/', async function (req, res, next) {

    var comprar = await novedadesModel.getComprar(); // comunica con novedades llama la informacin que necesito para imprimirla en el render y en hbs

    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        comprar
    });
});



router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', { //me mustra el render de agregar
        layout: 'admin/layout'
    }); //cierra render 
}); //cierra get

router.post('/agregar', async (req, res, next) => { //usamos router.post porque es un formulario
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
});

/*para eliminar una novedad*/
router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id; //usamos parametros no body

    await novedadesModel.deleteNovedadesById(id); //nos comunicamos con las bariables de model

    res.redirect('/admin/novedades');

}); // cierra get salir

/* para listar una sola novedad by id - modificar - diseño */

router.get('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;
    console.log(req.params.id);
    var novedad = await novedadesModel.getNovedadesByid(id);

    res.render('admin/modificar', {
        layout: 'admin/layout',
        novedad
    })

});

//para modificar la novedad
router.post('/modificar', async (req, res, next) => {
    try {
        var obj = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo
        }
        console.log(obj)

        await novedadesModel.modificarNovedadesByid(obj, req.body.id);
        res.redirect('/admin/novedades');

    } catch (error) {
        console.log(error)
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se modifico la Novedad'
        })
    }

})


// informacion de comprar

router.get('/', async function (req, res, next) {

    var comprar = await novedadesModel.getComprar(); // comunica con novedades llama la informacin que necesito para imprimirla en el render y en hbs

    res.render('admin/novedades', {
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

router.post('/comprar', async (req, res, next) => { //usamos router.post porque es un formulario
    try {
        if (req.body.titulo != "" && req.body.zona != "" && req.body.tipo != "" && req.body.precio != "" && req.body.descripcion != "" && req.body.img != "") {
            await comprarModel.insertComprar(req.body);
            res.redirect('/admin/novedades')
        } else {
            res.render('admin/comprar', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            })
        }
    } catch (error) {
        console.log(error)
        res.render('admin/comprar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se cargo la Propiedad'
        })
    }
})


module.exports = router;