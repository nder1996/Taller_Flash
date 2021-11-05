//express
const express=require('express')
const app=express();
const session= require('express-session');
//motor de vistas
app.set('view engine','ejs');

//session
app.use(session({
    secret:'yojay',
    resave:true,
    saveUninitialized:true
}))
//body para el post
app.use(express.urlencoded({extended:false}));
//app.use(express(JSON));
app.use(express.json());
//rutas
app.use('/', require('./router/router'));
app.use('/', require('./router/usuarioRutas'));
app.use('/', require('./router/adminRutas'));
app.use('/', require('./router/mecanicoRutas'));
//archivos estaticos
app.use(express.static(__dirname + "/public"));


//inicio del servidor
app.listen(3003,()=>{
    console.log('conectado  al servidor 3000')
})

