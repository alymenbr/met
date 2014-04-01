 
 Meteor.Router.add({
    '/': 'home',
    '/rooms': 'room'
  });

var rooms = [
	{name: 'Meteor Talk', members: 3, last_activity: '1 minute ago',
		messages: [
			{author: 'Tom', text: 'Hi there Sacha!'},
			{author: 'Sacha', text: 'Hey Tom, how are you?'},
			{author: 'Tom', text: 'Good thanks!'}
		]},
	{name: 'Dev', members: 2, last_activity: '5 minutes ago'},
	{name: 'Core', members: 0, last_activity: '3 days ago'},	
];

Template.rooms.helpers({
	rooms: rooms
});

Template.room.helpers({
	room: rooms[0]
});