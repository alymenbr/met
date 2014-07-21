module.exports = {
    "Test Case 1 - Navigate to Google": function(browser) {

        var loadFile = require('../loadFile');
        var currentFile = loadFile();

        var expectedTitle = currentFile.mes;
        browser
            .url("http://www.google.com")
            .waitForElementVisible('body', 1000)
            .verify.title(expectedTitle)
            .end();
    }
};