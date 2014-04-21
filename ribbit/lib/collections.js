Ribbits = new Meteor.Collection('ribbits');
Follows = new Meteor.Collection('follows');

Meteor.methods({
    removeFollow: function(userId, followeeId) {
        Follows.remove({
            $and: [{
                user_id: userId
            }, {
                followee_id: followeeId
            }]
        });
    }
});