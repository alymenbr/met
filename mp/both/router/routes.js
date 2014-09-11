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
            console.log(' ');
            console.log(' ');
            console.log('----------------');
            console.log('this.params: ');
            console.log(this.params);
            console.log(' ');


            var topic = this.params.topic;
            var id = this.params.id;
            var mpResults = MercadoPago.getPaymentInfo(topic, id);


            console.log('mpResults: ');
            console.log(mpResults);
            console.log(' ');
            console.log('----------------');
            console.log(' ');


            MercadoPagoStatus.insert(mpResults);


            console.log('MercadoPagoStatus.count(): ');
            console.log(MercadoPagoStatus.count());
            console.log(' ');
            console.log('----------------');
            console.log(' ');
            console.log(' ');


            this.response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            this.response.end('hello from server');
        }
    });
});