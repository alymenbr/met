Template.profile.helpers({
    users: function() {
        var queryName = Session.get('searchedName');
        var currentId = Meteor.userId();

        if (queryName !== undefined) {
            return Meteor.users.find({
                $and: [{
                    _id: {
                        $ne: currentId
                    }
                }, {
                    username: queryName
                }]
            });
        } else {
            return Meteor.users.find({
                _id: {
                    $ne: currentId
                }
            });
        }
    },

    noOfFollowers: function(followedId) {
        var followers = Follows.find({
            user_id: followedId
        });
        return followers.count() + " followers";
    },

    followText: function(followedId) {
        var followee = Follows.findOne({
            $and: [{
                followee_id: Meteor.userId()
            }, {
                user_id: followedId
            }]
        });

        if (followee) {
            return 'unfollow';
        } else {
            return 'follow';
        }
    },

    lastRibbit: function(followedId) {
        var retVal;
        var lastRibbit = Ribbits.findOne({
            user_id: followedId
        }, {
            sort: {
                created_at: -1
            }
        });

        if (lastRibbit) {
            retVal = lastRibbit.ribbit;
        } else {
            retVal = "The user has no Ribbits";
        }

        return retVal;
    }
});

Template.profile.events({
    'click #btSearch': function(event, template) {

        var searchedUser = template.find("#txQuery").value;

        if (searchedUser !== "") {
            Session.set('searchedName', searchedUser);
        } else {
            Session.set('searchedName', undefined);
        }
        Template.profile();
    },

    'click .follow': function(event, template) {
        var isFollowed;
        var theClickedUserId = event.currentTarget.id;
        var theFollowees = Follows.find({user_id: theClickedUserId});

        theFollowees.forEach(function(theFollowee) {
            if (theFollowee.followee_id === Meteor.userId()) {
                isFollowed = true;
            } else {
                isFollowed = false;
            }
        });

        if (!isFollowed) {
            Follows.insert({
                user_id: theClickedUserId,
                followee_id: Meteor.userId()
            });
        } else {
            Follows.remove({
                $and: [{
                    user_id: theClickedUserId
                }, {
                    followee_id: Meteor.user()._id
                }]
            });
        }
    }
});