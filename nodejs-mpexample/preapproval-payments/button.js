var MP = require("mercadopago"),
    config = require("../config");

exports.run = function(req, res) {
    var mp = new MP(config.client_id, config.client_secret);
    mp.sandboxMode(true);

    var startDate = new Date();
    startDate.setMonth(startDate.getMonth() + 1);

    var preapprovalPayment = {
        "payer_email": "my_customer@factati.com",
        "back_url": "http://mpexample.herokuapp.com/preapproval-payments/button",
        "reason": "Monthly subscription to premium package",
        "external_reference": "BILL_001",
        "auto_recurring": {
            "frequency": 1,
            "frequency_type": "months",
            "transaction_amount": 60,
            "currency_id": "BRL",
            "start_date": startDate,
            "end_date": null
        }
    };

    mp.createPreapprovalPayment(preapprovalPayment, function(err, data) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.render("preapproval-payments/button", {
                "preapproval": data
            });
        }
    });
};