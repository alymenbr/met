Meteor.publish('contacts', function() {
	return Contacts.find();
});

Meteor.publish('contact', function(id) {
	return Contacts.find({_id: id});
});