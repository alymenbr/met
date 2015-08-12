Template.contacts.onCreated( function() {
	var self = this;

	self.autorun( function() {
		if( Meteor.status().connected ){
			Meteor.subscribe("contacts");
		};
	});
});

Template.contacts.helpers({
	'contacts': function() {
		return Contacts.find({});
	}
});

Template.contacts.events({
	'click .button-assertive': function(e) {
		e.preventDefault();
		Meteor.call('removeContact', this._id, function(error, result) {
			if(error) alert(error.reason);
		});
		return;
	}
});


Template.edit.helpers({
	'photo': function() {

		if( Session.get('photo') )
			return Session.get('photo');

		if(this._af.doc.photo && this._af.doc && this._af.doc.photo)
			return this._af.doc.photo;		
			
		return "/avatar.gif";
	}
});

Template.edit.events({
	'click #photo': function(e) {
		e.preventDefault();

		MeteorCamera.getPicture({}, function(error, data){
			Session.set('photo', data);
		});
	},

	'click .back-button': function(e) {
		Session.set('photo', null);
	}	
});


Template.edit.onCreated(function() {
	var self = this;
	self.autorun(function() {
		if(Meteor.status().connected){
			Meteor.subscribe("contact", Router.current().params._id);
		}
	});
});

Template.edit.helpers({
	'selectedDoc': function() {
		return Contacts.findOne(Router.current().params._id);
	}
});

AutoForm.hooks({
	insertContactForm: {
		onSubmit: function(insertDoc) {
			Meteor.call('addContact', insertDoc, function(error, result) {
				if (error) alert(error.reason);
			});
			$(".back-button").click();
			return false;
		}
	}
});

AutoForm.hooks({
	editContactForm: {
		onSubmit: function(insertDoc, updateDoc, currentDoc) {

			if( Session.get('photo') )
				updateDoc['$set'].photo = Session.get('photo');

			var obj = {_id: Router.current().params._id, updateDoc: updateDoc};

			Meteor.call('editContact', obj, function(error, result) {
				if (error) alert(error.reason);
			});

			Session.set('photo', null);
			$(".back-button").click();
			return false;
		}
	}
});