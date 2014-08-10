/*****************************************************************************/
/* TodosIndex Publish Functions
/*****************************************************************************/

Meteor.publish('todos_index', function () {
    return Todos.find({user_id: this.userId});
});
