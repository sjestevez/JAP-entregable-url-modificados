//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var Datos = {
    nombre : "",
    apellido : "",
    edad : "",
    email : "",
    telefono : "",
    celular : "",
    direccion : "",
    direccion2 : "",
    ciudad : "",
    departamento : "",
    zip : ""
};

function guardarDatos(){
    var elementos_campos = document.getElementsByClassName("form-control");
    invalidos = 0;

    for (let i = 0; i < elementos_campos.length; i++){
        if (elementos_campos[i].value === "" || elementos_campos[i].value === "Elegir..."){
            elementos_campos[i].classList.add("is-invalid");
            elementos_campos[i].classList.remove("is-valid");
        } else {
            elementos_campos[i].classList.add("is-valid");
            elementos_campos[i].classList.remove("is-invalid");
        }
    }

    for (let i = 0; i < elementos_campos.length; i++){
        if (elementos_campos[i].classList.contains("is-invalid")){
            invalidos = invalidos + 1;
        }
    }

    if (invalidos){
        alert("Debe llenar todos los campos.");
    } else {
        Datos.nombre = document.getElementById("inputName").value;
        Datos.apellido = document.getElementById("inputLastName").value;
        Datos.edad = document.getElementById("inputAge").value;
        Datos.email = document.getElementById("inputEmail").value;
        Datos.telefono = document.getElementById("inputTelephone").value;
        Datos.celular = document.getElementById("inputCellphone").value;
        Datos.direccion = document.getElementById("inputAddress").value;
        Datos.direccion2 = document.getElementById("inputAddress2").value;
        Datos.ciudad = document.getElementById("inputCity").value;
        Datos.departamento = document.getElementById("inputState").value;
        Datos.zip = document.getElementById("inputZip").value;
        
        sessionStorage.setItem("datos_usuario", JSON.stringify(Datos));
    }
}

function cargarDatos(){
    let datos_aux = sessionStorage.getItem("datos_usuario");
    Datos = JSON.parse(datos_aux);

    document.getElementById("inputName").value = Datos.nombre;
    document.getElementById("inputLastName").value = Datos.apellido;
    document.getElementById("inputAge").value = Datos.edad;
    document.getElementById("inputEmail").value = Datos.email;
    document.getElementById("inputTelephone").value = Datos.telefono;
    document.getElementById("inputCellphone").value = Datos.celular;
    document.getElementById("inputAddress").value = Datos.direccion;
    document.getElementById("inputAddress2").value = Datos.direccion2;
    document.getElementById("inputCity").value = Datos.ciudad;
    document.getElementById("inputState").value = Datos.departamento;
    document.getElementById("inputZip").value = Datos.zip;
}

function cambiarFoto(){
    var imagen = prompt("Por favor ingresa una URL para usar como nueva foto. Ejemplo: https://i.ibb.co/QrfGCJ9/tree1.jpg");
    sessionStorage.setItem("imagen_usuario", imagen);
    document.getElementById("fotoUsuario").src=imagen;
}

document.addEventListener("DOMContentLoaded", function (e) {
    if (sessionStorage.getItem("datos_usuario") != undefined){
        cargarDatos();
    }

    if (sessionStorage.getItem("imagen_usuario") != undefined){
        document.getElementById("fotoUsuario").src=sessionStorage.getItem("imagen_usuario");
    }
});