ContactsSchema = new SimpleSchema ({
	name: {
		type: String,
		min: 3,
		max: 20
	},
	email: {
		type: String
	},
	photo: {
		type: String,	// Base64 URI
		optional: true
	},
	lastUpdated: {
		type: Date,
		optional: true
	}
});

Contacts = new Meteor.Collection('Contacts');
if(Meteor.isCordova) Ground.Collection(Contacs);

Meteor.methods({
	addContact: function(doc) {
		check(doc, ContactsSchema);
		var obj = {name: doc.name, email: doc.email, createdAt: new Date};
		return Contacts.insert(obj);
	},

	editContact: function(obj) {
		_.extend(obj.updateDoc.$set, {lastUpdated: new Date});
		check(obj._id, String);
		check(obj.updateDoc.$set, ContactsSchema);
		return Contacts.update({_id: obj._id}, obj.updateDoc);
	},

	editPhoto: function(id, data) {
		return Contacts.update({_id: id}, { $set: {photo: data} });
	},	
	
	removeContact: function(id) {
		check(id, String);
		return Contacts.remove(id);
	}
});

if ( Meteor.isCordova ) {
	Ground.methodResume([
  		'addContact',
  		'editContact',
  		'removeContact'
	]);
}