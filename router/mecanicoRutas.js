const express = require('express');
const router = express.Router();
const connection=require('../database/db')
const bcryptjs=require('bcryptjs');
const crud=require('../controllers/crud');

//cosas para el rol mecanico
router.get('/mecanico', (req, res) => {
    if(req.session.loggedin&&req.session.rol=='mecanico'){
        var estado='no asignado'
    connection.query('SELECT * FROM reparaciones_pendientes WHERE mecanico_encargado= ?;SELECT * FROM vehiculos;SELECT * FROM reparaciones_pendientes WHERE estado_reparacion= ?',[req.session.id_mecanico,estado],(error,results)=>{
        if(error)throw error;
        var arrvehiculos = {};results[1].map((obj)=>{arrvehiculos[obj.id_vehiculo] = obj.placa+" "+obj.marca+" "+obj.modelo;});   
        // console.log(results[2]);

        res.render('admin/Mecanico', {
            titulo: 'mecanico ',
            rol:req.session.rol,
            reparaciones:results[0],
            vehiculos:arrvehiculos,
            reparaciones_disponibles:results[2],
            id_mecanico:req.session.id_mecanico
        })
    })
    }else{
        res.redirect('/')
    }
})
router.get('/listreparacion/:id_reparacion/:id_mecanico',(req,res)=>{
    const id_reparacion=req.params.id_reparacion;
    const mecanico_encargado=req.params.id_mecanico;
    const estado_reparacion='mecanico asignado, en proceso'
    connection.query('UPDATE reparaciones_pendientes SET ? WHERE id_reparacion = ?',[{estado_reparacion,mecanico_encargado},id_reparacion],(error,results)=>{
        if(error)throw error;
        res.redirect('/mecanico');
                
    })
})
router.post('/editreparacion',crud.updateReparacion)//UPDATE
module.exports = router;