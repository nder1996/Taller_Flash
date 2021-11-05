const conexion=require('../database/db')

//mecanicos

exports.saveMecanicos=(req,res)=>{
    const datos=req.body;
    conexion.query('INSERT INTO mecanicos SET ?',datos,(error,results)=>{
        if(error){
            if(error.errno==1062){
                res.json('2');
            }else{
               console.log(error);  
            }
        }else{
            res.json('1');
        }
    })
}
exports.updateMecanicos=(req,res)=>{
    const id=req.body.id_mecanico;
    const datos=req.body;
    delete datos.id_mecanico;
    conexion.query('UPDATE mecanicos SET ? WHERE id_mecanico = ?',[datos,id],(error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.json('1');
        }
    })
}
// vehiculos
exports.saveVehiculos=(req,res)=>{
    const datos=req.body;
    console.log(datos);
    conexion.query('INSERT INTO vehiculos SET ?',datos,(error,results)=>{
        if(error){
            if(error.errno==1062){
                res.json('2');
            }else{
               console.log(error);  
            }
        }else{
            res.json('1');
        }
    })
}
//  hoja de reparacion
exports.saveRecepcion=(req,res)=>{
    const datos=req.body;
    datos.piezas_necesarias='no registradas';
    conexion.query('INSERT INTO hojas_recepcion SET ?',datos,(error,results)=>{
        if(error){
            if(error.errno==1062){
                res.json('0');
            }else{
               console.log(error);  
            }
        }else{
            conexion.query('SELECT * FROM hojas_recepcion WHERE id_recepcion=(SELECT max(id_recepcion) FROM hojas_recepcion)',(error,results)=>{
                if (error) throw error;
                res.json(JSON.stringify(results[0]));
            })
            
        }
    })
}
exports.addReparacion=(req,res)=>{
    const datos=req.body;
    delete datos.piezas_necesarias;
    delete datos.video;
    console.log(datos);
    conexion.query('INSERT INTO reparaciones_pendientes SET ?',datos,(error,results)=>{
        if(error){
            if(error.errno==1062){
                res.json('0');
            }else{
               console.log(error);  
            }
        }else{
            res.json('1');
            
        }
    })
}
//mecanico ediciones
exports.updateReparacion=(req,res)=>{
    const id=req.body.id_reparacion;
    const estado=req.body.estado;
    conexion.query('UPDATE reparaciones_pendientes SET estado_reparacion=? WHERE id_reparacion = ?',[estado,id],(error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.json('1');
        }
    })
}
// facturas
exports.generarFactura=(req,res)=>{
    const datos=req.body;
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    datos.fecha_generacion=utc
    datos.estado_pago='esperando pago del cliente';
    conexion.query('INSERT INTO facturas SET ?',datos,(error,results)=>{
        if(error){
            if(error.errno==1062){
                res.json('2');
            }else{
               console.log(error);  
            }
        }else{
            res.json('1');
            
        }
    })
}