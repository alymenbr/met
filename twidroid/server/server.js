var TweetStream = new Meteor.Stream('tweets');
var conf = JSON.parse(Assets.getText('twitter.json'));
var twit = new Twitter({
	consumer_key: conf.consumer.key,
	consumer_secret: conf.consumer_secret,
	access_token_key: conf.access_token_key,
	access_token_secret: conf.access_token_secret
});
