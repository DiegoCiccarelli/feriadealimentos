
window.addEventListener('load', function(){

    let botonResta = document.querySelector('#botonRestar');
    let botonSuma = document.querySelector('#botonSumar');
    let inputCantidad = document.querySelector('#inputCantidad');
    let botonAgregarAlCarrito = document.querySelector('#btnAgregarCarrito');
    let pPrecioTotal = document.querySelector('#precioTotal');
    let spanNumeroPrecio = document.querySelector('#numeroPrecio');
    let inputProductId = document.querySelector('#product_id');

    let precioUnitario = parseInt(spanNumeroPrecio.innerText);
    //console.log(precioUnitario);

    botonResta.addEventListener('click', function(){
        let cantidad = parseInt(inputCantidad.value);
        if(cantidad >1) {
            cantidad--;
            pPrecioTotal.innerHTML = "Total $" + (cantidad * precioUnitario); 
            inputCantidad.value = cantidad;
            
        };

                //console.log('hola');
    });

    botonSuma.addEventListener('click', function(){
        let cantidad = parseInt(inputCantidad.value);
        if(cantidad <99) {
            
            cantidad++;
            pPrecioTotal.innerHTML = "Total $" + (cantidad * precioUnitario); 
            inputCantidad.value = cantidad;
            
        };

           
    });

    botonAgregarAlCarrito.addEventListener('click', function(e){
        let cantidad = parseInt(inputCantidad.value);
        if((cantidad<1)||(cantidad>99)){
            alert("La cantidad no puede ser menor a 1 o mayor a 99");
        }else{
            let data = {product_id: parseInt(inputProductId.value), product_quantity: cantidad};
            fetch("http://localhost:3500/productos/agregarcarrito/",{
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                'Content-Type': 'application/json'}
            })
            .then(function(response){
                return response.json();
            })
            .then(function(info){
                return console.log(info);
            })
            .catch(function(e){
                 console.log(e);
            })
        }
    });
       
    inputCantidad.addEventListener('keyup', function(){
        let cantidad = parseInt(inputCantidad.value);
        if((cantidad>=1)&&(cantidad<=99)){
       
        pPrecioTotal.innerHTML = "Total $" + (cantidad * precioUnitario); 
        }else{
            alert("La cantidad no puede ser menor a 1 o mayor a 99");

            inputCantidad.value ="1";
            cantidad=1;
            pPrecioTotal.innerHTML = "Total $" + (cantidad * precioUnitario);
            
        };
    })

})