Ribbits = new Meteor.Collection('ribbits');

Template.buddiescontent.helpers({
    fullName: function() {
        return Meteor.user().profile.name;
    },

    userName: function() {
        return Meteor.user.username;
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
    }
});