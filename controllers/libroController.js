const autor = require('../modelos/autor.js');
var Libro = require('../modelos/libro.js');

function guardar(req,res){

    let libro = new Libro()
    libro.nombre=req.body.nombre
    libro.idioma=req.body.idioma
    libro.codigo=req.body.codigo
    libro.autor= req.body.autor
    libro.anio= req.body.anio
    libro.save((err, libro) => {
        res.status(200).send({ registroInsertado: libro })

    })

}

function listar(req,res){
    Libro.find()
     .populate('libro')
     .populate('autor')
      .exec((err, libro) => {
       res.status(200).send({ libro })
     })
 }
 
 function eliminar(req,res){
    let idlibro = req.params.id
    Libro.findByIdAndDelete(idlibro,(err,libro)=>{
        if(err) return res.status(500).send({message:'Error al realizar la peticion'})
        if(!libro) return res.status(404).send({message:'Error la persona no existe'}) 
        res.status(200).send({message:'Libro eliminado'})

     })
}

//Todos los libros de un Autor especifico, buscado por ID.

function librosAutor(req,res){
    let idautor = req.params.id
    Libro.find({autor: idautor }) // filtra los datos desde el modelo Libro
    //.populate('autor',{_id:{$eq: idautor}}) filtra datos del objeto autor
    .populate('autor') 
    .exec((err,libro) => {
        res.status(200).send({libro})
    })
}

module.exports = {
    guardar,
    listar,
    eliminar,
    librosAutor
};
