Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() {
        return [Meteor.subscribe('notifications')];
    }
});

Router.map(function() {

    this.route('postPage', {
        path: '/posts/:_id',
        waitOn: function(){
            return Meteor.subscribe('comments', this.params._id);
        },
        data: function() {
            return Posts.findOne(this.params._id);
        }
    });

    this.route('postEdit', {
        path: '/posts/:_id/edit',
        data: function() {
            return Posts.findOne(this.params._id);
        }
    });

    this.route('postSubmit', {
        path: '/submit'
    });

    this.route('postsList', {
        path: '/:postsLimit?',
        waitOn: function(){
            var postLimit = parseInt(this.params.postsLimit, 10) || 5;
            return Meteor.subscribe('posts', {sort: {submittd: -1}, limit: postLimit });
        }

    });
});

var requireLogin = function() {
    if (!Meteor.user()) {
        if (Meteor.loggingIn())
            this.render(this.loadingTemplate);
        else
            this.render('accessDenied');

        this.stop();
    }
};

Router.onBeforeAction('loading');

Router.onBeforeAction(requireLogin, {
    only: 'postSubmit'
});

Router.onBeforeAction(function() {
    clearErrors();
});