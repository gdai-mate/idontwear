// idontwear JavaScript - brutalist e-commerce functionality
// Written in 2001 style - basic but functional

// Cart array to store items
var cart = [];

// Initialize cart from localStorage when page loads
function initCart() {
    var savedCart = localStorage.getItem('idontwear_cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (e) {
            // If localStorage is corrupted, start fresh
            cart = [];
            localStorage.removeItem('idontwear_cart');
        }
    }
    updateCartCount();
    
    // If we're on the cart page, display cart items
    if (document.getElementById('cart-items')) {
        displayCartItems();
    }
}

// Add item to cart
function addToCart(id, name, price) {
    // Check if item already exists in cart
    var existingItem = null;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            existingItem = cart[i];
            break;
        }
    }
    
    if (existingItem) {
        existingItem.quantity += 1;
        alert('Added another "' + name + '" to your cart!\n\nQuantity: ' + existingItem.quantity);
    } else {
        var newItem = {
            id: id,
            name: name,
            price: price,
            quantity: 1
        };
        cart.push(newItem);
        alert('Added "' + name + '" to your cart!\n\nPrice: $' + price.toFixed(2));
    }
    
    // Save to localStorage
    localStorage.setItem('idontwear_cart', JSON.stringify(cart));
    
    // Update cart count display
    updateCartCount();
    
    // If we're on the cart page, refresh the display
    if (document.getElementById('cart-items')) {
        displayCartItems();
    }
}

// Remove item from cart
function removeFromCart(id) {
    var itemName = '';
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            itemName = cart[i].name;
            cart.splice(i, 1);
            break;
        }
    }
    
    if (itemName) {
        alert('Removed "' + itemName + '" from your cart.');
    }
    
    // Save to localStorage
    localStorage.setItem('idontwear_cart', JSON.stringify(cart));
    
    // Update displays
    updateCartCount();
    if (document.getElementById('cart-items')) {
        displayCartItems();
    }
}

// Update quantity of item in cart
function updateQuantity(id, newQuantity) {
    newQuantity = parseInt(newQuantity);
    
    if (newQuantity <= 0) {
        removeFromCart(id);
        return;
    }
    
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].quantity = newQuantity;
            break;
        }
    }
    
    // Save to localStorage
    localStorage.setItem('idontwear_cart', JSON.stringify(cart));
    
    // Update displays
    updateCartCount();
    if (document.getElementById('cart-items')) {
        displayCartItems();
    }
}

// Update cart count in navigation
function updateCartCount() {
    var totalItems = 0;
    for (var i = 0; i < cart.length; i++) {
        totalItems += cart[i].quantity;
    }
    
    var cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerHTML = '(' + totalItems + ')';
        
        // Change color if items in cart
        if (totalItems > 0) {
            cartCountElement.style.backgroundColor = '#5a4f42';
            cartCountElement.style.color = '#f8f7f5';
            cartCountElement.style.padding = '1px 4px';
        } else {
            cartCountElement.style.backgroundColor = '';
            cartCountElement.style.color = '#7a6f61';
            cartCountElement.style.padding = '';
        }
    }
}

