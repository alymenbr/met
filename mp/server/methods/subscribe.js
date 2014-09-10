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


        return MercadoPago.getPaymentUrl(paymentInfo, true);
    }
});