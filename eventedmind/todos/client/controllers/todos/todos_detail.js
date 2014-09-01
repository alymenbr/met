TodosDetailController = RouteController.extend({

    onRun: function(){
        App.track('Todos Detail View');
    },

    waitOn: function() {
        var id = this.params._id;
        return Meteor.subscribe('todos_detail', id);
    },

    data: function() {
        var id = this.params._id;
        var todo = Todos.findOne({_id: id});

        if(todo)
            App.track('Todo View', {subject: todo.subject});

        return todo;
    },

    action: function() {
        this.render();
    }
});