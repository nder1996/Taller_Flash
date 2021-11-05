
$(document).ready(function() {
    $('#tablacliente').DataTable({
        "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        }
    });
    
} );

function pagarfactura(id_factura){
    fetch("/editfactura/"+id_factura, { method: "POST"}).then((res) => res.json())
    .then((data) => {
      switch (data) {
        case "1":
          Swal.fire({
            icon: 'success',
            title: 'Pago realizado exitosamente',
          }).then(function() {
            window.location = "/cliente";
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