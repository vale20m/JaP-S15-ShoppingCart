const URL = "https://dummyjson.com/products";

const products = document.querySelector("#products");
const title = document.querySelector("#title");
const cart = document.querySelector("#cart");
const subtotal = document.querySelector("#subtotal");

let selectedProducts = [];

function showProducts(array){
    title.innerHTML = `<div class="col-6 mx-auto"><h1 class="text-center my-3">Productos:</h1></div>`

    for (const product of array) {
        let div = document.createElement("div");
        div.classList.add("col-md-4", "col-sm-6", "col-12", "my-3");
        div.innerHTML = 
        `<div class="card h-100">
            <img src="${product.images[0]}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">$${product.price}</p>
                <p class="card-text">${product.description}</p>
                <p class="card-text" id="productStock">Stock: ${product.stock}</p>
            </div>
        </div>`

        div.addEventListener("click", function(){

            const stock = div.querySelector("#productStock");

            if (checkArray(productsArray, product.id, stock)){
                selectedProducts.push(product);
                cart.insertAdjacentHTML("afterbegin", `<li class="list-group-item border border-0"> ➜ ${product.title}</li>`);
                calculateSubtotal(selectedProducts);
            }

        });

        products.appendChild(div);
    }

    title.innerHTML += `<div class="col-6 mx-auto"><h1 class="text-center mt-3 mb-4">Carrito:</h1></div>`

}

let productsArray = [];

async function getProducts(url){
    try {
        let response = await fetch(url);
        let responseContents = await response.json();
        
        for (const product of responseContents.products) {
            productsArray.push(product);
        }

        showProducts(productsArray);
    } catch (error) {
        console.log(error.message);
    }
}

function calculateSubtotal(array){
    let cartValue = 0;
    for (let i = 0; i < array.length; i++){
        cartValue += array[i].price;
    }
    subtotal.innerHTML = "Subtotal: $" + cartValue;
}

function checkArray(array, id, stock){
    for (let i = 0; i < array.length; i++){
        if (array[i].id == id && array[i].stock > 0){
            array[i].stock--;
            stock.innerHTML = "Stock: " + array[i].stock;
            return true;
        }
    }
    return false;
}

getProducts(URL);