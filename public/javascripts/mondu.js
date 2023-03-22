const checkoutForm = document.getElementById("checkout-form");

// "Pay Now" button
const confirmButton = document.getElementById("confirm-button");

// "Continue Checkout" Button
// this triggers the authorization flow
const authorizeButton = document.getElementById("authorize-button");

// get Mondu session token from internal API endpoint --> see monduCreateOrder.js
const fetchSessionToken = async (apiEndpoint, formData) => {
  const response = await fetch(apiEndpoint, { method: "POST", body: formData });
  const data = await response.json();
  return { token: data.order.token, uuid: data.order.uuid };
};

const renderMonduWidget = (checkoutToken, uuid, onSuccessCallback) => {
  window.monduCheckout.render({
    token: checkoutToken,
    onClose: () => {},
    onCancel: () => {},
    onSuccess: onSuccessCallback,
    onError: (err) => console.log(err),
  });
};

const handleButtonClick = async (event, authorize) => {
  event.preventDefault();
  const formData = new FormData(checkoutForm);
  formData.append("authorize", authorize);
  const { token, uuid } = await fetchSessionToken(
    "/mondu-create-order",
    formData
  );

  renderMonduWidget(token, uuid, () => {
    console.log("Mondu Success!");
    setTimeout(() => {
      // on authorization flow, redirect to order summary screen, otherwise show success page
      window.location.href = authorize ? "/order/" + uuid : "/success";
    }, 2000);
  });
};

// handle button clicks. The "authorize" button triggers the Mondu authorization flow
confirmButton.addEventListener("click", (event) =>
  handleButtonClick(event, false)
);
authorizeButton.addEventListener("click", (event) =>
  handleButtonClick(event, true)
);
