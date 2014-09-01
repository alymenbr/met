/*****************************************************************************/
/* SubscribeIndex Publish Functions
/*****************************************************************************/

Meteor.publish('subscribe_index', function () {
  // you can remove this if you return a cursor
  this.ready();
});
