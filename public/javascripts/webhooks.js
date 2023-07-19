


function registerWebhook(type) {
    // Perform the action to register the webhook using AJAX or JavaScript logic
    // For example:
    fetch('/register-webhook/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type: type })
        // Add any required headers or parameters
    })
        .then(response => {
            // Handle the response as needed
            // You can update the UI or display a success message
            console.log(response);
            if (response.ok) {
                window.location.reload(); // Refresh the page
            } else {
                console.log('Webhook registration failed.');
            }
        })
        .catch(error => {
            // Handle any errors that occur during the request
            console.log(error);
        });
}

function deleteWebhook(uuid) {
    // Perform the action to register the webhook using AJAX or JavaScript logic
    // For example:
    //uuid="315049fe-6d42-4afc-8f56-f8394fba2a07";
    console.log("uuid:" + uuid);
    fetch('/delete-webhook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uuid: uuid })
    })
        .then(response => {
            // Handle the response as needed
            // You can update the UI or display a success message
            console.log(response);
            if (response.ok) {
                window.location.reload(); // Refresh the page
            } else {
                console.log('Webhook registration failed.');
            }
        })
        .catch(error => {
            // Handle any errors that occur during the request
            console.log(error);
        });
}

