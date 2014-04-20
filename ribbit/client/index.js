Session.set("currentPage", "buddies");

Template.content.helpers({
  currentPage: function (type) {
    var thePage = Session.get("currentPage");
    return thePage === type;
  }
});