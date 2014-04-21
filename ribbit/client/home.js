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
                name: name,
                avatarLink: 'gfx/user1.png'
            }
        }, function(error) {
            console.log("Cannot create user: " + error);
        });
    }
});