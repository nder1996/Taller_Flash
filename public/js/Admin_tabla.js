$(document).ready(function() {
    $('#Admin-Clientes').DataTable({
        "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        }
    });
    $('#tablafactura').DataTable({
      "language": {
      "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
      }
  });
} );
const modalRecepcion= new bootstrap.Modal(
    document.getElementById("modal-recepcion")
);
const modalReparacion= new bootstrap.Modal(
  document.getElementById("modal-reparacion")
);
const idrecepcion=document.getElementById("id_recepcion");
const idvehiculo=document.getElementById("id_vehiculo");
const idcliente=document.getElementById("id_cliente");
const btncrear=document.getElementById("btncrear");
let opcion;
let variablesreparacion={}
const descripcionreparacion=document.getElementById("descripcion_reparacion");
btncrear.addEventListener("click", () => {
    
    idcliente.value = "";
    idvehiculo.value = "";
    modalRecepcion.show();
    opcion = "crear";

});
$('.close').on('click', function (event) {
       modalRecepcion.hide();
       modalReparacion.hide(); 
  
})
$('.closemecanico').on('click', function (event) {
       modalRecepcion.hide();
       modalReparacion.hide(); 
       window.location='/admin';
})

//para hacer el update de los usuarios
idcliente.onchange=()=>{
  idvehiculo.innerHTML=""
  vehiculoslist.forEach(vehiculo=>{
    if(vehiculo.id_cliente==idcliente.value){
      idvehiculo.innerHTML+=`<option value="${vehiculo.id_vehiculo}" >${vehiculo.marca} ${vehiculo.modelo} color ${vehiculo.color}</option>`
    };
  })
}

//borrar

function confirmar(id,nombre){
    Swal.fire({
        title: `esta seguro que quiere eliminar la recepcion #${id} con el usuario ${nombre} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText: `Confirmar`,
      }).then((result) => {
        if (result.isConfirmed) window.location='/deleterecepcion/'+id;
      })
}


formRecepcion.addEventListener("submit", (e) => {
    e.preventDefault();
    var datos = new FormData(formRecepcion);
    //cambiar formdata a object para añadir
    var object=JSON.stringify(Object.fromEntries(datos));
    //submit de creacion
    if (opcion == "crear") {
        fetch("/addrecepcion", {method: "POST",headers: {'Accept': 'application/json','Content-Type': 'application/json'},body:  object})
        .then((res) => res.json())
        .then((data) => {
            if (data==0) {
              Swal.fire({icon: 'error',title: 'algo salio mal...',text: 'algun valor esta ya agregado a la base de datos'})
            }else{
              console.log(data);
              variablesreparacion=data;
              console.log(variablesreparacion);
              // idrecepcion.value=data;
              modalRecepcion.hide();
              modalReparacion.show();
              
            }
        });
    }
    //submit de edicion
});
formReparacion.addEventListener("submit", (e) => {
  e.preventDefault();
  var datos = new FormData(formReparacion);
  var datosreparacion=JSON.parse(variablesreparacion);
  //cambiar formdata a object para añadir
  var object=JSON.stringify(Object.fromEntries(datos));
  object2=JSON.parse(object);
  datosreparacion.descripcion_reparacion=datos.get('descripcion_reparacion');
  datosreparacion.mecanico_encargado=0;
  datosreparacion.estado_reparacion='no asignado';
  console.log(datosreparacion);
  //submit de creacion
      fetch("/addreparacionadmin", {method: "POST",headers: {'Accept': 'application/json','Content-Type': 'application/json'},body:  JSON.stringify(datosreparacion)})
      .then((res) => res.json())
      .then((data) => {
          if (data==0) {
            Swal.fire({icon: 'error',title: 'algo salio mal...',text: 'algun valor esta ya agregado a la base de datos'})
          }else{
            modalReparacion.hide();
            descripcionreparacion.values=""
            Swal.fire({
              icon: 'success',
              title: 'Reparacion añadida correctamente!',
            }).then(function() {
              document.getElementById('elegir_reparacion').innerHTML='quiere añadir una reparacion mas?'
              modalReparacion.show();})
            
          }
      });
  //submit de edicion
});