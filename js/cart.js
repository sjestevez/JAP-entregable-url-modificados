//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var itemsCarrito = {};
var itemActual;
var subtotalFinal;
var total;
var opcionEnvio = 0;
var invalidos;
var direccionValida = false;
var envioValida = false;

function calcularTotales(){
    let camposPrecio = document.getElementsByClassName("total");
    let cantidad = document.getElementsByClassName("cantidad");
    subtotalFinal = 0;
    let cantidadArticulos = 0;
    for (let i = 0; i < camposPrecio.length; i++){
        let subtotal = parseInt(itemsCarrito.articles[i].unitCost) * parseInt(cantidad[i].value);
        camposPrecio[i].innerHTML = subtotal;
        cantidadArticulos += parseInt(cantidad[i].value);
        if (itemsCarrito.articles[i].currency === "UYU"){
            subtotalFinal += Math.ceil(subtotal / 40);
        } else {
            subtotalFinal += subtotal;
        }
    }
    document.getElementById("subtotalCompra").innerHTML = subtotalFinal;
    document.getElementById("cantidadArticulos").innerHTML = cantidadArticulos;
    document.getElementById("totalCompra").innerHTML = Math.ceil(subtotalFinal * 1.15);
}

function mostrarItems(){
    let htmlContentToAppend = "";
    for(let i = 0; i < itemsCarrito.articles.length; i++){
        itemActual = itemsCarrito.articles[i];
        htmlContentToAppend +=`
            <div class="row align-items-center list-group-item-action">
                <div class="col-1">
                    <img src="` + itemActual.src + `" alt="" class="img-thumbnail">
                </div>
                <div class="col-4">
                    <h3>` + itemActual.name + `</h3>
                </div>
                <div class="col-2">
                    <h4>`+ itemActual.currency + ` ` + itemActual.unitCost + `</h4>
                </div>
                <div class="col-2">
                    <input class="cantidad" type="number" size="3" onchange="calcularTotales()" min="0" value="` + itemActual.count + `">
                    <button class="btn btn-outline-secondary" onclick="borrarArticulo(` + i + `)" type="button">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                </div>
                <div class="col-2">
                    <h4><strong>` + itemActual.currency + ` <span class="total"></span></strong></h4>
                </div>
            </div>
            <hr class="my-3">
        `;
    }
    document.getElementById("carritoItems").innerHTML = htmlContentToAppend;
    calcularTotales();
}

function borrarArticulo(num){
    itemsCarrito.articles.splice(num, 1);
    mostrarItems();
}

function calcularTotalFinal(num){
    switch(num){
        case 0:
            document.getElementById("totalCompra").innerHTML = Math.ceil(subtotalFinal * 1.15);
        break;
        case 1:
            document.getElementById("totalCompra").innerHTML = Math.ceil(subtotalFinal * 1.07);
        break;
        case 2:
            document.getElementById("totalCompra").innerHTML = Math.ceil(subtotalFinal * 1.05);
        break;
        default:

    }
}

function noEnvio(){
    document.getElementById("totalCompra").innerHTML = Math.ceil(subtotalFinal);
}

function confirmarDireccion(){
    var elementos_direccion = document.getElementsByClassName("direccionForm");
    invalidos = 0;

    for (let i = 0; i < elementos_direccion.length; i++){
        if (elementos_direccion[i].value === "" || elementos_direccion[i].value === "Elegir..."){
            elementos_direccion[i].classList.add("is-invalid");
            elementos_direccion[i].classList.remove("is-valid");
        } else {
            elementos_direccion[i].classList.add("is-valid");
            elementos_direccion[i].classList.remove("is-invalid");
        }
    }

    for (let i = 0; i < elementos_direccion.length; i++){
        if (elementos_direccion[i].classList.contains("is-invalid")){
            invalidos = invalidos + 1;
        }
    }

    if (invalidos){
        alert("Debe llenar todos los campos.");
    } else {
        direccionValida = true;
        $('#modalDireccion').modal('hide');
    }


    /*
    var direccion = document.getElementById("inputAddress").value;
    var direccion2 = document.getElementById("inputAddress2").value;
    var ciudad = document.getElementById("inputCity").value;
    var departamento = document.getElementById("inputState").value;
    var codigo_zip = document.getElementById("inputZip").value;

    if ((direccion === "") ||
        (direccion2 === "") ||
        (ciudad === "") ||
        (departamento === "Elegir...") ||
        (codigo_zip === "")){
            alert("Debe llenar todos los campos.");
    } else {
            $('#modalDireccion').modal('hide');
    }
    */
}

