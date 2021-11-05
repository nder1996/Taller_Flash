const express = require('express');
const router = express.Router();
const connection=require('../database/db')
const bcryptjs=require('bcryptjs');


router.get('/cerrarsesion', (req, res) => {
    req.session.destroy(()=>{
        res.redirect('/');
    });
    /*req.session.usuario=null;
    req.session.loggedin=false
    res.redirect('/')*/
    
    
})
router.post('/registrousuario',async(req,res)=>{
    //console.log(req); 
    const datos=req.body;
    console.log(datos); 
    datos.password= await bcryptjs.hash(req.body.password,8);
    
    connection.query('INSERT INTO clientes SET ?',datos,async(error,results)=>{
        if(error){
            if(error.errno==1062){
                res.json('2');
                console.log(error);  
            }else{
               console.log(error);  
            }
            
            //res.json('1');
        }else{
            console.log('results');
            console.log(results);
            console.log(datos); 
            //res.redirect('/login');
            res.json('1');
        }
    })
})
router.post('/auth',(req,res)=>{
    const datos=req.body;
    // console.log(datos);
    connection.query('SELECT * FROM mecanicos WHERE email=? AND password=?',[datos.email,datos.password],async(error,resultado)=>{
        if (resultado.length!=0) {
            req.session.loggedin=true;
            req.session.rol='mecanico';
            req.session.id_mecanico=resultado[0].id_mecanico;
            req.session.cedula=resultado[0].cedula;
            req.session.nombre = resultado[0].nombre;
            res.json('3');            
        }else{
            connection.query('SELECT * FROM clientes WHERE email=?',[datos.email],async(error,results)=>{
            if ( results.length==0 || !(await bcryptjs.compare(datos.password,results[0].password) )) {
                console.log("no encontrado");
                res.json('2');
            } else {
                req.session.loggedin=true;
                req.session.rol='cliente';
                req.session.id_cliente=results[0].id_cliente;
                req.session.cedula=results[0].cedula;
                req.session.nombre = results[0].nombre;
                

                res.json('1');
                //res.redirect('/');       
            }
            })  
        }

    })
})

module.exports = router;