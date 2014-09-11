var package = require("./package"),
    express = require("express"),
    app = express(),
    fs = require("fs");

app.use(express.bodyParser());

app.set("view engine", "jade");

var listJson = {
    list: []
};

app.get(/\/(.+)/, function(req, res) {
    if (fs.existsSync(req.params[0] + ".js")) {
        require("./" + req.params[0]).run(req, res);
    } else if (req.params[0] == 'list') {
        res.status(200).json(listJson);
    } else {
        res.status(404).send("");
    }
});

app.post('/confirmPayment', function(req, res) {
    var topic = req.query.topic;
    var id = req.query.id;
    confirmPayment(res, topic, id);
});

var port = Number(process.env.PORT || 8080);
app.listen(port, function() {
    console.log("Listening on " + port);
});





var MP = require("mercadopago"),
    config = require("./config");

function confirmPayment(response, topic, id) {
    var mp = new MP(config.client_id, config.client_secret);
    mp.sandboxMode(true);

    mp.getPreapprovalPayment(id, function(err, data) {
        if (err) {
            response.status(200).send('');

        } else {
            console.log('Dados recebidos: ' + JSON.stringify(data));
            var newJson = {
                'topic': topic,
                'id': id,
                'payer_email': data.response.payer_email,
                'status': data.response.status,
                'external_reference': data.response.external_reference
            };

            listJson.list.push(newJson);

            response.status(200).send('');
        }
    });
}