$(document).ready(function() {
    $('#tabla_vehiculos').DataTable({
        "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        }
    });
} );
const modalVehiculo= new bootstrap.Modal(
    document.getElementById("modal-vehiculo")
);
const idvehiculo=document.getElementById("id_vehiculo");
const idcliente=document.getElementById("id_cliente");
const placa=document.getElementById("placa");
const marca=document.getElementById("marca");
const modelo=document.getElementById("modelo");
const color=document.getElementById("color");
const btncrear=document.getElementById("btncrear");
let opcion;
btncrear.addEventListener("click", () => {
    
    idcliente.value = "";
    placa.value = "";
    marca.value = "";
    modelo.value = "";
    color.value = "";
    modalVehiculo.show();
    opcion = "crear";

});
$('.close').on('click', function (event) {
       modalVehiculo.hide(); 
})

//on para ids
const on = (element, event, selector, handler) => {
    element.addEventListener(event, (e) => {
      if (e.target.closest(selector)) {
        handler(e);
      }
    });
  };
//borrar

function confirmar(id,nombre){
    Swal.fire({
        title: `esta seguro que quiere eliminar el vehiculo con id ${id} de ${nombre} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText: `Confirmar`,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location='/deletevehiculo/'+id;
        } 
      })
}
//editar

  
on(document, "click", "#editar_mecanico", (e) => {
    const fila = e.target.parentNode.parentNode;
    // editarproductoaux = e.target.parentNode.parentNode;
    idvehiculo.value = fila.children[0].innerHTML;
    idcliente.value = fila.children[1].innerHTML;
    placa.value = fila.children[2].innerHTML;
    marca.value = fila.children[3].innerHTML;
    modelo.value = fila.children[4].innerHTML;
    color.value = fila.children[5].innerHTML;
    opcion = "editar";
    modalVehiculo.show();
  });
  



formVehiculo.addEventListener("submit", (e) => {
    e.preventDefault();
    var datos = new FormData(formVehiculo);
    //cambiar formdata a object para añadir
    var object=JSON.stringify(Object.fromEntries(datos));
    //submit de creacion
    if (opcion == "crear") {
        fetch("/addvehiculo", {method: "POST",headers: {'Accept': 'application/json','Content-Type': 'application/json'},body:  object})
        .then((res) => res.json())
        .then((data) => {
            switch (data) {
                case "1":
                  Swal.fire({
                    icon: 'success',
                    title: 'Registro ejecutado correctamente!',
                  }).then(function() {window.location = "/vehiculos";})
                  break;
                case "2":
                  Swal.fire({
                    icon: 'error',
                    title: 'algo salio mal...',
                    text: 'placa repetida, vehiculo ya agregado a la base de datos',
                  })
                  break;
                default:
                  break;
              }
        });
    }
    //submit de edicion
    if (opcion == "editar") {
        fetch("/updatemecanico", {method: "POST",headers: {'Accept': 'application/json','Content-Type': 'application/json'},body:  object})
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data) {
                Swal.fire({
                    icon: 'success',
                    title: 'edit ejecutado correctamente!',
                }).then(function() {window.location = "/mecanicos";})
            }
        });

    }
});