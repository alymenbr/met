module.exports = function() {
    var fs = require('fs'),
        wrench = require('wrench'),
        util = require('util');

    var fileNameList = wrench.readdirSyncRecursive("atual");

    var data = fs.readFileSync('./atual/' + fileNameList[0], 'utf8'),
        myObj;

    try {
        console.log(data);
        myObj = JSON.parse(data);
    } catch (err) {
        console.log('There has been an error parsing your JSON.');
        console.log(err);
    }

    return myObj;
};