// Display cart items on cart page
function displayCartItems() {
    var cartItemsDiv = document.getElementById('cart-items');
    var emptyCartDiv = document.getElementById('empty-cart');
    var checkoutSection = document.getElementById('checkout-section');
    
    if (!cartItemsDiv) return;
    
    if (cart.length === 0) {
        cartItemsDiv.style.display = 'none';
        emptyCartDiv.style.display = 'block';
        checkoutSection.style.display = 'none';
        return;
    }
    
    // Hide empty cart message, show cart items and checkout
    emptyCartDiv.style.display = 'none';
    cartItemsDiv.style.display = 'block';
    checkoutSection.style.display = 'block';
    
    var cartHTML = '<table width="90%" cellpadding="10" cellspacing="0" border="2" bordercolor="#5d4e37" bgcolor="#a39691">';
    cartHTML += '<tr bgcolor="#736b5e">';
    cartHTML += '<td><font face="Courier New, monospace" size="2" color="#8b8680"><b>ITEM</b></font></td>';
    cartHTML += '<td align="center"><font face="Courier New, monospace" size="2" color="#8b8680"><b>PRICE</b></font></td>';
    cartHTML += '<td align="center"><font face="Courier New, monospace" size="2" color="#8b8680"><b>QTY</b></font></td>';
    cartHTML += '<td align="center"><font face="Courier New, monospace" size="2" color="#8b8680"><b>TOTAL</b></font></td>';
    cartHTML += '<td align="center"><font face="Courier New, monospace" size="2" color="#8b8680"><b>ACTION</b></font></td>';
    cartHTML += '</tr>';
    
    var subtotal = 0;
    
    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        cartHTML += '<tr>';
        cartHTML += '<td><font face="Georgia, serif" size="2" color="#4a3c28"><b>' + item.name + '</b></font></td>';
        cartHTML += '<td align="center"><font face="Courier New, monospace" size="2" color="#5d4e37">$' + item.price.toFixed(2) + '</font></td>';
        cartHTML += '<td align="center">';
        cartHTML += '<input type="text" value="' + item.quantity + '" size="3" onchange="updateQuantity(\'' + item.id + '\', this.value)" style="text-align: center;">';
        cartHTML += '</td>';
        cartHTML += '<td align="center"><font face="Courier New, monospace" size="2" color="#4a3c28"><b>$' + itemTotal.toFixed(2) + '</b></font></td>';
        cartHTML += '<td align="center">';
        cartHTML += '<button class="btn" onclick="removeFromCart(\'' + item.id + '\')" style="font-size: 10px;">REMOVE</button>';
        cartHTML += '</td>';
        cartHTML += '</tr>';
    }
    
    // Add totals row
    var shipping = 15.00;
    var total = subtotal + shipping;
    
    cartHTML += '<tr bgcolor="#5d4e37">';
    cartHTML += '<td colspan="3" align="right"><font face="Georgia, serif" size="2" color="#a39691"><b>SUBTOTAL:</b></font></td>';
    cartHTML += '<td align="center"><font face="Courier New, monospace" size="2" color="#8b8680"><b>$' + subtotal.toFixed(2) + '</b></font></td>';
    cartHTML += '<td></td>';
    cartHTML += '</tr>';
    
    cartHTML += '<tr bgcolor="#5d4e37">';
    cartHTML += '<td colspan="3" align="right"><font face="Georgia, serif" size="2" color="#a39691"><b>SHIPPING:</b></font></td>';
    cartHTML += '<td align="center"><font face="Courier New, monospace" size="2" color="#8b8680"><b>$' + shipping.toFixed(2) + '</b></font></td>';
    cartHTML += '<td></td>';
    cartHTML += '</tr>';
    
    cartHTML += '<tr bgcolor="#4a3c28">';
    cartHTML += '<td colspan="3" align="right"><font face="Times New Roman, serif" size="3" color="#8b8680"><b>TOTAL:</b></font></td>';
    cartHTML += '<td align="center"><font face="Times New Roman, serif" size="3" color="#8b8680"><b>$' + total.toFixed(2) + '</b></font></td>';
    cartHTML += '<td></td>';
    cartHTML += '</tr>';
    
    cartHTML += '</table>';
    
    cartItemsDiv.innerHTML = cartHTML;
}

// Clear entire cart
function clearCart() {
    if (cart.length === 0) {
        alert('Your cart is already empty!');
        return;
    }
    
    var confirmed = confirm('Are you sure you want to clear your entire cart?\n\nThis action cannot be undone.');
    if (confirmed) {
        cart = [];
        localStorage.removeItem('idontwear_cart');
        updateCartCount();
        
        if (document.getElementById('cart-items')) {
            displayCartItems();
        }
        
        alert('Your cart has been cleared.');
    }
}

