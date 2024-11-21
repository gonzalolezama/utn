var express = require('express');
var router = express.Router();
var novedadesModel = require('./../../models/novedadesModel');
var comprarModel = require('./../../models/comprarModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

router.get('/', async function (req, res, next) {

    var novedades = await novedadesModel.getNovedades(); // comunica con novedades llama la informacin que necesito para imprimirla en el render y en hbs

    novedades = novedades.map(novedad => { //map me genera un nuevo array para mostar la imagen
        if (novedad.img_id) { //con el if chequeamos si la novedad tiene la img_id
            const imagen = cloudinary.image(novedad.img_id, { //si tiene traemela de cloudinary con las siguiente propiedad
                width: 60,
                height: 60,
                crop: 'fill' //crop es una propiedad de Cloudinari se puede sua pad que se adapte o rellene
            });
            return {
                ...novedad, // aca devuelve lo que pasa en novedad y le sumo lo de la imagen
                imagen // aca me devuelve la novedad con la imagen 
            }
        } else {
            return {
                ...novedad,
                imagen: '' // aca me devuelve la novedad con la imagen vacia esta las dos opciones, aca podriamos poner entre las comilla la ruta de una imagen no disponible
            }
        }
    });

    var comprar = await novedadesModel.getComprar(); // informacion de comprar la llamamos una sola ves en la misma formula no duplico la formula

    comprar = comprar.map(comprar => { //map me genera un nuevo array para mostar la imagen
        if (comprar.img_id) { //con el if chequeamos si la novedad tiene la img_id
            const imagencompras = cloudinary.image(comprar.img_id, { //si tiene traemela de cloudinary con las siguiente propiedad
                width: 60,
                height: 60,
                crop: 'fill' //crop es una propiedad de Cloudinari se puede sua pad que se adapte o rellene
            });
            return {
                ...comprar, // aca devuelve lo que pasa en novedad y le sumo lo de la imagen
                imagencompras // aca me devuelve la novedad con la imagen 
            }
        } else {
            return {
                ...comprar,
                imagencompras: '' // aca me devuelve la novedad con la imagen vacia esta las dos opciones, aca podriamos poner entre las comilla la ruta de una imagen no disponible
            }
        }
    });

    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        novedades,
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
        var img_id = '';
        //console.log(req.files.imagen);

        if (req.files && Object.keys(req.files).length > 0) {
            imagen = req.files.imagen;
            img_id = (await uploader(imagen.tempFilePath)).public_id;
        }

        if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
            await novedadesModel.insertNovedades({
                ...req.body, // spread > titulo, subt y cuerpo
                img_id
            });
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

    let novedad = await novedadesModel.getNovedadesByid(id);
    if (novedad.img_id) { //aca le digo que si la novedad tiene una img_id  que la destuya
        await (destroy(novedad.img_id));
    }

    await novedadesModel.deleteNovedadesById(id); //nos comunicamos con las bariables de model


    res.redirect('/admin/novedades');



}); // cierra get salir

router.get('/eliminarcomprar/:id', async (req, res, next) => {
    var id = req.params.id; //usamos parametros no body

    let comprar = await comprarModel.getComprarByid(id);
    if (comprar.img_id) { //aca le digo que si la novedad tiene una img_id  que la destuya
        await (destroy(comprar.img_id));
    }


    await comprarModel.deleteComprarById(id); //nos comunicamos con las bariables de model


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
        let img_id = req.body.img_original;
        let borrar_img_vieja = false;
        if (req.body.img_delete === "1") {
            img_id = null;
            borrar_img_vieja = true;
        } else {
            if (req.files && Object.keys(req.files).length > 0) {
                imagen = req.files.imagen;
                img_id = (await uploader(imagen.tempFilePath)).public_id;
                borrar_img_vieja = true;
            }
        }

        if (borrar_img_vieja && req.body.img_original) {
            await (destroy(req.body.img_original));
        }

        var obj = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo,
            img_id
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




router.get('/comprar', (req, res, next) => {
    res.render('admin/comprar', { //me mustra el render de agregar
        layout: 'admin/layout'
    }); //cierra render 
}); //cierra get

router.post('/comprar', async (req, res, next) => { //usamos router.post porque es un formulario
    try {
        var img_id = '';
        //console.log(req.files.imagen);

        if (req.files && Object.keys(req.files).length > 0) {
            imagen = req.files.imagen;
            img_id = (await uploader(imagen.tempFilePath)).public_id;
        }

        if (req.body.titulo != "" && req.body.zona != "" && req.body.ubicacion != "" && req.body.tipo != "" && req.body.precio != "" && req.body.descripcion != "") {
            await comprarModel.insertComprar({
                ...req.body,
                img_id
            });

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
});



/* para listar una sola propiedad a la venta by id - modificar - diseño */

router.get('/modificarcomprar/:id', async (req, res, next) => {

    var id = req.params.id;
    console.log(req.params.id);

    var comprar = await comprarModel.getComprarByid(id);

    res.render('admin/modificarcomprar', {
        layout: 'admin/layout',
        comprar
    })

});

//para modificar una propiedad a la venta
router.post('/modificarcomprar', async (req, res, next) => {
    try {

        let img_id = req.body.img_original;
        let borrar_img_vieja = false;
        if (req.body.img_delete === "1") {
            img_id = null;
            borrar_img_vieja = true;
        } else {
            if (req.files && Object.keys(req.files).length > 0) {
                imagen = req.files.imagen;
                img_id = (await uploader(imagen.tempFilePath)).public_id;
                borrar_img_vieja = true;
            }
        }

        if (borrar_img_vieja && req.body.img_original) {
            await (destroy(req.body.img_original));
        }

        var obj = {
            titulo: req.body.titulo,
            zona: req.body.zona,
            ubicacion: req.body.ubicacion,
            tipo: req.body.tipo,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            img_id

        }
        console.log(obj)

        await comprarModel.modificarComprarByid(obj, req.body.id);
        res.redirect('/admin/novedades');

    } catch (error) {
        console.log(error)
        res.render('admin/modificarcomprar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se modifico la propiedad'
        })
    }

})


module.exports = router;