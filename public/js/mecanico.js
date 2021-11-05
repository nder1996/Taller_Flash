const idreparacion= document.getElementById("id_reparacion")
const estado= document.getElementById("estado")
let opcion=""
const modalReparacion= new bootstrap.Modal(
    document.getElementById("modal-reparacion")
);
function agregarmecanico(id_reparacion,id_mecanico){
    Swal.fire({
        icon: 'success',
        title: 'Reparacion añadida exitosamente!',
      }).then(function() {window.location = '/listreparacion/'+id_reparacion+'/'+id_mecanico;})
}

function editarestado(id_reparacion,estado_reparacion){
    idreparacion.value=id_reparacion
    estado.value=estado_reparacion
    opcion = "editar"
    modalReparacion.show()
    
}
$('.close').on('click', function (event) {
    modalReparacion.hide(); 
})

formReparacion.addEventListener("submit", (e) => {
    e.preventDefault();
    
    var datos = new FormData(formReparacion);
    //cambiar formdata a object para añadir
    var object=JSON.stringify(Object.fromEntries(datos));
    //submit de creacion
    //submit de edicion
    if (opcion == "editar") {
        console.log("awqwer");
        fetch("/editreparacion", {method: "POST",headers: {'Accept': 'application/json','Content-Type': 'application/json'},body:  object})
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data) {
                Swal.fire({
                    icon: 'success',
                    title: 'edit ejecutado correctamente!',
                }).then(function() {window.location = "/mecanico";})
            }
        });

    }
});


$(document).ready(function() {
    $('#tablamecanico').DataTable({
        "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        }
    });
    $('#tabladisponibles').DataTable({
        "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        }
    });
} );