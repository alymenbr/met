var mpSettings = Meteor.settings && Meteor.settings.mercadopago;

MercadoPago = {

    'initialize': function() {
        if (!mpSettings)
            throw new Error('mercadopago.client_id and mercadopago.client_secret not found on settings file. Be sure to start Meteor with --settings [filename.json]');
    },

    'getPaymentUrl': function(paymentInfo, isSandbox) {

        var MP = Npm.require('mercadopago');
        var mp = new MP(mpSettings.client_id, mpSettings.client_secret);
        mp.sandboxMode(isSandbox);

        var syncPreapprovalPayment = Async.wrap(mp, 'createPreapprovalPayment');

        var response = {};
        try {
            var onDone = syncPreapprovalPayment(paymentInfo);
            response.url = isSandbox ? onDone.response.sandbox_init_point : onDone.response.init_point;

        } catch (e) {
            console.log('Error on MercadoPago.getPaymentUrl: ' + e);
            response.error = e;
        }

        return response;
    }

};

MercadoPago.initialize();