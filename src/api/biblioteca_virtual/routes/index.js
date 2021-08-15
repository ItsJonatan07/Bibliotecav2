const express = require('express');
const router = express.Router();

//controllers
const LibrosCtrl = require('../controllers/LibrosCtrl');
const { check } = require('express-validator');


 //prueba de bitacora
router.get('/bitacora', LibrosCtrl.obtenerBitacora);

router.get('/', LibrosCtrl.obtenerLibros);
router.get('/:id', LibrosCtrl.obtenerLibroPorId);
    
router.post('/',[
    check('ISBN','El isbn solo puede tener numeros, sin espacio de 10 digitos hasta 13').matches(/^\d{10,13}$/),   
    check('TITULO','Letras y espacios, pueden llevar acentos').matches(/^[a-zA-ZÀ-ÿ\s]{5,100}$/),
    check('EDICION','Solo se aceptan letras y numeros no caracteres especiales').matches(/^[a-zA-Z0-9-ZÀ-ÿ\s\_\-]{5,100}$/),
    check('DESCRIPCION_LIBRO','Solo se aceptan letras no caracteres especiales').matches(/^[a-zA-ZÀ-ÿ\s]{5,150}$/),
    check('IDIOMA','Solo se aceptan letras, no numeros ni caracteres especiales').matches(/^[a-zA-ZÀ-ÿ\s]{5,100}$/),
    check('NOMBRE_EDITORIAL','Solo se aceptan letras no caracteres especiales ni numeros').matches(/^[a-zA-ZÀ-ÿ\s]{5,100}$/),
    check('NOMBRE_CATEGORIA'),
    check('DESCRIPCION','Solo se aceptan letras').matches(/^[a-zA-ZÀ-ÿ\s]{5,150}$/),
    check('NOMBRE_AUTOR','Ingrese solo letras no caracteres especiales').matches(/^[a-zA-ZÀ-ÿ\s]{5,100}$/),
    check('NACIONALIDAD','Solo se aceptan letras no caracteres especiales, ni numeros').matches(/^[a-zA-ZÀ-ÿ\s]{5,100}$/),
    check('PREMIOS','Solo se aceptan letras no caracteres especiales').matches(/^[a-zA-ZÀ-ÿ\s]{5,100}$/),
    check('RANKING','Solo se aceptan letras no caracteres especiales').matches(/^[a-zA-Z0-9\s\_\-\.]{5,100}$/)
], LibrosCtrl.agregarLibro);
router.put('/:id',[
    check('ISBN','El isbn solo puede tener numeros, sin espacio de 10 digitos hasta 13').matches(/^\d{10,13}$/),   
    check('TITULO','Letras y espacios, pueden llevar acentos').matches(/^[a-zA-ZÀ-ÿ\s]{5,100}$/),
    check('EDICION','Solo se aceptan letras y numeros no caracteres especiales').matches(/^[a-zA-Z0-9-ZÀ-ÿ\s\_\-]{5,100}$/),
    check('DESCRIPCION_LIBRO','Solo se aceptan letras no caracteres especiales').matches(/^[a-zA-ZÀ-ÿ\s]{5,150}$/),
    check('IDIOMA','Solo se aceptan letras, no numeros ni caracteres especiales').matches(/^[a-zA-ZÀ-ÿ\s]{5,100}$/),
    check('NOMBRE_EDITORIAL','Solo se aceptan letras no caracteres especiales ni numeros').matches(/^[a-zA-ZÀ-ÿ\s]{5,100}$/),
    check('NOMBRE_CATEGORIA'),
    check('DESCRIPCION','Solo se aceptan letras').matches(/^[a-zA-ZÀ-ÿ\s]{5,150}$/),
    check('NOMBRE_AUTOR','Ingrese solo letras no caracteres especiales').matches(/^[a-zA-ZÀ-ÿ\s]{5,100}$/),
    check('NACIONALIDAD','Solo se aceptan letras no caracteres especiales, ni numeros').matches(/^[a-zA-ZÀ-ÿ\s]{5,100}$/),
    check('PREMIOS','Solo se aceptan letras no caracteres especiales').matches(/^[a-zA-ZÀ-ÿ\s]{5,100}$/),
    check('RANKING','Solo se aceptan letras no caracteres especiales').matches(/^[a-zA-Z0-9\s\_\-\.]{5,100}$/)
], LibrosCtrl.actualizarLibro);
router.delete('/:id', LibrosCtrl.eliminarLibro);




module.exports = router;  