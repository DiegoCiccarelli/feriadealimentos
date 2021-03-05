window.addEventListener("load", () => {

let contenedorDomicilio = document.querySelector(".contenedorDomicilio")
let contenedorNodos = document.querySelector(".contenedorNodos")
let contenedorEntrega = document.querySelector(".contenedorEntrega")
let inputsEntrega = contenedorEntrega.querySelectorAll("input")
let btnEditar = document.querySelector("#editarDomicilio")
let inputsDomicilio = contenedorDomicilio.querySelectorAll("input")
let btnFinalizar = document.querySelector("#finalizarcompra")
let inputObservaciones = document.querySelector("#observaciones")
let inputsNodo = contenedorNodos.querySelectorAll("input")
let errorEnvio = document.querySelector("#errorEnvio")
let errorEnvioNodo = document.querySelector("#errorEnvioNodo")
console.log(inputsNodo)
    for(let eleccion of inputsEntrega){
        eleccion.addEventListener("click", () => {
            if(eleccion.value == "si"){
                contenedorNodos.style.display = "none"
                contenedorDomicilio.style.display = "block"
            }else{
                contenedorNodos.style.display = "block"
                contenedorDomicilio.style.display = "none"
            }
        })
    }

    btnEditar.addEventListener("click", () => {
        if(btnEditar.innerHTML == "EDITAR"){
            for(let input of inputsDomicilio){
                input.removeAttribute("disabled")
            }
            btnEditar.innerHTML = "GUARDAR"
        } else {
            for(let input of inputsDomicilio){
                input.setAttribute("disabled", "true")
            }
            btnEditar.innerHTML = "EDITAR"
        }
    })

    btnFinalizar.addEventListener("click", () => {
        errorEnvio.style.display = "none"
        errorEnvioNodo.style.display = "none"
        let data = {observaciones : inputObservaciones.value}
        for(let eleccion of inputsEntrega){
            if(eleccion.value == "si" && eleccion.checked){
                let domicilio_entrega = "";
                data.forma_entrega = "delivery"
                for(let input of inputsDomicilio){
                    domicilio_entrega += `${input.value}, `
                }
                data.domicilio_entrega = domicilio_entrega;
                break;
            }else if(eleccion.value == "no" && eleccion.checked){
                let nodo_entrega;
                data.forma_entrega = "nodo"
                for(let nodo of inputsNodo){
                    if(nodo.checked){
                    console.log(nodo.value)
                    nodo_entrega = nodo.value
                    }
                }
                if(nodo_entrega == undefined){
                    errorEnvioNodo.style.display = "block"
                    break;
                }
                data.nodo_entrega = nodo_entrega;
                break;
            }
        }
        console.log(data.forma_entrega)
        if(typeof data.forma_entrega == "undefined"){
            errorEnvio.style.display = "block"
        }
        if((errorEnvio.style.display == "none" && errorEnvioNodo.style.display == "none")){
            fetch("http://localhost:3500/productos/finalizarcompra",{
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                'Content-Type': 'application/json'
                }
                })
                .then(function(response){
                    return response.json();
                })
                .then(function(info){
                    window.location.replace("http://localhost:3500/")
                })
                .catch(function(e){
                    return console.log("el error es" + e);
                })
        }
        
    })
})
