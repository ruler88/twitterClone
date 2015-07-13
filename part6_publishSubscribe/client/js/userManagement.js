Template.userManagement.helpers({
  'tweets': function() {
    if (Meteor.user()) {
      return Tweets.find({ user: Meteor.user().username }).count();
    }
  },

  'following': function() {
    if (Meteor.user()) {
      return Relationships.find({ follower: Meteor.user().username }).count();
    }
  },

  'followers': function() {
    if (Meteor.user()) {
      return Relationships.find({ following: Meteor.user().username }).count();
    }
  }
});

Template.userManagement.events({
  'click #signup': function() {
    var user = {
      username: $('#signup-username').val(),
      password: $('#signup-password').val(),
      profile: {
        fullname: $('#signup-fullname').val()
      }
    };

    Accounts.createUser(user, function (error) {
      if(error) alert(error);
    });
  },

  'click #login': function() {
    var username = $('#login-username').val();
    var password = $('#login-password').val();

    Meteor.loginWithPassword(username, password, function(error) {
      if(error) alert(error);
    });
  },

  'click #logout': function() {
    Meteor.logout();
  }
});


Template.followUsers.onCreated( function() {
  if (Meteor.user()) {
    this.subscribe('followings', Meteor.user().username);
    this.subscribe('followers', Meteor.user().username);
    this.subscribe('tweets', Meteor.user().username);
  }
});
