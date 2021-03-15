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
let barrioSelect = document.querySelector("#barrio")
let barrioOption = barrioSelect.querySelector("option")


fetch("https://gobiernoabierto.cordoba.gob.ar/api/v2/barrios/barrios/?page=1&page=2&page=3&page=4&page=5&page=6&page=7&page=8&page=9&page=10&es_oficial=true")
    .then(res => res.json())
    .then(res => {
        console.log(res.results.features[0].properties)
        for(let barrio of res.results.features){
            if(barrioOption){
              if(barrioOption.value != barrio.properties.nombre){
              let option =  document.createElement("option")
              option.value = barrio.properties.nombre
              option.innerHTML = barrio.properties.nombre
              barrioSelect.appendChild(option)
              }
            } else{
              let option =  document.createElement("option")
              option.value = barrio.properties.nombre
              option.innerHTML = barrio.properties.nombre
              barrioSelect.appendChild(option)
            }
        }
    })

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
                if(input.id != "localidad"){
                input.removeAttribute("disabled")
                }
                barrioSelect.removeAttribute("disabled")
            }
            btnEditar.innerHTML = "GUARDAR"
        } else {
            for(let input of inputsDomicilio){
                input.setAttribute("disabled", "true")
                barrioSelect.setAttribute("disabled", "true")
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
                    modal.style.display = "block";
                    
                    //window.location.replace("http://localhost:3500/")
                })
                .catch(function(e){
                    return console.log("el error es" + e);
                })
        }
        
    })

      
let modal = document.getElementById("Modal");
let span = document.getElementsByClassName("close")[0];




span.onclick = function() {
  modal.style.display = "none";
  window.location.replace("http://localhost:3500/")
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    window.location.replace("http://localhost:3500/")
  }
}
})
