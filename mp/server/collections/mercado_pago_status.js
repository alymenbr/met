/*
 * Add query methods like this:
 *  MercadoPagoStatus.findPublic = function () {
 *    return MercadoPagoStatus.find({is_public: true});
 *  }
 */

MercadoPagoStatus.allow({
  insert: function (userId, doc) {
    return true;
  },

  update: function (userId, doc, fieldNames, modifier) {
    return true;
  },

  remove: function (userId, doc) {
    return true;
  }
});

MercadoPagoStatus.deny({
  insert: function (userId, doc) {
    return false;
  },

  update: function (userId, doc, fieldNames, modifier) {
    return false;
  },

  remove: function (userId, doc) {
    return false;
  }
});
