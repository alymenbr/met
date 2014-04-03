 
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

	"click button" : function(){
		var newRoom = document.getElementById("roomName").value;
		alert(newRoom);
		
		//Rooms.insert({name: newRoom, members: 0, last_activity: 'Never'});
	}

};

Template.room.events = {

	"click button" : function(){
		var newMessage = document.getElementById("message").value;
		var newAuthor = document.getElementById("author").value;
		var currentId = this._id;
		addMessage(currentId, newAuthor, newMessage);
	},

	'submit': function () {
		var newMessage = document.getElementById("message").value;
		var newAuthor = document.getElementById("author").value;
		var currentId = this._id;
		addMessage(currentId, newAuthor, newMessage);
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