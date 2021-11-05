function Login() {
  var Email = $("#Input_Email").val();
  var Password = $("#Input_Password").val();

  if (Email == "ander@gmail.com") {
    if (Password == "123456789") {
      window.open("Cliente.html");
    }
  }

  if (Email == "mecanico@mecanico.com") {
    if (Password == "123456789") {
      window.open("Mecanico.html");
    }
  }
}
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

/*-------------VALIDACIONES------------- */
const formulario = document.getElementById('login');


/**----------------Login-------------------- */
formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  if (formulario.checkValidity()) {
    var object = {};
    var datos_login = new FormData(formulario);
    datos_login.forEach((value, key) => object[key] = value);
    if(object.email=='admin@admin.com'){
      window.location.replace("/admin");
    }else{
        fetch("/auth", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(object),
        })
          .then((res) => res.json())
          .then((data) => {
            switch (data) {
              case "1":
                window.location.replace("/");
    
                break;
              case "2":
                Swal.fire({
                  icon: 'error',
                  title: 'algo salio mal...',
                  text: 'email o contraseña incorrecta!',
                  footer: '<a href="recovery.php">Quieres recuperar tu contraseña?</a>'
                })
                break;
              case "3":
                window.location.replace("/mecanico");
                break;
              default:
                break;
            }
    
          });
    }

  }
});

