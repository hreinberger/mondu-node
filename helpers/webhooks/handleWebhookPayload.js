let webhookpayload = {};

webhookpayload['order'] = [];
webhookpayload['invoice'] = [];
webhookpayload['payout'] = [];

const handleWebhookPayload = {

    //Save webhook payload in the local variable
    storeWebhooksPayload(payload) {

        if (payload.topic.includes('order')) {
            webhookpayload['order'].push(payload);

        } else if (payload.topic.includes('invoice')) {

            webhookpayload['invoice'].push(payload);
        } else if (payload.topic.includes('payout')) {

            webhookpayload['payout'].push(payload);
        }

        return webhookpayload;
    },

    //Return all saved webhook payloads
    getWebhooksPayload() {
        
        return webhookpayload;
    },

    //Return all saved webhook payloads for specific order
    getOrderWebhooksPayload(uuid) {
        console.log(uuid);
        console.log(webhookpayload['order']);
        return webhookpayload['order'].filter((item) => item.order_uuid === uuid);
    }
    
}

module.exports = handleWebhookPayload;