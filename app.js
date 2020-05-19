var Twitter = require('twitter');

var config = require('./config.js');
var Tweet = new Twitter(config);

var params = {
    q: '#MentalHealthMatters',
    count: 10,
    result_type: 'recent',
    lang: 'en'
}

Tweet.get('search/tweets', params, function(error, data, response) {
    if (! error) {
        for (let i = 0; i < data.statuses.length; i++) {
            Tweet.post('favorites/create', { id: data.statuses[i].id_str }, function(error, response) {
                if (error) {
                    console.log(error[0].message);
                } else {
                    let tweet = `https://twitter.com/${response.user.screen_name}/status/${response.id_str}`
                    console.log('Liked: ', tweet);
                }
            });
        }
    } else {
        console.log(error);
    }
});