/*-------------VALIDACIONES------------- */
const formulariovideo = document.getElementById('videoForm');
const videolabel=document.getElementById('archivo')
const modalvideo= new bootstrap.Modal(
  document.getElementById("videomodal")
);
let id_recepcion;
function abrirformvideo(id){
  videolabel.value=''
  id_recepcion=id;
  modalvideo.show();
}
function cerrarvideo(){
  modalvideo.hide();
}
/**----------------REGISTRO-------------------- */
videoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  var datos_registro = new FormData(formulariovideo);
  fetch("/subir/"+id_recepcion, { method: "POST",body: datos_registro,}).then((res) => res.json())
    .then((data) => {
      switch (data) {
        case "1":
          Swal.fire({
            icon: 'success',
            title: 'Video subido exitosamente',
          }).then(function() {
            window.location = "/admin";
          })
         
          break;
        case "2":
          Swal.fire({
            icon: 'error',
            title: 'algo salio mal...',
            text: 'el archivo que intentas subir no es un mp4!',
            footer: 'intentalo de nuevo'
          })
          break;
        default:
          break;
      }

    });

});
//*************** parte de las facturas*********************

function generarFactura(id_recepcion,nombre_cliente,nombre_vehiculo,reparaciones_realizadas,costo_total){
  var factura=new Object();
  factura.id_recepcion=id_recepcion
  factura.nombre_cliente=nombre_cliente
  factura.nombre_vehiculo=nombre_vehiculo
  factura.reparaciones_realizadas=reparaciones_realizadas
  factura.costo_total=costo_total
  fetch("/generarfactura", {method: "POST",headers: {'Accept': 'application/json','Content-Type': 'application/json'},body: JSON.stringify(factura),})
    .then((res) => res.json())
    .then((data) => {
      switch (data) {
        case "1":
          Swal.fire({
            icon: 'success',
            title: 'Factura generada exitosamente',
          }).then(function() {window.location = "/admin";})
            
          
          break;
        case "2":
          Swal.fire({
            icon: 'error',
            title: 'ya generaste una factura!',
          })
          break;
        default:
          break;
      }

    });
}



function pagarfactura(id_factura){
  fetch("/editfactura/"+id_factura, { method: "POST"}).then((res) => res.json())
  .then((data) => {
    switch (data) {
      case "1":
        Swal.fire({
          icon: 'success',
          title: 'Pago realizado exitosamente',
        }).then(function() {
          window.location = "/admin";
        })
       
        break;
      case "2":
        Swal.fire({
          icon: 'error',
          title: 'algo salio mal...',
          text: 'hubo un problema con el pago',
          footer: 'intentalo de nuevo'
        })
        break;
      default:
        break;
    }

  });
}