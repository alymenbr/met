(function(){Template.notifications.helpers({
	notifications: function(){
		return Notifications.find({userId: Meteor.userId(), read: false});
	},
	notificationCount: function(){
		return Notifications.find({userId: Meteor.userId(), read: false}).count();
	}
});

Template.notification.helpers({
	notificationPostPath: function(){
		return Router.routes.postPage.path({_id: this.postId});
	}
});

Tempate.notification.events({
	'click #postLink': function(){
		Notifications.update(this._id, {$set: {read: true}});
	}
});

})();
