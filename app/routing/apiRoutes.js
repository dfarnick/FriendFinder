var path = require('path');
var friends = require('../data/friends.js');

module.exports = function (app) {
    // show all 
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });
    // Add friend
    app.post('/api/friends', function (req, res) {
        var friendData = req.body;
        var userResponses = friendData.scores;
        // console.log('userResponses = ' + userResponses);		
        var name = '';
        var photo = '';
        var totalDifference = 1000;

        // loop through friends 
        for (var i = 0; i < friends.length; i++) {

            // hard part... computing differences
            var diff = 0;
            for (var x = 0; x < userResponses.length; x++) {
                diff += Math.abs(friends[i].scores[x] - userResponses[x]);
            }
            ///store difference in diff

            if (diff < totalDifference) {
                console.log('Best friend = ' + diff);
                totalDifference = diff;
                name = friends[i].name;
                photo = friends[i].photo;
            }
        }
        friends.push(friendData);

        res.json({ status: 'OK', name: name, photo: photo });
    });
};