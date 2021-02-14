window.addEventListener('load', function(){

    //document.body.style.backgroundColor="red";
    let submitButton = document.querySelector("#submitButton");
    let editButton = document.querySelector("#editButton");
    let emailInput = document.querySelector("#emailRegister");
    // let inputContrasena = document.querySelector("#pwdRegister");
    // let inputRepitaContrasena = document.querySelector("#repeatPwdRegister");
  //  let pContrasena = document.querySelector("#pContrasena");
  //  let pRepitaContrasena = document.querySelector("#pRepitaContrasena");

    submitButton.style.display="none";
    // inputContrasena.style.display="none";
    // inputRepitaContrasena.style.display="none";

   
    editButton.addEventListener('click', function(event){
        
        let inputs = document.querySelectorAll("input");
        
        inputs.forEach(element => {
         // element.style.backgroundColor="red";
            element.removeAttribute("disabled");
            
        });

        // pongo en disabled el email, porque nunca se puede cambiar
        emailInput.setAttribute("disabled", "disabled");
        this.style.display="none";
        submitButton.style.display="block";
        

    })
    //  pContrasena.style.display="none";
  //  pRepitaContrasena.style.display="none";
    
    

})