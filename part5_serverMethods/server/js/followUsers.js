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
  },

  'recommendUsers': function() {
    var currentRelationships = Relationships.find({follower: Meteor.user().username}).fetch();
    var currentFollowings = currentRelationships.map(function(data) {
      return data.following;
    });
    currentFollowings.push(Meteor.user().username);

    var recUsers = Meteor.users.find({
      username: { $nin: currentFollowings }
    }, {
      fields: { 'username': 1 },
      limit: 5
    }).fetch();

    return recUsers;
  }
});
