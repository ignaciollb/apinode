'use strict'
 
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
 
// Cargamos el controlador
var prestamoController = require('../controllers/prestamoController');

// Llamamos al router
var api = express.Router();
 
//  Guardar Persona
api.post('/prestamo', prestamoController.guardar);
api.get('/prestamo', prestamoController.listar);
api.delete('/prestamobyID/:id', prestamoController.eliminar);



// api.post('/autoguardar',autoController.guardar);

// Exportamos la confi,guración
module.exports = api;
