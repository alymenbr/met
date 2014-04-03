 
Router.map( function(){
	this.route( 'home', {path: '/'} );
	
	this.route( 'room', {
		path: '/rooms/:_id',
		data: function() { return Rooms.findOne(this.params._id); }} );
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

	"click button" : function(){
		var newMessage = document.getElementById("message").value;
		var newAuthor = document.getElementById("author").value;
		var currentId = this._id;
		addMessage(currentId, newAuthor, newMessage);
		return false;
	}
};

function addMessage(id, newAuthor, newMessage) {
		Rooms.update(id, {$push: {messages: {author: newAuthor, text: newMessage}}});
		clearMessageFields();
}

function clearMessageFields() {
	document.getElementById("message").value = "";
	document.getElementById("author").value = "";
	document.getElementById("author").focus();
}