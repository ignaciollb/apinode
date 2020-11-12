'use strict'
 
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
 
// Cargamos el controlador
var libroController = require('../controllers/libroController');

// Llamamos al router
var api = express.Router();
 
//  Guardar Persona
api.post('/libro', libroController.guardar);
api.get('/libro', libroController.listar);
api.delete('/librobyID/:id', libroController.eliminar);
api.get('/librobyAutor/:id', libroController.librosAutor);



// api.post('/autoguardar',autoController.guardar);

// Exportamos la confi,guración
module.exports = api;
