var Prestamo = require('../modelos/prestamo.js');

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

module.exports = {
    guardar,
    listar,
    eliminar
};
