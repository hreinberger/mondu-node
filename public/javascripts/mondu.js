const checkoutForm = document.getElementById("checkout-form");
const confirmButton = document.getElementById("confirm-button");
const authorizeButton = document.getElementById("authorize-button");

// function for creating an order with Mondu using the form data
// and returning the token and Mondu uuid needed for the widget
const fetchSessionToken = async (apiEndpoint) => {
  const formData = new FormData(checkoutForm);
  const response = await fetch(apiEndpoint, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return {
    token: data.order.token,
    uuid: data.order.uuid,
  };
};

const renderMonduWidget = (checkoutToken, uuid, onSuccessCallback) => {
  const checkoutOptions = {
    token: checkoutToken,
    // callbacks from the Mondu widget
    onClose: () => {},
    onCancel: () => {},
    onSuccess: onSuccessCallback,
    onError: (err) => {
      console.log(err);
    },
  };
  window.monduCheckout.render(checkoutOptions);
};

// handle direct confirmation flow
// in this flow, the buyers' last touchpoint in the checkout is with
// the mondu widget
confirmButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const { token } = await fetchSessionToken("/mondu-confirm");
  renderMonduWidget(token, null, () => {
    console.log("Mondu Success!");
    setTimeout(() => {
      window.location.href = "/success";
    }, 2000);
  });
});

// handle authorization flow
// in this flow, buyers will have to explicitly confirm a Mondu order
authorizeButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const { token, uuid } = await fetchSessionToken("/mondu-auth");
  renderMonduWidget(token, uuid, () => {
    console.log("Mondu Success!");
    setTimeout(() => {
      window.location.href = "/order/" + uuid;
    }, 2000);
  });
});
