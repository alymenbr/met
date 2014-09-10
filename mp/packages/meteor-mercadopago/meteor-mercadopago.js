MercadoPago = {

    'getPaymentUrl': function(email, paymentInfo, isSandbox) {

        var localPreferences = {
            client_id: "1463580163804538",
            client_secret: "zCOFVP8OIiPqtj9M9ViluwgEzmNQRCWB"
        };

        var MP = Npm.require('mercadopago');
        var mp = new MP(localPreferences.client_id, localPreferences.client_secret);
        mp.sandboxMode(isSandbox);

        var syncPreapprovalPayment = Async.wrap(mp, 'createPreapprovalPayment');
        var onDone = syncPreapprovalPayment(paymentInfo);

        var paymentUrl;

        if (onDone.response)
            paymentUrl = isSandbox ? onDone.response.sandbox_init_point : onDone.response.init_point;
        else
            paymentUrl = onDone.err;

        return paymentUrl;
    }

};