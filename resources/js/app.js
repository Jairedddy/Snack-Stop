import axios from 'axios'
var addToCart = document.querySelectorAll('.add-to-cart')
var cartCounter = document.getElementById("cartCounter");


function updateCart(item){
     axios.post('/update-cart',item).then(function(res){
         cartCounter.innerText = "(" + res.data.totalQty + ")";
     })
}

addToCart.forEach((button) => {
    button.addEventListener('click', function(event){
        let item = JSON.parse(button.dataset.item)
        updateCart(item)
        console.log(item)
    })
})