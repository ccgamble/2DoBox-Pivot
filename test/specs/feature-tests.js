const assert =  require('assert');

describe('our test bundle', function () {
  it('should work', function () {
    assert(true);
  });

  // As a user,
  // when I go to the root of your application.
  // I should see two input fields.
  // One for an idea title and one for an idea description.
  // When I fill out both fields and click the submit button .
  // I expect my idea to be posted onto the page.
  it('should be able to add my ideas to the page',function(){

      browser.url('/');
      var ideaTitle = browser.element(".title-input");
      var ideaDescription = browser.element(".body-input");

      ideaTitle.setValue('great title');
      ideaDescription.setValue('great description');

      assert.equal(ideaTitle.getValue(), 'great title');
      assert.equal(ideaDescription.getValue(), 'great description');

      browser.click('.save-btn');

      var ideaTitles = browser.getText('.title');
      assert.equal(ideaTitles.replace(/\n/g, ", "), 'great title');

      var ideaDescriptions = browser.getText('.body');
      assert.equal(ideaDescriptions.replace(/\n/g, ", "), 'great description');

  });
  });
