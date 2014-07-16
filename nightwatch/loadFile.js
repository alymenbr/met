module.exports = function() {
  var fs = require('fs');

  var data = fs.readFileSync('./atual/atual.json'),
      myObj;

  try {
      myObj = JSON.parse(data);
  } catch (err) {
      console.log('There has been an error parsing your JSON.');
      console.log(err);
  }

  return myObj;
};