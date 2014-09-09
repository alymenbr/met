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


        var client_id = "1463580163804538";
        var client_secret = "zCOFVP8OIiPqtj9M9ViluwgEzmNQRCWB";

        var MP = Meteor.npmRequire('mercadopago');
        var mp = new MP(client_id, client_secret);
        mp.sandboxMode(true);

        var startDate = new Date();
        startDate.setMonth(startDate.getMonth() + 1);

        var preapprovalPayment = {
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

        var wrapped = Async.wrap(mp, 'createPreapprovalPayment');
        var onDone = wrapped(preapprovalPayment);
/*
        mp.createPreapprovalPayment(preapprovalPayment, function(err, data) {
            console.log('');
            console.log('');
            console.log('-----------------------------------------');
            console.log(JSON.stringify(data));
            console.log('-----------------------------------------');            
            console.log('');
            console.log('');
        });
*/

        console.log('json: ' + JSON.stringify(onDone) );
        console.log('sandbox_init_point: ' + onDone.response.sandbox_init_point);

        return 'response.result';
    }
});