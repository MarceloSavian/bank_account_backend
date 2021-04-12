const ObjectID = require('mongodb').ObjectID

module.exports = {
  async up(db, client) {
    return db.collection('movementTypes').insertMany([
      {
        "_id": new ObjectID("606f3ef89c9eb364811f317a"),
        "name": "Insert Deposit",
        "type": "in"
      },
      {
        "_id": new ObjectID("606fa21c9c9eb364811f317b"),
        "name": "Send Deposit",
        "type": "out"
      },
      {
        "_id": new ObjectID("606fa2629c9eb364811f317c"),
        "name": "Make Payment",
        "type": "out"
      }
    ])
  },

  async down(db, client) {
    return db.dropCollection('movementTypes')
  }
};
