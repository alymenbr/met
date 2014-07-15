module.exports = {
    "Test Case 1 - Navigate to Google": function(browser) {
        var expectedTitle = 'Google';
        browser
			.url("http://www.google.com")
			.waitForElementVisible('body', 1000)
			.verify.title(expectedTitle)
			.end();
    }
};