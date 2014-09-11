
/*****************************************************************************/
/* SubscribeIndex: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.SubscribeIndex.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.SubscribeIndex.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */

   'paymentUrl': function(){
      return Session.get("paymentUrl") || "";
   },

   'mercadoPagoStatus': function(){
      return MercadoPagoStatus.find();
   }
});

/*****************************************************************************/
/* SubscribeIndex: Lifecycle Hooks */
/*****************************************************************************/
Template.SubscribeIndex.created = function () {

  Meteor.call('getPaymentUrl', 'usuario@teste.com', function(err, result){
      Session.set("paymentUrl", result);
  });
};

Template.SubscribeIndex.rendered = function () {
};

Template.SubscribeIndex.destroyed = function () {
};


