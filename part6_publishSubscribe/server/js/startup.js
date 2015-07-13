Meteor.startup(function () {
  Relationships._ensureIndex({follower: 1, following: 1}, {unique: 1});
});
