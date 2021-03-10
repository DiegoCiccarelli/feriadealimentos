
window.addEventListener("load", () => {
    let contenedorForm = document.querySelector(".contenedorForm")
   let inputsRegister = contenedorForm.querySelectorAll("input");
   let btnRegister = document.querySelector("#btnRegister")
   let numbersRegex = new RegExp("^[^0-9]+$")
   let passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})")
   let errorMessage = document.querySelector(".errorMessageForm")

   for(let input of inputsRegister){
    input.addEventListener("change", () => {
        if((errorMessage.querySelector("#errorSubmit"))){
            errorMessage.removeChild(errorMessage.querySelector("#errorSubmit"))
        }
        switch(input.id){
            case("apellido"):
                if(!(numbersRegex.test(input.value))){
                    input.style.border = "1px solid red"
                    if(!(errorMessage.querySelector("#errorApellido"))){
                        errorMessage.innerHTML += `<p id="errorApellido">No puede ingresar numeros en su apellido</p>`
                    }
                } else {
                    if(errorMessage.querySelector("#errorApellido")){
                        errorMessage.removeChild(errorMessage.querySelector("#errorApellido"))
                    }
                    input.style.border = "1px solid green"
                }
                break;
            case("nombre"):
                if(!(numbersRegex.test(input.value))){
                    input.style.border = "1px solid red"
                    if(!(errorMessage.querySelector("#errorNombre"))){
                        errorMessage.innerHTML += `<p id="errorNombre">No puede ingresar numeros en su nombre</p>`
                    }
                } else {
                    if(errorMessage.querySelector("#errorNombre")){
                        errorMessage.removeChild(errorMessage.querySelector("#errorNombre"))
                    }
                    input.style.border = "1px solid green"
                }
            break;
            case("emailRegister"):
                if(!(input.value.includes("@")) || !(input.value.includes("."))){
                    input.style.border = "1px solid red"
                    if(!(errorMessage.querySelector("#errorEmail"))){
                        errorMessage.innerHTML += `<p id="errorEmail">Debe ingresar un email valido</p>`
                    }
                } else {
                    if(errorMessage.querySelector("#errorEmail")){
                        errorMessage.removeChild(errorMessage.querySelector("#errorEmail"))
                    }
                    input.style.border = "1px solid green"
                }
                break;
            case("pwdRegister"):
                if(!(passwordRegex.test(input.value))){
                    input.style.border = "1px solid red"

                    if(!(errorMessage.querySelector("#errorPassword"))){
                        errorMessage.innerHTML += `<p id="errorPassword">Debe ingresar una contraseña con un minimo de 8 caracteres, una minuscula, una mayuscula</p>`
                    }
                } else {
                    if(errorMessage.querySelector("#errorPassword")){
                        errorMessage.removeChild(errorMessage.querySelector("#errorPassword"))
                    }
                    input.style.border = "1px solid green"
                }
                break;
            case("repeatPwdRegister"):
                if(input.value != document.querySelector("#pwdRegister").value){
                    input.style.border = "1px solid red"
                    if(!(errorMessage.querySelector("#errorRptPassword"))){
                        errorMessage.innerHTML += `<p id="errorRptPassword">Las contraseñas no coinciden</p>`
                    }
                } else {
                    if(errorMessage.querySelector("#errorRptPassword")){
                        errorMessage.removeChild(errorMessage.querySelector("#errorRptPassword"))
                    }
                    input.style.border = "1px solid green"
                }
                break;
            case("telefono"):
                if(input.value.length > 20 || input.value.length < 8){
                    input.style.border = "1px solid red"
                    if(!(errorMessage.querySelector("#errorTel"))){
                        errorMessage.innerHTML += `<p id="errorTel">Debe ingresar un telefono válido</p>`
                    }
                } else {
                    if(errorMessage.querySelector("#errorTel")){
                        errorMessage.removeChild(errorMessage.querySelector("#errorTel"))
                    }
                    input.style.border = "1px solid green"
                }
                break;
            case("dni"):
                if(input.value.length > 10 || input.value.length < 7){
                    input.style.border = "1px solid red"
                    if(!(errorMessage.querySelector("#errorDni"))){
                        errorMessage.innerHTML += `<p id="errorDni">Debe ingresar un dni válido</p>`
                    }
                    
                } else {
                    if(errorMessage.querySelector("#errorDni")){
                        errorMessage.removeChild(errorMessage.querySelector("#errorDni"))
                    }
                    input.style.border = "1px solid green"
                }
                break;
        }
    })
   }
   btnRegister.addEventListener("click", (e) => {
       let errorCount = 0;
       for(input of inputsRegister){
           if(!(input.style.borderColor == "green")){
            console.log(input.id)
            errorCount = 1;
           }
       }

       if(errorCount == 1){
        e.preventDefault()
            if(!(errorMessage.querySelector("#errorSubmit"))){
                errorMessage.innerHTML = `<p id="errorSubmit">Revise y rellene todos los campos</p>`
            }
        }
   })


}) 