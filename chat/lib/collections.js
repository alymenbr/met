Rooms = new Meteor.Collection('rooms');

if (Meteor.isServer && Rooms.find({name: "Meteor Talk"}).count() === 0){
	Rooms.remove({});

	var rooms = [
		{name: 'Meteor Talk', members: 3, last_activity: '1 minute ago',
			messages: [
				{author: 'Tom', text: 'Hi there Sacha!'},
				{author: 'Sacha', text: 'Hey Tom, how are you?'},
				{author: 'Tom', text: 'Good thanks!'}
			]}
	];

	rooms.forEach(function (room) {
		Rooms.insert(room);
	});
}