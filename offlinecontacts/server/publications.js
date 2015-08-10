Meteor.publish('contacts', function() {
	return Contacts.find();
});

Meteor.publish('contact', function() {
	return Contacts.find({_id: _id});
});