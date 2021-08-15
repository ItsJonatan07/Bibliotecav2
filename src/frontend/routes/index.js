const express = require('express');
const router = express.Router();


// controllers
const authCtrl = require('../controllers/auth/AuthCtrl'); 
const calificacionesCtrl = require('../controllers/registro_calificaciones/ModRegistroCalificacionesCtrl');
const bibliotecaCtrl = require('../controllers/biblioteca_virtual/ModBibliotecaVirtualCtrl');
//const { check } = require('express-validator'); 

router.get('/auth/login', authCtrl.pageAuth);
router.get('/auth/recuperacion', authCtrl.recuperacion);
router.get('/auth/new_password', authCtrl.newPassword);
router.get('/', authCtrl.pantalla_inicio);

router.get('/calificaciones', calificacionesCtrl.pantalla_inicio);
// router.get('/calificaciones', require('./registro_calificaciones'));

router.get('/Registrar', bibliotecaCtrl.pantalla_bibliteca_registrar);
router.get('/Consultar', bibliotecaCtrl.pantalla_bibliteca_consultar);
router.get('/Descargar', bibliotecaCtrl.pantalla_bibliteca_descargar);
router.get('/Mantenimiento', bibliotecaCtrl.pantalla_biblioteca_mantenimiento);

module.exports = router;