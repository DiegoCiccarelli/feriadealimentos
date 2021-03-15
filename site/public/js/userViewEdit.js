window.addEventListener('load', function(){

    //document.body.style.backgroundColor="red";
    let submitButton = document.querySelector("#submitButton");
    let editButton = document.querySelector("#editButton");
    let emailInput = document.querySelector("#emailRegister");
    let IsError = document.querySelector(".errorMessageForm");
    let localidadInput = document.querySelector("#localidad")
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
    submitButton.style.display="none";  
    
    if (IsError != null){

      editButton.style.display="none";
      submitButton.style.display="block";

    }
   
    editButton.addEventListener('click', function(event){
        
        let inputs = document.querySelectorAll("input");
        
        inputs.forEach(element => {
         // element.style.backgroundColor="red";
            element.removeAttribute("disabled");
            barrioSelect.removeAttribute("disabled")
        });

        // pongo en disabled el email, porque nunca se puede cambiar
        emailInput.setAttribute("disabled", "disabled");
        localidadInput.setAttribute("disabled", "true");
        this.style.display="none";
        submitButton.style.display="block";
        

    })

    submitButton.addEventListener("click", () => {
      emailInput.removeAttribute("disabled");
      localidadInput.removeAttribute("disabled");
    })
    
    

})