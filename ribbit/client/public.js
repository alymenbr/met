Template.public.helpers({
    ribbits: function() {
        return Ribbits.find({}, {
            sort: {
                created_at: -1
            }
        });
    },

    publicUserFull: function(currentRibbitId) {
        var theUser = Meteor.users.findOne({
            _id: currentRibbitId
        });

        return theUser.profile.name;
    },

    publicUserName: function(currentRibbitId) {
        var theUser = Meteor.users.findOne({
            _id: currentRibbitId
        });

        return theUser.username;
    },

    publicAvatarLink: function(ribbitUserId) {
        var theUser = Meteor.users.findOne({
            _id: ribbitUserId
        });
        return theUser.profile.avatarLink;
    },

    elapsedTime: function(text) {
        var currentDate = new Date(),
            ribbitDate,
            minutes_elapsed,
            hours_elapsed,
            days_elapsed,
            retVal,
            record = Ribbits.findOne({
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

Template.public.events({
    'click #createTheRibbit': function(event, template) {
        var ribbitContent = template.find('.ribbitText').value;

        var result = Ribbits.insert({
            user_id: Meteor.user()._id,
            ribbit: ribbitContent,
            created_at: new Date()
        });

        template.find('.ribbitText').value = "";
    }
});