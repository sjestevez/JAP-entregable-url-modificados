var product = {};
var comentarios = [];
var productosTodos = [];

//Funcion que muestra las imagenes en forma de carousel
function showImagesGallery(array){

    let htmlContentToAppend = "";
    htmlContentToAppend += `
    <div id="carouselExampleControls" class="carousel slide container-fluid" data-ride="carousel">
        <div class="carousel-inner">`;

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];
        
        //Con esto hago que la primera foto tenga "active" y que las siguientes no
        //de otra manera no funcionaria el programa
        if ( i == 0){
            htmlContentToAppend += `
            <div class="carousel-item active">
                <img src="` + imageSrc + `" class="d-block w-100" alt="">
            </div>`;
        } else {
            htmlContentToAppend += `
            <div class="carousel-item">
                <img src="` + imageSrc + `" class="d-block w-100" alt="">
            </div>`;
        }
    }
    htmlContentToAppend += `
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>`
    document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
}

function showProductComments(){
    
    let htmlContentToAppend = "";

    for(let i = 0; i < comentarios.length; i++){
        let comentarioActual = comentarios[i];
        comentarioPuntuacion = showProductScore(comentarioActual.score);

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <h5 class="mb-1">Calificación: `+ comentarioPuntuacion +`</h5><br>
                </div>
                <div class=col">
                    <div>
                        <p><strong>Descripción:</strong> ` + comentarioActual.description + `</p>
                        <p><strong>Usuario:</strong>  ` +comentarioActual.user + `</p>
                        <p><strong>Fecha comentario:</strong> ` + comentarioActual.dateTime + `</p>
                    </div>
                </div>
            </div>
        </div>`
    }

    document.getElementById("productComments").innerHTML = htmlContentToAppend;
}

function showProductScore(score){
    var comentarioEstrellas = "";

    switch (score){
        case 1:
            comentarioEstrellas = `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`

            return comentarioEstrellas;
        break;
        case 2:
            comentarioEstrellas = `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`

            return comentarioEstrellas;
        break;
        case 3:
            comentarioEstrellas = `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`

            return comentarioEstrellas;
        break;
        case 4:
            comentarioEstrellas = `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>`

            return comentarioEstrellas;
        break;
        case 5:
            comentarioEstrellas = `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>`

            return comentarioEstrellas;
        break;
    }
}

//Funcion que muestra los productos relacionados e información sobre ellos
function showRelatedProducts(){
    let htmlContentToAppend = `
    <div id="carouselExampleCaptions" class="carousel slide container-fluid" data-ride="carousel">
    <div class="carousel-inner">`;
    let primero = true;
    for(let i = 0; i < productosTodos.length; i++){
        let productoActual = productosTodos[i];
        let idProducto = i;
        
        //Esta es la manera en la que me aseguro de que el productoActual sea uno de los relacionados
        for(let j = 0; j < product.relatedProducts.length; j++){
            let idProductoRelacionado = product.relatedProducts[j];
            if (idProducto === idProductoRelacionado){
                //Con esto hago que la primera foto tenga "active" y que las siguientes no
                //de otra manera no funcionaria el programa
                if (primero){
                    htmlContentToAppend += `
                    <div class="carousel-item active">
                        <img src="` + productoActual.imgSrc + `" class="d-block w-100" alt="">
                        <div class="carousel-caption d-none d-md-block">
                            <h5 class="texto-carousel">` + productoActual.name + `</h5>
                            <p class="texto-carousel">Precio: ` + productoActual.cost + ` ` + productoActual.currency + `</p>
                        </div>
                    </div>
                    `;
                    primero = false;
                } else {
                    htmlContentToAppend += `
                    <div class="carousel-item">
                        <img src="` + productoActual.imgSrc + `" class="d-block w-100" alt="">
                        <div class="carousel-caption d-none d-md-block">
                            <h5 class="texto-carousel">` + productoActual.name + `</h5>
                            <p class="texto-carousel">Precio: ` + productoActual.cost + ` ` + productoActual.currency + `</p>
                        </div>
                    </div>
                    `;
                }
            }
        }
    }
    htmlContentToAppend += `
        </div>
        <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>`   
    document.getElementById("relatedProducts").innerHTML = htmlContentToAppend; 
}

//Funcion que toma y publica el comentario que el usuario ingreso
function enviarComentario(){
    let comentarioAEnviar = {
        user:document.getElementById("comentarioUsuario").value,
        description:document.getElementById("comentario").value,
        score:parseInt(document.getElementById("comentarioPuntuacion").value),
        dateTime:agarrarFecha()
    };
    comentarios.push(comentarioAEnviar);
    showProductComments();
}

//Funcion que agarra la Fecha y hora actual para los comentarios
function agarrarFecha(){
    var fecha = new Date();

    //Función que se encarga de agregar un 0 al comienzo de los segundos, minutos, horas, dias, meses
    //para hacer que la hora de los comentarios se vea correctamente
    function agregarCero(num){
        if (num < 10){
                    let num_aux = "0" + num;
                    num = num_aux;
        }
        return num;				
    }
    
    let fechaActual = fecha.getFullYear() + `-` + agregarCero(fecha.getMonth()+1) + `-` + 
    agregarCero(fecha.getDate()) + ` ` + agregarCero(fecha.getHours()) + `:` + agregarCero(fecha.getMinutes()) + `:` +
    agregarCero(fecha.getSeconds());
    return fechaActual;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("productCount");
            let productPriceHTML = document.getElementById("productPrice");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.soldCount;
            productPriceHTML.innerHTML = product.currency + " " + product.cost;
            
            //Muestro las imagenes en forma de carousel
            showImagesGallery(product.images);
        }
    });
    
    //Tomo los datos de los comentarios
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj2){
        if (resultObj2.status === "ok")
        {
            comentarios = resultObj2.data;

            showProductComments();
        }
    });

    //Toma la información de producto para los productos relacionados
    getJSONData(PRODUCTS_URL).then(function(resultObj3){
        if (resultObj3.status === "ok")
        {
            productosTodos = resultObj3.data;

            showRelatedProducts();
        }
    });
});