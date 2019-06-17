if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    var removeCartItemButton = document.getElementsByClassName('btn-danger');
    for(var i = 0; i < removeCartItemButton.length; i++){
        var removeButton = removeCartItemButton[i];
        removeButton.addEventListener('click', removeItem)
    }

    var quantityInput = document.getElementsByClassName('cart-quantity-input');
    for(var i = 0; i < quantityInput.length; i++){
        var inputButton = quantityInput[i];
        inputButton.addEventListener('change', inputChange)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for(var i = 0; i < addToCartButtons.length; i++){
        var addButton = addToCartButtons[i];
        addButton.addEventListener('click', addToCartClicked)
    }
    var purchaseButtonClicked = document.getElementsByClassName('btn-purchase')[0];
    purchaseButtonClicked.addEventListener('click', purchaseCartItem)
}


function removeItem(event){
    var button = event.target;
    var cartRow = button.parentElement.parentElement.remove();
    updateCartTotal();
}

function inputChange(){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal();
}

function purchaseCartItem(){
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function addToCartClicked(){
    var cartItem = event.target;
    var shopItem = cartItem.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imgSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addToCartItem(title, price, imgSrc)
    updateCartTotal();
}

function addToCartItem (title, price, imgSrc){
    var cartRow = document.createElement('div');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for(var i = 0; i < cartItemNames.length; i++){
        var titleName = cartItemNames[i].innerText;
        if(titleName == title){
            alert(`${title} already in cart please select another item`)
            return
        }
    }
    var cartContent = `
        <div class="cart-row">
            <div class="cart-item cart-column">
                <img class="cart-item-image" src=${imgSrc} width="100" height="100">
                <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>
        </div> 
    `;
    cartRow.innerHTML = cartContent;
    cartItems.append(cartRow);
    var removeButton = cartRow.getElementsByClassName(' btn-danger')[0];
    var quantity = cartRow.getElementsByClassName('cart-quantity-input')[0];
    quantity.addEventListener('change', inputChange);
    removeButton.addEventListener('click', removeItem)
}
function updateCartTotal(){
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartRow = cartItems.getElementsByClassName('cart-row');
    var total = 0;
    for(var i = 0; i < cartRow.length; i++){
        var cartItemRow = cartRow[i];
        var priceElement = cartItemRow.getElementsByClassName('cart-price')[0].innerText;
        var quantityElement = cartItemRow.getElementsByClassName('cart-quantity-input')[0].value;
        var price = parseFloat(priceElement.replace('$', ''));
        var quantity = quantityElement;

        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    var totalPrice = document.getElementsByClassName('cart-total-price')[0];
    totalPrice.innerText = '$' + total
}