function envioActivo(num){
    opcionEnvio = num;
    switch(opcionEnvio){
        case 0:
            var elemento_transferencia = document.getElementsByClassName("transferenciaForm");
            elemento_transferencia[0].classList.remove("is-valid");
            elemento_transferencia[0].classList.remove("is-invalid");
        break;
        case 1:
            var elementos_pago = document.getElementsByClassName("tarjetaForm");
            for (let i = 0; i < elementos_pago.length; i++){
                elementos_pago[i].classList.remove("is-valid");
                elementos_pago[i].classList.remove("is-invalid");
            }
        break;
    }
}

function confirmarEnvio(){
    switch(opcionEnvio){
        case 0:
            var elementos_pago = document.getElementsByClassName("tarjetaForm");
            invalidos = 0;
        
            for (let i = 0; i < elementos_pago.length; i++){
                if (elementos_pago[i].value === ""){
                    elementos_pago[i].classList.add("is-invalid");
                    elementos_pago[i].classList.remove("is-valid");
                } else {
                    elementos_pago[i].classList.add("is-valid");
                    elementos_pago[i].classList.remove("is-invalid");
                }
            }
        
            for (let i = 0; i < elementos_pago.length; i++){
                if (elementos_pago[i].classList.contains("is-invalid")){
                    invalidos = invalidos + 1;
                }
            }
        
            if (invalidos){
                alert("Debe llenar todos los campos.");
            } else {
                envioValida = true;
                $('#modalEnvio').modal('hide');
            } 
        break;
        case 1:
            var elemento_transferencia = document.getElementsByClassName("transferenciaForm");
            var j = 0;
            if (elemento_transferencia[j].value === ""){
                elemento_transferencia[j].classList.add("is-invalid");
                elemento_transferencia[j].classList.remove("is-valid");
            } else {
                elemento_transferencia[j].classList.add("is-valid");
                elemento_transferencia[j].classList.remove("is-invalid");
            }

            if (elemento_transferencia[j].classList.contains("is-invalid")){
                alert("Debe llenar todos los campos.");
            } else {
                envioValida = true;
                $('#modalEnvio').modal('hide');
            }
        break;
    }
}

function procesarDatos(){
    if ((envioValida === false) || (direccionValida === false)){
        alert("Debe completar los campos de dirección y envio.");
    } else {
        let formularioDireccion = document.getElementById("direccionForm");
        let formularioPago = document.getElementById("pagoForm");
        let formularioFinal = document.getElementById("envioDatoForm");

        formularioFinal[0].value = formularioDireccion[0].value;
        formularioFinal[1].value = formularioDireccion[1].value;
        formularioFinal[2].value = formularioDireccion[2].value;
        formularioFinal[3].value = formularioDireccion[3].value;
        formularioFinal[4].value = formularioDireccion[4].value;
        if (formularioDireccion[6].checked){
            formularioFinal[5].value = formularioDireccion[6].value;
        } else if (formularioDireccion[7].checked){
            formularioFinal[5].value = formularioDireccion[7].value;
        } else {
            formularioFinal[5].value = formularioDireccion[8].value;
        }
        if (formularioPago[0].checked){
            formularioFinal[6].value = 0;
            formularioFinal[7].value = formularioPago[1].value;
            formularioFinal[8].value = formularioPago[2].value;
            formularioFinal[9].value = formularioPago[3].value;
            formularioFinal[10].value = formularioPago[4].value;
        } else {
            formularioFinal[6].value = 1;
            formularioFinal[11].value = formularioPago[6].value;
        }
        formularioFinal.submit();
    }
}    

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        itemsCarrito = resultObj.data;

        mostrarItems();
    });
});