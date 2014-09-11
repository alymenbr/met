SubscribeIndexController = RouteController.extend({
    waitOn: function() {
        Meteor.subscribe('subscribe_index');
    },

    data: function() {},

    action: function() {
        this.render();
    }
});