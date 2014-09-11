/*****************************************************************************/
/* SubscribeIndex Publish Functions
/*****************************************************************************/

Meteor.publish('subscribe_index', function () {
	return MercadoPagoStatus.find();
});
