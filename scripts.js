document.addEventListener('DOMContentLoaded', function() {
    const totalPriceElement = document.getElementById('totalPrice');
    const cartItemsElement = document.getElementById('cartItems');

    function updateCart() {
        cartItemsElement.innerHTML = '';
        let total = 0;

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const listItem = document.createElement('li');
            listItem.textContent = `${item.productName} - ${item.quantity} x RM${item.price.toFixed(2)} = RM${itemTotal.toFixed(2)}`;
            cartItemsElement.appendChild(listItem);
        });

        totalPriceElement.textContent = total.toFixed(2);
    }

    

    window.addToCart = function(productName, productPrice, quantityId) {
        const quantity = parseInt(document.getElementById(quantityId).value);
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
        const existingProductIndex = cart.findIndex(item => item.productName === productName);
        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += quantity;
        } else {
            cart.push({ productName, price: productPrice, quantity: quantity });
        }
    
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    };

    function resetCart() {
        localStorage.removeItem('cart');
        updateCart();
    }

    document.getElementById('resetCart').addEventListener('click', resetCart);

    // Initial display of the cart
    updateCart();
});
