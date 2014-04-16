Template.header.events({
    'click #btnLogOut': function(event, template) {

        if (Meteor.userId()) {
            Meteor.logout();
        } else {
            var userName = template.find('#userName').value;
            var userPassword = template.find('#password').value;

            Meteor.loginWithPassword(userName, userPassword, function(error) {
                if (error) {
                    console.log(error);
                }
            });
        }
    }
});

Template.homecontent.events({
    'click #btnCreateAccount': function(event, template) {
        var userEmail = template.find('#email').value;
        var userName = template.find('#newusername').value;
        var password = template.find('#newpassword').value;
        var password2 = template.find('#password2').value;
        var name = template.find('#fullname').value;

        Accounts.createUser({
            username: userName,
            password: password,
            email: userEmail,
            profile: {
                name: name
            }
        }, function(error) {
            console.log("Cannot create user");
        });
    }
});