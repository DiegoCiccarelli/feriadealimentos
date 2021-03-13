window.addEventListener('load',function(){

let menuMobile = document.querySelector('#menuMobile')

function toggleMenu() {
    if (menuMobile.style.visibility === "visible") {
          
          menuMobile.style.height = "35px";
          menuMobile.style.visibility = "hidden";
        

    } else {
          
          
          menuMobile.style.visibility = "visible";
          menuMobile.style.height = "170px";
          
    }
}

let hamburgerIcon = document.querySelector('#hamburguerIcon');

hamburgerIcon.addEventListener('click', function(){
 
  return  toggleMenu();
})

})
