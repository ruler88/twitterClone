Meteor.methods({
  insertTweet: function(tweet) {
    if (Meteor.user()) {
      Tweets.insert({
        message: tweet,
        user: Meteor.user().username
      });
    }
  }
});
