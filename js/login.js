//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});


function logeo(){
    var usuario = document.getElementById("inputUser").value;
    var contra = document.getElementById("inputPassword").value;
    if ((usuario === "") || (contra === "")){
        alert("Debe ingresar usuario y contraseña");
    } else {
        sessionStorage.setItem("nombre_usuario", usuario);
        window.location.href = "index-main.html";
    }
}