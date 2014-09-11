var MP = require("mercadopago"),
    config = require("../config");

exports.run = function(req, res) {
    var mp = new MP(config.client_id, config.client_secret);
    mp.sandboxMode(true);

    var filters = {
        "site_id": "MLB", // Argentina: MLA; Brasil: MLB
        "external_reference": "BILL_001"
    };

    mp.searchPayment(filters, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.render("payment-search/search-result", {
                "result": data
            });
        }
    });
};