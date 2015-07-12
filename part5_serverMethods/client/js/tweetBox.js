Template.tweetBox.helpers({
  charCount: function() {
    return 140 - Session.get('numChars');
  },

  charClass: function() {
    if (Session.get('numChars') > 140) {
      return 'errCharCount';
    } else {
      return 'charCount';
    }
  },

  disableButton: function() {
    if (Session.get('numChars') <= 0 ||
        Session.get('numChars') > 140 ||
        !Meteor.user()) {
      return 'disabled';
    }
  }
});

Template.tweetBox.events({
  'input #tweetText': function(){
    Session.set('numChars', $('#tweetText').val().length);
  },

  'click button': function() {
    var tweet = $('#tweetText').val();
    $('#tweetText').val("");
    Session.set('numChars', 0);
    Meteor.call('insertTweet', tweet);
  }
});

Template.tweetBox.onRendered(function () {
  Session.set('numChars', 0);
});
