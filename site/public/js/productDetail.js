window.addEventListener('load', function(){

    let botonResta = document.querySelector('#botonRestar');
    let botonSuma = document.querySelector('#botonSumar');
    let inputCantidad = document.querySelector('#inputCantidad');
    let botonAgregarAlCarrito = document.querySelector('#btnAgregarCarrito');
    let pPrecioTotal = document.querySelector('#precioTotal');
    let spanNumeroPrecio = document.querySelector('#numeroPrecio');

    let precioUnitario = parseInt(spanNumeroPrecio.innerText);
    console.log(precioUnitario);

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

                //console.log('hola');
    });

    botonAgregarAlCarrito.addEventListener('click', function(e){
       
        let cantidad = parseInt(inputCantidad.value);
      
        if((cantidad<1)||(cantidad>99)){
      
            e.preventDefault();
            alert("La cantidad no puede ser menor a 1 o mayor a 99");

        }else{
           // alert("producto se agregó al carrito");
        };

    })

    inputCantidad.addEventListener('keyup', function(){
        let cantidad = parseInt(inputCantidad.value);
        if((cantidad>=1)&&(cantidad<=99)){
       
        pPrecioTotal.innerHTML = "Total $" + (cantidad * precioUnitario); 
        }else{
            inputCantidad.value ="1";
            pPrecioTotal.innerHTML = "Total $ 600";
            alert("La cantidad no puede ser menor a 1 o mayor a 99");

        };
    })

})