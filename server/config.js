var paypal = Meteor.npmRequire('paypal-rest-sdk');
paypal.configure({
    mode: 'sandbox', //sandbox or live
    client_id: 'AXRcvQTfy3D8eM7-SeHbXozMAxluFKHEZkexTzdabggcCOJWxiSbobfpi7SosBp66wYDcjxQftLs0065',
    client_secret: 'EK2OUFpwgZ8xqf09o_EzJSjDsMAgtv0loDw9gGKjCvlEUyGIafIbEDFbaY0vXcSiT-JE5O9hAeVwkkMR'
});