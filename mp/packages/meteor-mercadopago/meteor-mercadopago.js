var mpSettings = Meteor.settings && Meteor.settings.mercadopago;

var constants = {
    TOPIC_PRE_APPROVAL: 'preapproval',
    TOPIC_AUTHORIZED_PAYMENT: 'authorized_payment'
};

MercadoPago = {

    'getPaymentUrl': function(paymentInfo, isSandbox) {
        return getPaymentUrl(paymentInfo, isSandbox);
    },

    'getPaymentInfo': function(topic, id) {

        if (topic == constants.TOPIC_PRE_APPROVAL) {
            return getPreapprovalStatus(topic, id);
        } else if (topic == constants.TOPIC_PRE_APPROVAL) {
            return getAuthorizedStatus(topic, id);
        }
    }

};


function getPaymentUrl(paymentInfo, isSandbox) {

    var MP = Npm.require('mercadopago');
    var mp = new MP(mpSettings.client_id, mpSettings.client_secret);
    mp.sandboxMode(isSandbox);

    var syncCreatePayment = Async.wrap(mp, 'createPreapprovalPayment');

    var response = {};
    try {
        var onDone = syncCreatePayment(paymentInfo);
        response.url = isSandbox ? onDone.response.sandbox_init_point : onDone.response.init_point;

    } catch (e) {
        console.log('Error on MercadoPago.getPaymentUrl: ' + e);
        response.error = e;
    }

    return response;
}

function getPreapprovalStatus(topic, id) {

    if (topic != constants.TOPIC_PRE_APPROVAL)
        throw new Error('Error on MercadoPago.getPreapprovalStatus: Expected topic of value ' + constants.TOPIC_PRE_APPROVAL + ' but got ' + topic);

    var MP = Npm.require('mercadopago');
    var mp = new MP(mpSettings.client_id, mpSettings.client_secret);
    mp.sandboxMode(isSandbox);

    var syncGetApprovalStatus = Async.wrap(mp, 'getPreapprovalPayment');

    var response = {};
    try {
        var remoteInfo = syncGetApprovalStatus(id);
        response.raw = remoteInfo;

        response.subscriptionId = remoteInfo.id;
        response.paymentTopic = constants.TOPIC_PRE_APPROVAL;
        response.paymentStatus = remoteInfo.status;
    } catch (e) {
        console.log('Error on MercadoPago.getPreapprovalStatus: ' + e);
        response.error = e;
    }

    return response;
}

function getAuthorizedStatus(topic, id) {

    if (topic != constants.TOPIC_AUTHORIZED_PAYMENT)
        throw new Error('Error on MercadoPago.getAuthorizedStatus: Expected topic of value ' + constants.TOPIC_AUTHORIZED_PAYMENT + ' but got ' + topic);

    var MP = Npm.require('mercadopago');
    var mp = new MP(mpSettings.client_id, mpSettings.client_secret);
    mp.sandboxMode(isSandbox);

    var syncGetAuthorizedStatus = Async.wrap(mp, 'getAuthorizedPayment');

    var response = {};
    try {
        var remoteInfo = syncGetAuthorizedStatus(id);
        response.raw = remoteInfo;

        response.subscriptionId = remoteInfo.preapproval_id;
        response.paymentTopic = constants.TOPIC_AUTHORIZED_PAYMENT;
        response.paymentStatus = remoteInfo.payment.status;
    } catch (e) {
        console.log('Error on MercadoPago.getAuthorizedStatus: ' + e);
        response.error = e;
    }

    return response;
}

function initializeMercadoPago() {
    if (!mpSettings)
        throw new Error('mercadopago.client_id and mercadopago.client_secret not found on settings file. Be sure to start Meteor with --settings [filename.json]');
}
initializeMercadoPago();




TODO:
    -Criar API para receber respostas
    - Adicionar resultados em uma coleçao 
    - Exibir a coleçao 
    - Publicar no meteor.com 
    - Direcionar MP para o meteor.com 
    - Criar testes e readme para o pacote