// Contact form submission (fake)
function submitForm() {
    var name = document.forms.contactForm.name.value;
    var email = document.forms.contactForm.email.value;
    var subject = document.forms.contactForm.subject.value;
    var message = document.forms.contactForm.message.value;
    
    // Basic validation
    if (name === '' || email === '' || message === '') {
        alert('ERROR: Please fill in all required fields!\n\nRequired fields are marked with *');
        return false;
    }
    
    if (email.indexOf('@') === -1) {
        alert('ERROR: Please enter a valid email address!');
        return false;
    }
    
    if (message.length > 500) {
        alert('ERROR: Message is too long!\n\nPlease keep your message under 500 characters.\nCurrent length: ' + message.length);
        return false;
    }
    
    // Fake submission
    alert('MESSAGE SENT!\n\nThanks for contacting idontwear.\n\nJust kidding - this is a demo site.\nNo message was actually sent.\n\nBut thanks for trying!');
    
    // Clear form
    document.forms.contactForm.reset();
    
    return false; // Prevent actual form submission
}

// Checkout processing (fake)
function processCheckout() {
    if (cart.length === 0) {
        alert('ERROR: Your cart is empty!\n\nAdd some items before checking out.');
        return false;
    }
    
    var name = document.forms.checkoutForm.name.value;
    var address = document.forms.checkoutForm.address.value;
    var city = document.forms.checkoutForm.city.value;
    var state = document.forms.checkoutForm.state.value;
    var zip = document.forms.checkoutForm.zip.value;
    
    // Basic validation
    if (name === '' || address === '' || city === '' || state === '' || zip === '') {
        alert('ERROR: Please fill in all shipping information!');
        return false;
    }
    
    if (zip.length !== 5 || isNaN(zip)) {
        alert('ERROR: Please enter a valid 5-digit ZIP code!');
        return false;
    }
    
    // Calculate total
    var subtotal = 0;
    for (var i = 0; i < cart.length; i++) {
        subtotal += cart[i].price * cart[i].quantity;
    }
    var total = subtotal + 15.00;
    
    // Fake processing
    var confirmMessage = 'ORDER SUMMARY:\n\n';
    confirmMessage += 'Items: ' + cart.length + '\n';
    confirmMessage += 'Subtotal: $' + subtotal.toFixed(2) + '\n';
    confirmMessage += 'Shipping: $15.00\n';
    confirmMessage += 'TOTAL: $' + total.toFixed(2) + '\n\n';
    confirmMessage += 'Ship to: ' + name + '\n';
    confirmMessage += address + '\n';
    confirmMessage += city + ', ' + state + ' ' + zip + '\n\n';
    confirmMessage += 'IMPORTANT: This is a demo checkout.\n';
    confirmMessage += 'No order will be processed and no payment will be charged.\n\n';
    confirmMessage += 'Click OK to simulate order completion.';
    
    var confirmed = confirm(confirmMessage);
    
    if (confirmed) {
        alert('ORDER PLACED!\n\nOrder #IDW' + Math.floor(Math.random() * 10000) + '\n\nYour order has been received!\n(Just kidding - this is a demo)\n\nThanks for trying out our site!');
        
        // Clear cart after "successful" checkout
        cart = [];
        localStorage.removeItem('idontwear_cart');
        updateCartCount();
        
        // Redirect to home page
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 2000);
    }
    
    return false; // Prevent actual form submission
}

// Initialize cart when page loads
if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', initCart);
} else if (document.attachEvent) {
    // IE8 and below
    document.attachEvent('onreadystatechange', function() {
        if (document.readyState === 'complete') {
            initCart();
        }
    });
} else {
    // Fallback
    window.onload = initCart;
}

// Add some fun early 2000s easter eggs
function showVisitorCount() {
    var count = Math.floor(Math.random() * 5000) + 1000;
    alert('You are visitor #' + count + ' to idontwear!\n\nWelcome to our underground site.');
}

// Random "system error" messages for authenticity
function randomError() {
    var errors = [
        'ERROR 404: Coolness not found',
        'SYSTEM ERROR: Too much style detected',
        'WARNING: Site may cause excessive underground credibility',
        'NOTICE: This site was made in 2001 and it shows'
    ];
    var randomIndex = Math.floor(Math.random() * errors.length);
    return errors[randomIndex];
}

// Console log for developers who view source
if (console && console.log) {
    console.log('idontwear underground website - est. 2001');
    console.log('Built with: HTML tables, inline styles, and determination');
    console.log('Framework: None (too mainstream)');
    console.log('This site is intentionally brutalist and lo-fi');
}