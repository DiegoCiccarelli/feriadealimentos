window.addEventListener('load', function(){
    
    let divListadoCategoria = document.querySelector('#listadoCategorias');
    let categoriesArray;
    let aItemCategoria;
    let productArray;
    let divProductoListado = document.querySelector('.listadoProductos');

    //traigo categorias
    fetch("http://localhost:3500/api/categories")
    .then(function(response){
        return response.json();
    })
    .then(function(dataDecode){
    
        
        categoriesArray = dataDecode;
        
        categoriesArray.forEach(element => {
    
            if(element.estado_categoria=="1"){

                divListadoCategoria.innerHTML+= '<li><a id="' + element.nombre_categoria + '" class="itemCategoria">' + element.nombre_categoria + '</a></li>';
            };
        });        
        
        aItemCategoria = document.querySelectorAll(".itemCategoria");
        
        aItemCategoria.forEach(element => {

            element.addEventListener('click', function(){
                filtrarPorCategoria(element.id, productArray);
            })
            
        });
        
    }).catch(function(error){
        console.log(error);
    })


   
    function filtrarPorCategoria(categoria, array){
       
        divProductoListado.innerHTML="";

       array.forEach(element => {
       
        for(let category of element.categories){
            if(categoria==category.nombre_categoria){
                //console.log(element.nombre_producto);
               
                divProductoListado.innerHTML+='<div class="productoListado">\
                <img src="../images/productsImages/' + element.imagen + '" alt="imagen">\
                <p class="productoNombre">' + element.nombre_producto + '</p>\
                <p class="productoPrecio">$' + element.precio + '</p>\
                <button class="claseButton"><a href="/productos/detalleProducto/' + element.id + '">Ver detalle</a></button>\
                </div>'
    

            }
        }

       
        
       });
       


    };


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

})




