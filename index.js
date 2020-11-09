'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
var persona_routes = require('./routes/personaRoute');
var autor_routes = require('./routes/autorRoute');
var libro_routes = require('./routes/libroRoute');
var prestamo_routes = require('./routes/prestamoRoute');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/api',prestamo_routes);
app.use('/api',persona_routes);
app.use('/api',autor_routes);
app.use('/api',libro_routes);

mongoose.connect('mongodb+srv://ignaciollb:123@cluster0.gmmvc.mongodb.net/taller3?retryWrites=true&w=majority', (err, res) => {

    if(err){
        console.log("NO CONECTA")
    }
    app.listen(5000, () => {

        console.log("Esta corriendo en puerto 5000")
    })
})