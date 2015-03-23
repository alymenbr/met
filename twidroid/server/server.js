var TweetStream = new Meteor.Stream('tweets');
var textConfig = Assets.getText('twitter.json');

console.log(textConfig);

var conf = JSON.parse( textConfig );
var twit = new Twitter({
	consumer_key: conf.consumer.key,
	consumer_secret: conf.consumer.secret,
	access_token_key: conf.access_token.key,
	access_token_secret: conf.access_token.secret
});
