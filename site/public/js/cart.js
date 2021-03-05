window.addEventListener('load', function(){

    let totalCarrito= document.querySelector("#totalCarrito");
    let botonFinalizarCompra = document.querySelector("#botonFinalizarCompra")
    let botonContinuarCompra = document.querySelector("#botonContinuarCompra")

    function calcularCarrito(pSubtotales){
        let sumaCarrito = 0;

        pSubtotales.forEach(element => {
            sumaCarrito = sumaCarrito + (parseInt(element.innerText))
            //console.log(sumaCarrito);
        });

        return sumaCarrito;
    };

    
    function calcularSubtotales(inputsCantidad, pPrecios, pSubtotales){
       
        for(let i=0; i<inputsCantidad.length; i++){
        
           pSubtotales[i].innerHTML = parseInt(inputsCantidad[i].value) * parseInt(pPrecios[i].innerText);
       };
        
        return;
    }
    
    function actualizarCarrito(){
        let inputIdProducto = document.querySelectorAll("#product_id");
        let pSubtotales = document.querySelectorAll(".pSubtotal");
        let botonesResta = document.querySelectorAll(".botonResta");
        let botonesSuma = document.querySelectorAll(".botonSuma");
        let inputsCantidad = document.querySelectorAll(".inputCantidad");
        let pPrecios = document.querySelectorAll(".pPrecio");
        let botonesQuitarProducto = document.querySelectorAll(".botonQuitarProducto");

        botonFinalizarCompra.addEventListener("click", () => {
            let product_id = Array.from(inputIdProducto).map(element => element.value)
            let product_quantity = Array.from(inputsCantidad).map(element => element.value)
            fetch("http://localhost:3500/productos/resumen",{
                method: "POST",
                body: JSON.stringify({product_id : product_id, product_quantity : product_quantity}),
                headers: {
                'Content-Type': 'application/json'
                }
                })
                .then(function(response){
                    return response.json();
                })
                .then(function(info){
                    window.location.href = "http://localhost:3500/productos/resumen";

                })
                .catch(function(e){
                    return console.log("el error es" + e);
                })
        })
        botonContinuarCompra.addEventListener("click", () => {
            let product_id = Array.from(inputIdProducto).map(element => element.value)
            let product_quantity = Array.from(inputsCantidad).map(element => element.value)
            fetch("http://localhost:3500/productos/continuarcompra",{
                method: "POST",
                body: JSON.stringify({product_id : product_id, product_quantity : product_quantity}),
                headers: {
                'Content-Type': 'application/json'
                }
                })
                .then(function(response){
                    return response.json();
                })
                .then(function(info){
                    window.location = "http://localhost:3500/productos/listadoproductos"
                })
                .catch(function(e){
                    return console.log("el error es" + e);
                })
        })

        totalCarrito.innerHTML = "<h2> Total Carrito $ " + calcularCarrito(pSubtotales) + "<h2>";

        botonesResta.forEach(element => {
    
            element.addEventListener('click', function(){
                
                let cantidad = parseInt(this.nextElementSibling.value);
                if(cantidad>1){
                    this.nextElementSibling.value = cantidad - 1;
                }else{
                    alert("La cantidad no puede ser menor a 1");
                };
                
                calcularSubtotales(inputsCantidad, pPrecios, pSubtotales);
                totalCarrito.innerHTML = "<h2> Total Carrito $ " + calcularCarrito(pSubtotales) + "<h2>";
            
            });
        
            

        });

        botonesSuma.forEach(element => {
    
            element.addEventListener('click', function(){
                
                let cantidad = parseInt(this.previousElementSibling.value);
                
                if(cantidad<99){
                    this.previousElementSibling.value = cantidad + 1;
                }else{
                    alert("La cantidad no puede ser mayor a 99");
                };
                calcularSubtotales(inputsCantidad, pPrecios, pSubtotales);
                totalCarrito.innerHTML = "<h2> Total Carrito $ " + calcularCarrito(pSubtotales) + "<h2>";

            });
        
            

        });

        inputsCantidad.forEach(element => {

            element.addEventListener('keyup', function(){

                let cantidad = parseInt(this.value);

                if((cantidad>=1)&&(cantidad<=99)){
                
                    calcularSubtotales(inputsCantidad, pPrecios, pSubtotales);
                    totalCarrito.innerHTML = "<h2> Total Carrito $ " + calcularCarrito(pSubtotales) + "<h2>";
                
                }else{
                    alert("La cantidad no puede ser menor a 1 o mayor a 99")
                    this.value=1
                    calcularSubtotales(inputsCantidad, pPrecios, pSubtotales);
                    totalCarrito.innerHTML = "<h2> Total Carrito $ " + calcularCarrito(pSubtotales) + "<h2>";
                }

            })
            
        });

        botonesQuitarProducto.forEach(element =>{

            element.addEventListener('click', function(){

                // obtener el id del producto a eliminar
                let product_id = Number(inputIdProducto.value);
                let data = {product_id};
                
                // hacer un fectch para eliminar ese producto de ese carrito
            fetch("http://localhost:3500/productos/quitarProductoCarrito/",{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json'}
            })
            .then(function(response){
                console.log(response)
                return response.json();
                

            })
            .then(function(info){
                console.log ("la respuesta de la eliminacion es " + info)
                
                return;// console.log(info);
            })
            .catch(function(e){
                return console.log("el error es" + e);
            })
            })
        })
    }

    actualizarCarrito();
    
});