
window.addEventListener('load', function(){
    
    //productList será el listado (array) de productos para usar en el buscador
    let ProductsArray;
    let inputSearchProduct = document.querySelector("#inputBusqueda");
    let listadoBusqueda = document.querySelector("#resultadoBusqueda");
    

    
    //traigo de la api el listado de productos
    fetch("http://localhost:3500/api/products")
        .then(function(response){
            return response.json();
    })
        .then(function(dataDecode){
        
            //lo asigno a productList
            productArray = dataDecode;

    }).catch(function(error){
            console.log(error);
    })


    inputSearchProduct.addEventListener('keyup', function(){
        
        let filterText = (inputSearchProduct.value).toUpperCase();
        //console.log(filterText);
        let largo = filterText.length;
        //console.log(largo);

        //limpio div de resultado
        listadoBusqueda.innerHTML="";

        //si el texto ingresado es mayor a cero caracter
        if(largo>0){

            //recorrro el array
            productArray.forEach(function (product) {
            
           
                
                let nombreProducto = (product.nombre_producto).toUpperCase();
                

                if(filterText == nombreProducto.slice(0,largo)){
                    
                    listadoBusqueda.innerHTML += '<a target="_self" href="productos/detalleProducto/' + product.id + '">' + product.nombre_producto + '</a><br>';
                };
            
            });
        }

        // productList.forEach(product => {

        //     console.log(product.nombre_producto);


            
        // });    

    });

})