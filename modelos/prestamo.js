'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PrestamoSchema = Schema(
    {
        fecha:Date,
        libro: { type: Schema.ObjectId, ref: "libro" },
        persona: { type: Schema.ObjectId, ref: "personas" }
    })

module.exports = mongoose.model('prestamo',PrestamoSchema)    
