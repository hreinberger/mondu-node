// Get the form and the checkout button
const checkoutForm = document.getElementById('checkout-form');
const checkoutButton = document.getElementById('checkout-button');

// Add a click event listener to the checkout button
checkoutButton.addEventListener('click', async (event) => {
  event.preventDefault();

  // Send the form data to the internal API and get the session token
  const formData = new FormData(checkoutForm);
  const response = await fetch('/formhandler', {
    method: 'POST',
    body: formData
  });
  const data = await response.json();
  const token = data.order.token;

  // Append the token to mondu widget

  const checkoutToken = token; 
  const checkoutOptions = {
    token: checkoutToken,
    onClose: () => {},
    onCancel: () => {},
    onSuccess: () => {
        // redirect to success page
        console.log('Mondu Success!')
        setTimeout( () => {window.location.href = '/success';}, "2000");
    },
    onError: (err) => {
        console.log(err)
    }
  };

  window.monduCheckout.render(checkoutOptions);

});