'use strict'

// AQUI Cargamos el modelo para usarlo posteriormente en la siguiente clase
var Autor = require('../modelos/autor.js');
var funciones = require('../helpers/funciones.js')
var Libro = require('../modelos/libro.js');


function guardar(req,res){

    let autor = new Autor()
    autor.nombre = req.body.nombre 
    autor.nacionalidad = req.body.nacionalidad

    autor.save((err, autorguardado) => {
        res.status(200).send({ autorInsertado: autorguardado })
    })

}


function listar(req,res){
     Autor.find()
      .populate('autor').exec((err, autor) => {
        res.status(200).send({ autor })
      })
  }

function eliminar(req,res){
let idautor = req.params.id
Autor.findByIdAndDelete(idautor,(err,autor)=>{
    if(err) return res.status(500).send({message:'error al realizar la peticion'})
    if(!autor) return res.status(404).send({message:'Error la persona no existe'}) 
    res.status(200).send({message:'Autor eliminada'})

    })

}




module.exports = {
    guardar,
    listar,
    eliminar
};
