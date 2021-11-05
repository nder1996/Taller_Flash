
function Login_Admin(){

    var Email = $("#Input_Email").val();
    var Password = $("#Input_Password").val();

    if (Email == "admin@admin.com") {
        if (Password == "123456789") {


            window.open('Admin.html')

        }
    }

}