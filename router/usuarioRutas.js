const express = require('express');
const router = express.Router();
const connection=require('../database/db')
const bcryptjs=require('bcryptjs');

//rutas
router.get('/', (req, res) => {
    if(req.session.loggedin){
        res.render('index', {
        titulo: 'inicio',
        loggedin:true,
        nombre:req.session.nombre,
        rol:req.session.rol
        })
    }else{
        res.render('index', {
            titulo: 'inicio',
            loggedin:false,
            nombre:'',
            rol:''
        })
    }
    
})

router.get('/contacto', (req, res) => {
    if(req.session.loggedin){
        res.render('contacto', {
        titulo: 'inicio',
        loggedin:true,
        nombre:req.session.nombre,
        rol:req.session.rol
        })
    }else{
        res.render('contacto', {
            titulo: 'inicio',
            loggedin:false,
            nombre:'',
            rol:''
        })
    }
    
})
router.get('/cliente', (req, res) => {
    if(req.session.loggedin&&req.session.rol=='cliente'){
        connection.query('SELECT * FROM reparaciones_pendientes WHERE id_cliente= ?;SELECT * FROM vehiculos;SELECT * FROM lista_reparaciones',[req.session.id_cliente],(error,results)=>{
        if(error)throw error;
        var arrvehiculos = {};results[1].map((obj)=>{arrvehiculos[obj.id_vehiculo] = obj.placa+" "+obj.marca+" "+obj.modelo;});   
        var arrdescripcion = {};results[2].map((obj)=>{arrdescripcion[obj.titulo_lista] = obj.descripcion_lista;});   
        var arrprecio = {};results[2].map((obj)=>{arrprecio[obj.titulo_lista] = obj.precio;});   
        var validadorfactura=true;var estado='esperando pago del cliente';
        if (results[0].length!=0) {
            connection.query('SELECT * FROM facturas WHERE id_recepcion= ? AND estado_pago=? ;SELECT * FROM reparaciones_pendientes WHERE id_recepcion= ?',[results[0][0].id_recepcion,estado,results[0][0].id_recepcion],(error,factura)=>{
            if(error){throw error;}
            if (factura[0].length==0)validadorfactura=false;
                
            
            res.render('cliente', {
                titulo: 'mi perfil',
                rol:req.session.rol,
                loggedin:true,
                nombre:req.session.nombre,
                reparaciones:results[0],
                vehiculos:arrvehiculos,
                arrdescripcion:arrdescripcion,
                arrprecio:arrprecio,
                factura:factura[0][0],
                reparaciones_pendientes:factura[1],
                validadorfactura:validadorfactura
            })
            
            })
        }else{
            res.render('cliente', {
                titulo: 'mi perfil',
                rol:req.session.rol,
                loggedin:true,
                nombre:req.session.nombre,
                vehiculos:arrvehiculos,
                arrdescripcion:arrdescripcion,
                arrprecio:arrprecio,
                validadorfactura:false
            })
        }

        
        
    })
    }else{
        res.redirect('/')
    }
    
})
router.get('/servicios', (req, res) => {
    if(req.session.loggedin){
        res.render('servicios', {
        titulo: 'servicios',
        loggedin:true,
        nombre:req.session.nombre,
        rol:req.session.rol
        })
    }else{
        res.render('servicios', {
            titulo: 'servicios',
            loggedin:false,
            nombre:'',
            rol:''
        })
    }
    
})
router.get('/login', (req, res) => {
    res.render('login', {
        titulo: 'login',
        rol:''
    })
})

router.get('/registro', (req, res) => {
    res.render('registro', {
        titulo: 'registro',
        rol:''
    })
})
router.post('/editfactura/:id_factura', (req, res) => {
    const id_factura=req.params.id_factura;
    const estadopago='pago realizado'
    console.log(id_factura);
    connection.query('UPDATE facturas SET estado_pago=? WHERE id_factura = ?',[estadopago,id_factura],(error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.json('1');
        }
    })
})
//rutas post



module.exports = router;