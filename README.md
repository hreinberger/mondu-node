# Mondu Demo Integration

This repo aims to help you in setting up a demo app for Mondu BNPL. It's built with:

- NodeJS
- Express
- Pug as templating engine
- axios and fetch for async API communication
- Bootstrap 5

![Mondu Demo App](/.github/assets/mondu-node-1.jpeg "Mondu Demo App")

## How To Run

```bash
git clone git@github.com:hreinberger/mondu-node.git && cd mondu-node
cp .env.example .env
nano .env
# insert your API key in the .env
npm install
npm run dev
```

Running in dev mode opens up a [Localtunnel](https://localtunnel.github.io/www/) back to your local machine. You can get the link and your local IP from the nodeJS console. You can access the app either with the localtunnel link or via `localhost:3000`. The localtunnel feature is needed for redirecting you back from Mondu's hosted checkout to the app.

### Bring your own API Key

In order for the app to work, wou'll have to set your Mondu API key in the `.env` file. Don't have one yet? Reach out to your Mondu representative!

## Docker

The Repo is prepared to be run in a vscode dev container, Github Codespace or dockerized on any machine you like.
To run it in a more production-like environment, you can do this:

```bash
docker compose build && docker compose up -d
```

⚠️ The app is not checked for vulnerabilities, so be careful when you want to run it in a public environment (like the Internet!)

### Hostname

When setting an `APP_HOSTNAME` environment variable and running in prodcution mode (`npm run prod` or `docker compose up -d`), the app will use the set hostname for redirects.

## Payment Flows

The app has support for two types of UX flows.

### Hosted Checkout (Recommended)

Here, Mondu will save orders with successful hosted checkout interactions in the `authorized` state.
The order then needs to be confirmed by the merchant with an addidtional API request.

For this flow to work, the app opens a localtunnel to your machine. Upon redirection to the success page of the app, you'll need to enter your current public IP as an anti-abuse method. The app logs the public IP to console on every start.

```mermaid
sequenceDiagram
    Buyer ->> Merchant: Choose Mondu payment method
    Merchant ->>+ Mondu: Create Order
    Mondu -->>- Merchant: hosted checkout URL
    Merchant -->> Buyer: Redirect to Mondu hosted checkout
    Buyer ->>+ Mondu: Interact on Mondu Hosted Checkout
    Mondu -->>- Buyer: Confirm Order
    note over Merchant,Mondu: Order in authorized state
    Merchant ->> Mondu: Confirm Order
    Mondu -->> Merchant: Order confirmed

```

![Mondu Demo App](/.github/assets/mondu-node-3.jpeg "Mondu Demo App")

### Confirmation Flow (Mondu Widget)

In this flow, Mondu confirms or declines an order once the buyer's interaction with the widget is complete.

```mermaid
sequenceDiagram
    Buyer ->> Merchant: Confirm Order ("Buy Now")
    Merchant ->>+ Mondu: Create Order
    Mondu -->>- Merchant: Order Token
    Merchant -->> Buyer: Show Widget
    Buyer ->>+ Mondu: Enrich Widget Data
    Mondu -->>- Buyer: Show Widget Response
    Mondu -->> Merchant: Webhook order/confirmed
```

## Order Management

You can show recent orders by visiting the `/orders` page.

![Mondu Demo App](/.github/assets/mondu-node-2.jpeg "Mondu Demo App")

### Invoices and Shipments

Orders with the `confirmed` state can be invoiced and shipped. This app uploads a generic invoice PDF with every invoice generation request to the Mondu API.

See `routes/monduCreateInvoice.js` for more details on this request.

## Webhooks

You can show registered webhooks by visiting the `/webhooks` page.

You can register the webhooks for two topics at the moment:

- orders by clicking upon `Register Order Webhook`,

- invoices by clicking upon `Register Invoice Webhook`,

If there there other webhooks registerd for a given topic, please use `Remove` button to remove the endpoint and register the new one.

Remember that other applications might use the webhooks you want to remove.

## To Do

✅ - Demo Checkout working

✅ - Dockerize and setup for devcontainer/Github Codespace

✅ - Mondu Confirmation- and Authorization Flow

✅ - Mondu Hosted Checkout Flow

⬜ - Order management "backend"

✅ - Invoice Workflow

✅ - Webhooks

✅ - Order status change in order overview
