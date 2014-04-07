 
Router.map( function(){
	this.route( 'rooms', {path: '/'} );
	
	this.route( 'room', {
		path: '/rooms/:_id',
		data: function() { return Rooms.findOne(this.params._id); }} );
});

Meteor.startup(function() {
  Template.fb_pic.pic = function() {// helper function to display the pic on the page
    var userProfile;
    userProfile = Meteor.user().profile;
 
    if(userProfile) { // logic to handle logged out state
      return userProfile.picture;
    }
  };
});


Template.rooms.helpers({
	rooms: function(){
		return Rooms.find();
	}
});


Template.rooms.events = {

	"click #createRoom" : function(){
		var newRoom = document.getElementById("roomName").value;
		Rooms.insert({name: newRoom, members: 0, last_activity: 'Never'});
		return false;
	}
};

Template.room.events = {

	"click button" : function(e){
		var newMessage = document.getElementById("message").value;
		var newAuthor = Meteor.user().profile.name;
		var currentId = this._id;
		addMessage(currentId, newAuthor, newMessage);

		e.preventDefault();
		return false;
	}
};

function addMessage(id, newAuthor, newMessage) {
		Rooms.update(id, {$push: {messages: {author: newAuthor, text: newMessage}}});
		Rooms.update(id, {$set : {last_activity : new Date().toDateString() }});
		clearMessageFields();
}

function clearMessageFields() {
	document.getElementById("message").value = "";
	document.getElementById("author").value = "";
	document.getElementById("author").focus();
}