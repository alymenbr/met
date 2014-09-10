/*****************************************************************************/
/* Subscribe Methods */
/*****************************************************************************/

Meteor.methods({
    /*
     * Example:
     *  '/app/subscribe/update/email': function (email) {
     *    Users.update({_id: this.userId}, {$set: {'profile.email': email}});
     *  }
     *
     */

    'getPaymentUrl': function(email) {


        var startDate = new Date();
        startDate.setMonth(startDate.getMonth() + 1);
        var paymentInfo = {
            "payer_email": email,
            "back_url": "http://mpexample.herokuapp.com/",
            "reason": "METEOR subscription to premium package",
            "external_reference": email,
            "auto_recurring": {
                "frequency": 1,
                "frequency_type": "months",
                "transaction_amount": 12,
                "currency_id": "BRL",
                "start_date": startDate,
                "end_date": null
            }
        };


        return getPaymentUrl(email, paymentInfo, true);
    }
});



var localPreferences = {
    client_id: "1463580163804538",
    client_secret: "zCOFVP8OIiPqtj9M9ViluwgEzmNQRCWB"
};

function getPaymentUrl(email, paymentInfo, isSandbox) {


    var MP = Meteor.npmRequire('mercadopago');
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