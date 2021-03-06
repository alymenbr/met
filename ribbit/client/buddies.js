Template.buddiescontent.helpers({
    fullName: function() {
        return Meteor.user().profile.name;
    },

    userName: function() {
        return Meteor.user().username;
    },

    avatarLink: function() {
        return Meteor.user().profile.avatarLink;
    },

    noOfRibbits: function() {
        var retVal;
        var ribbits = Ribbits.find({
            user_id: Meteor.userId()
        });

        if (ribbits.count() === 1) {
            retVal = "1 Ribbit";
        } else {
            retVal = ribbits.count() + " Ribbits";
        }

        return retVal;
    },


    noOfFollowers: function() {
        var followers = Follows.find({
            user_id: Meteor.userId()
        });
        return followers.count() + " followers";
    },

    noOfFollowing: function() {
        var following = Follows.find({
            followee_id: Meteor.userId()
        });
        return following.count() + " following";
    },

    lastRibbit: function() {
        var retVal;
        var lastRibbit = Ribbits.findOne({
            user_id: Meteor.userId()
        }, {
            sort: {
                created_at: -1
            }
        });

        if (lastRibbit) {
            retVal = lastRibbit.ribbit;
        } else {
            retVal = "This user has no Ribbits";
        }

        return retVal;
    },

    buddyFullName: function(ribbitUserId) {
        var theUser = Meteor.users.findOne({
            _id: ribbitUserId
        });
        return theUser.profile.name;
    },

    buddyUserName: function(ribbitUserId) {
        var theUser = Meteor.users.findOne({
            _id: ribbitUserId
        });
        return theUser.username;
    },

    buddyAvatarLink: function(ribbitUserId) {
        var theUser = Meteor.users.findOne({
            _id: ribbitUserId
        });
        return theUser.profile.avatarLink;
    },

    ribbits: function() {
        return Ribbits.find({}, {
            sort: {
                created_at: -1
            }
        });
    },

    elapsedTime: function(text) {
        var currentDate = new Date();
        var ribbitDate;
        var minutes_elapsed;
        var hours_elapsed;
        var days_elapsed;
        var retVal;
        var record = Ribbits.findOne({
            ribbit: text
        });

        ribbitDate = new Date(record.created_at);
        minutes_elapsed = (currentDate - ribbitDate) / 60000;

        if (minutes_elapsed > 60) {
            hours_elapsed = minutes_elapsed / 60;
            if (hours_elapsed > 24) {
                days_elapsed = hours_elapsed / 24;
                retVal = parseInt(days_elapsed, 10) + "d";
            } else {
                retVal = parseInt(hours_elapsed, 10) + "h";
            }
        } else {
            retVal = parseInt(minutes_elapsed, 10) + "m";
        }
        return retVal;
    }
});

Template.buddiescontent.events({
    'click #createTheRibbit': function(event, template) {
        var ribbitContent = template.find('.ribbitText').value;

        var result = Ribbits.insert({
            user_id: Meteor.user()._id,
            ribbit: ribbitContent,
            created_at: new Date()
        });

        template.find('.ribbitText').value = "";
    },

    'click #avatarLink': function(event, template) {
        var currentLink = Meteor.user().profile.avatarLink;
        var newLink;

        switch (currentLink) {

            case "gfx/user1.png":
                newLink = "gfx/user2.png";
                break;
            case "gfx/user2.png":
                newLink = "gfx/user3.png";
                break;
            case "gfx/user3.png":
                newLink = "gfx/user1.png";
                break;
        }

        Meteor.users.update(Meteor.userId(), {
            $set: {
                profile: {avatarLink: newLink, name: Meteor.user().profile. name}
            }
        });
    }
});