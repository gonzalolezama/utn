var express = require('express');
var router = express.Router();
var novedadesModel = require('./../models/novedadesModel');
var comprarModel = require('./../models/comprarModel');
var cloudinary = require('cloudinary').v2;


router.get('/novedades', async function (req, res, next) {

    let novedades = await novedadesModel.getNovedades();

    novedades = novedades.map(novedades => {
        if (novedades.img_id) { //con el if chequeamos si la novedad tiene la img_id
            const imagen = cloudinary.url(novedades.img_id, { //si tiene traemela de cloudinary con las siguiente propiedad
                width: 200,
                height: 200,
                crop: 'fill' //crop es una propiedad de Cloudinari se puede sua pad que se adapte o rellene
            });
            return {
                ...novedades, // aca devuelve lo que pasa en novedad y le sumo lo de la imagen
                imagen // aca me devuelve la novedad con la imagen 
            }
        } else {
            return {
                ...novedades,
                imagen: '' // aca me devuelve la novedad con la imagen vacia esta las dos opciones, aca podriamos poner entre las comilla la ruta de una imagen no disponible
            }
        }
    });

    res.json(novedades);
});

//comprar

router.get('/comprar', async function (req, res, next) {

    let comprar = await novedadesModel.getComprar();

    comprar = comprar.map(comprar => {
        if (comprar.img_id) { //con el if chequeamos si la novedad tiene la img_id
            const imagen = cloudinary.url(comprar.img_id, { //si tiene traemela de cloudinary con las siguiente propiedad
                width: 200,
                height: 200,
                crop: 'fill' //crop es una propiedad de Cloudinari se puede sua pad que se adapte o rellene
            });
            return {
                ...comprar, // aca devuelve lo que pasa en novedad y le sumo lo de la imagen
                imagen // aca me devuelve la novedad con la imagen 
            }
        } else {
            return {
                ...comprar,
                imagen: '' // aca me devuelve la novedad con la imagen vacia esta las dos opciones, aca podriamos poner entre las comilla la ruta de una imagen no disponible
            }
        }
    });

    res.json(comprar);
});


module.exports = router;