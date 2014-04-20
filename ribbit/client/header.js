Template.header.events({
    'click #btnLogOut': function(event, template) {

        if (Meteor.userId()) {
            Meteor.logout();
        } else {
            var userName = template.find('#username').value;
            var userPassword = template.find('#password').value;

            Meteor.loginWithPassword(userName, userPassword, function(error) {
                if (error) {
                    console.log(error);
                }
            });
        }
    },

    'click #public': function(event, template) {
        Session.set("currentPage", "public");
    },

    'click #buddies': function(event, template) {
        Session.set("currentPage", "buddies");
    },
});