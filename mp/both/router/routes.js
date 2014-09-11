/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
    layoutTemplate: 'MasterLayout',
    loadingTemplate: 'Loading',
    notFoundTemplate: 'NotFound',
    templateNameConverter: 'upperCamelCase',
    routeControllerNameConverter: 'upperCamelCase'
});

Router.map(function() {
    /*
    Example:
      this.route('home', {path: '/'});
  */
    this.route('subscribe.index', {
        path: '/'
    });

    this.route('mercadoPagoCall', {
        where: 'server',
        path: '/mercadoPagoCallback',

        action: function() {
            var topic = this.params.topic;
            var id = this.params.id;
            var mpResults = MercadoPago.getPaymentInfo(topic, id);

            MercadoPagoStatus.insert(mpResults);

            this.response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            this.response.end('hello from server');
        }
    });
});