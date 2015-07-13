Meteor.methods({
  'findUser': function(username) {
    return Meteor.users.findOne({
      username: username
    }, {
      fields: { 'username': 1 }
    });
  },

  'followUser': function(username) {
    Relationships.insert({
      follower: Meteor.user().username,
      following: username
    });
  }
});
