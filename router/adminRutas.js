const express = require('express');
const router = express.Router();
const connection=require('../database/db')
const bcryptjs=require('bcryptjs');
const crud=require('../controllers/crud');
const multer=require('multer');
var path = require('path')
//archivos
const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./public/videos')
    },
    filename: (req,file,cb)=>{
        console.log(path.extname(file.originalname));
        cb(null,req.session.recepcionvideo+path.extname(file.originalname))
    }
    
})
const upload=multer({
    storage,
    fileFilter: function (req, file, cb) {
        console.log(path.extname(file.originalname));
        var ext = path.extname(file.originalname);
        if(  ext !== '.mp4') {
            return   cb(new Error('el archivo no es mp4'))
        }
        cb(null, true)
    }
}).single('archivo')







router.get('/adminLogin', (req, res) => {
    
    res.render('admin/Admin_Login', {
        rol: 'admin'
    })
})

router.get('/admin', (req, res) => {
    req.session.rol='admin';
    req.session.loggedin=true;
    connection.query('SELECT * FROM hojas_recepcion;SELECT * FROM vehiculos;SELECT * FROM clientes;SELECT * FROM reparaciones_pendientes;SELECT * FROM mecanicos;SELECT * FROM lista_Reparaciones;SELECT * FROM facturas',(error,results)=>{
        if(error){throw error;}
        var arrvehiculos = {};results[1].map((obj)=>{arrvehiculos[obj.id_vehiculo] = obj.marca+" "+obj.modelo;});
        var arrclientes = {};results[2].map((obj)=>{arrclientes[obj.id_cliente] = obj.nombre;});
        var arrmecanicos = {};results[4].map((obj)=>{arrmecanicos[obj.id_mecanico] = obj.nombre;});
        var arrreparaciones = {};results[5].map((obj)=>{arrreparaciones[obj.titulo_lista] = obj.precio;});

        var array=results[0].map(lista => {
             var resultado = results[3].filter(obj => {
                return obj.id_recepcion === lista.id_recepcion
              })
            return resultado;
        })
        res.render('admin/Admin', {
            
            titulo: 'admin',
            rol: 'admin',
            arrclientes:arrclientes,
            arrvehiculos:arrvehiculos,
            lista_recepcion:results[0],
            clientes:results[2],
            vehiculos:results[1],
            mecanicos:results[4],
            reparaciones_pendientes:array,
            arrmecanicos:arrmecanicos,
            lista_reparaciones:results[5],
            arrreparaciones:arrreparaciones,
            facturas:results[6],
        })
        
    })
})

// ruta de subida de videos
router.post('/subir/:id_recepcion',(req,res)=>{
    req.session.recepcionvideo=req.params.id_recepcion;

    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            res.json('2');
        } else{
            connection.query('UPDATE hojas_recepcion SET video=? WHERE id_recepcion = ?',[1,req.session.recepcionvideo],(error,results)=>{
                if(error){
                    console.log(error);
                }else{
                    res.json('1');
                }
            })
        }

    })
})
// ruta de generacion de facturas
router.post('/generarfactura',crud.generarFactura)

// crud mecanicos
//READ
router.get('/mecanicos', (req, res) => {
    
    connection.query('SELECT * FROM mecanicos',(error,results)=>{
        if(error){
            throw error;
        }else{
            res.render('admin/Admin_mecanico', {
                titulo: 'mecanicos listados',
                mecanicos:results,
                rol: 'admin'
            })
        }
        
    })
})
//ruta para eliminar DELETE
router.get('/deleteMecanicos/:id',(req,res)=>{
    const id=req.params.id;
    connection.query('DELETE FROM mecanicos WHERE id_mecanico= ?',[id],(error,results)=>{
        if(error)throw error;
        res.redirect('/mecanicos');
                
    })
})
router.post('/addmecanico',crud.saveMecanicos) //CREATE
router.post('/updatemecanico',crud.updateMecanicos)//UPDATE
// crud vehiculos
//READ
router.get('/vehiculos', (req, res) => {
    connection.query('SELECT * FROM vehiculos;SELECT * FROM clientes',(error,results)=>{
        if(error){throw error;}
        var clientesnombre = {};
        results[1].map((obj)=>{clientesnombre[obj.id_cliente] = obj.nombre;});
        res.render('admin/Admin_vehiculos', {
            titulo: 'vehiculos listados',
            vehiculos:results[0],
            clientes:results[1],
            clientesnombre:clientesnombre,
            rol: 'admin'
        })
    })
})
// DELETE
router.get('/deletevehiculo/:id',(req,res)=>{
    const id=req.params.id;
    connection.query('DELETE FROM vehiculos WHERE id_vehiculo= ?',[id],(error,results)=>{
        if(error)throw error;
        res.redirect('/vehiculos');         
    })
})
router.post('/addvehiculo',crud.saveVehiculos) //CREATE

// crud hoja de reparacion
router.post('/addrecepcion',crud.saveRecepcion)//CREATE

// DELETE
router.get('/deleterecepcion/:id',(req,res)=>{
    const id=req.params.id;
    connection.query('DELETE FROM hojas_recepcion WHERE id_recepcion= ?',[id],(error,results)=>{
        if(error)throw error;
        res.redirect('/admin');     
    })
})
router.post('/addreparacionadmin',crud.addReparacion)//CREATE

module.exports = router;