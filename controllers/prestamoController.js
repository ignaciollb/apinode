var Prestamo = require('../modelos/prestamo.js');
var Autor = require('../modelos/autor.js');
var Persona = require('../modelos/persona.js');
var funciones = require('../helpers/funciones.js')

function guardar(req,res){

    let prestamo = new Prestamo()
    let fecha = new Date()
    prestamo.fecha= fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear();
    prestamo.libro=req.body.libro
    prestamo.persona=req.body.persona

    prestamo.save((err, prestamo) => {
        res.status(200).send({ registroInsertado: prestamo })

    })

}

function listar(req,res){
    Prestamo.find()
    .populate('libro') 
    .populate('persona')
      .exec((err, prestamo) => {
       res.status(200).send({ prestamo })
     })
 }
 
 function eliminar(req,res){
    let idprestamo = req.params.id
    Prestamo.findByIdAndDelete(idprestamo,(err,prestamo)=>{
        if(err) return res.status(500).send({message:'Error al realizar la peticion'})
        if(!prestamo) return res.status(404).send({message:'Error la persona no existe'}) 
        res.status(200).send({message:'prestamo eliminado'})

     })
}
//El nombre de los autores de los libros prestados a una persona especifica, buscado por ID de la persona.
function autoresPersona(req,res){
    let idpersona = req.params.id
    let autores = []
    let respuesta = []
    Prestamo.find({persona: idpersona })
    .populate('libro','autor')
    .exec((err,prestamo) => {
        prestamo.forEach(element => {
            autores.push(element.libro.autor)
        })
        Autor.find({_id:autores},(err,autors) => {
            autors.forEach(element => {
                respuesta.push(element.nombre)
            })
            res.status(200).send({respuesta})
        })
    })
}
//Todos los nombres y códigos de libro que alguna ves han sido prestados a una persona en especifico, buscando por el rut de la persona.

function librosPersona(req,res){
    let rut_ingresado = req.params.rut
    Persona.find({rut:rut_ingresado},(err,persona) => {
        let idPersona = persona[0]._id
        Prestamo.find({persona:idPersona})
        .populate('libro','nombre codigo')
        .exec((err,resultado)  => {  
            console.log(resultado)
            res.status(200).send(resultado)
        })
    })
}

module.exports = {
    guardar,
    listar,
    eliminar,
    autoresPersona,
    librosPersona
};
