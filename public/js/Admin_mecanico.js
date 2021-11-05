$(document).ready(function() {
    $('#tabla_mecanicos').DataTable({
        "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        }
    });
} );
const modalMecanico= new bootstrap.Modal(
    document.getElementById("modal-mecanico")
);
const idmecanico=document.getElementById("id_mecanico");
const cedula=document.getElementById("cedula");
const nombre=document.getElementById("nombre");
const email=document.getElementById("email");
const password=document.getElementById("password");
const btncrear=document.getElementById("btncrear");
let opcion;
btncrear.addEventListener("click", () => {
    nombre.value = "";
    cedula.value = "";
    email.value = "";
    password.value = "";
    modalMecanico.show();
    opcion = "crear";

});
$('.close').on('click', function (event) {
       modalMecanico.hide(); 
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
        title: `esta seguro que quiere eliminar el mecanico ${nombre} con id ${id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText: `Confirmar`,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location='/deleteMecanicos/'+id;
        } 
      })
}
//editar

  
on(document, "click", "#editar_mecanico", (e) => {
    const fila = e.target.parentNode.parentNode;
    // editarproductoaux = e.target.parentNode.parentNode;
    idmecanico.value = fila.children[0].innerHTML;
    cedula.value = fila.children[1].innerHTML;
    nombre.value = fila.children[2].innerHTML;
    email.value = fila.children[3].innerHTML;
    password.value = fila.children[4].innerHTML;
    opcion = "editar";
    modalMecanico.show();
  });
  



formMecanico.addEventListener("submit", (e) => {
    e.preventDefault();
    var datos = new FormData(formMecanico);
    //cambiar formdata a object para añadir
    var object=JSON.stringify(Object.fromEntries(datos));
    //submit de creacion
    if (opcion == "crear") {
        fetch("/addmecanico", {method: "POST",headers: {'Accept': 'application/json','Content-Type': 'application/json'},body:  object})
        .then((res) => res.json())
        .then((data) => {
            switch (data) {
                case "1":
                  Swal.fire({
                    icon: 'success',
                    title: 'Registro ejecutado correctamente!',
                  }).then(function() {window.location = "/mecanicos";})
                  break;
                case "2":
                  Swal.fire({
                    icon: 'error',
                    title: 'algo salio mal...',
                    text: 'cedula o email ya en la base de datos ',
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