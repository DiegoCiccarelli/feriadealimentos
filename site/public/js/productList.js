
window.addEventListener("load", () => {
    let botonFiltrar = document.querySelector("#filter")
    let categories = document.querySelectorAll("#categories")
    let productsQuantity = document.querySelector("#productQuantity")
    let minPrice = document.querySelector("#minprice")
    let maxPrice = document.querySelector("#maxprice")
    let products = document.querySelectorAll(".productoListado")
    

    botonFiltrar.addEventListener("click", () => {
        let checkedCategories = []
        for(let category of categories){
            if(category.checked){
            checkedCategories.push(category.value)
            }
        }

        for(let product of products){
            let productCategory = product.querySelector("#product_category")
            let productPrice = product.querySelector("#product_price")
            for(let i = 0; i < checkedCategories.length; i++){
                for (let j = 0; j < array.length; j++) {
                    const element = array[j];
                    
                }
                if(productCategory.value == checkedCategories[i]){
                    product.style.display = "none"
                } else {
                    product.style.display = "block"
                }
            }
        }
    })
})