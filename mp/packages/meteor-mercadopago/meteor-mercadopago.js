var mpSettings = Meteor.settings && Meteor.settings.mercadopago;

var constants = {
    TOPIC_PRE_APPROVAL: 'preapproval',
    TOPIC_AUTHORIZED_PAYMENT: 'authorized_payment'
};

MercadoPago = {

    'getPaymentUrl': function(paymentInfo) {
        return getPaymentUrl(paymentInfo);
    },

    'getPaymentInfo': function(topic, id) {

        if (topic == constants.TOPIC_PRE_APPROVAL)
            return getPreapprovalStatus(topic, id);
        
        if (topic == constants.TOPIC_PRE_APPROVAL)
            return getAuthorizedStatus(topic, id);
    }

};


function getPaymentUrl(paymentInfo) {

    var syncCreatePayment = Async.wrap(createMercadoPago(), 'createPreapprovalPayment');

    var response = {};
    try {
        var onDone = syncCreatePayment(paymentInfo);
        response.url = mpSettings.isSandbox ? onDone.response.sandbox_init_point : onDone.response.init_point;

    } catch (e) {
        console.log('Error on MercadoPago.getPaymentUrl: ' + e);
        response.error = e;
    }

    return response;
}

function getPreapprovalStatus(topic, id) {

    if (topic != constants.TOPIC_PRE_APPROVAL)
        throw new Error('Error on MercadoPago.getPreapprovalStatus: Expected topic of value ' + constants.TOPIC_PRE_APPROVAL + ' but got ' + topic);


    var syncGetApprovalStatus = Async.wrap(createMercadoPago(), 'getPreapprovalPayment');

    var response = {};
    try {
        var remoteInfo = syncGetApprovalStatus(id);
        response.raw = remoteInfo.response;

        response.paymentTopic = constants.TOPIC_PRE_APPROVAL;
        response.subscriptionId = remoteInfo.response.id;
        response.paymentStatus = remoteInfo.response.status;
    } catch (e) {
        console.log('Error on MercadoPago.getPreapprovalStatus: ' + e);
        response.error = e;
    }

    return response;
}

function getAuthorizedStatus(topic, id) {

    if (topic != constants.TOPIC_AUTHORIZED_PAYMENT)
        throw new Error('Error on MercadoPago.getAuthorizedStatus: Expected topic of value ' + constants.TOPIC_AUTHORIZED_PAYMENT + ' but got ' + topic);


    var syncGetAuthorizedStatus = Async.wrap(createMercadoPago(), 'getAuthorizedPayment');

    var response = {};
    try {
        var remoteInfo = syncGetAuthorizedStatus(id);
        response.raw = remoteInfo.response;

        response.paymentTopic = constants.TOPIC_AUTHORIZED_PAYMENT;
        response.subscriptionId = remoteInfo.response.preapproval_id;
        response.paymentStatus = remoteInfo.response.payment.status;
    } catch (e) {
        console.log('Error on MercadoPago.getAuthorizedStatus: ' + e);
        response.error = e;
    }

    return response;
}

function createMercadoPago() {
    var MP = Npm.require('mercadopago');
    var mp = new MP(mpSettings.client_id, mpSettings.client_secret);
    mp.sandboxMode(mpSettings.isSandbox);

    return mp;
}

function initializeMercadoPago() {
    if (!mpSettings)
        throw new Error('mercadopago.client_id and mercadopago.client_secret not found on settings file. Be sure to start Meteor with --settings [filename.json]');
}
initializeMercadoPago();