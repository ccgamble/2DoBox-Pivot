var assert =  require('assert');
var $ = require('jquery');

describe('our test bundle', function () {
  it('should work', function () {
    assert(true);
  });

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
context('', function() {

  it('should clear the input fields', function(){
	   browser.url('/');
     var ideaTitle = browser.element(".title-input");
     var ideaDescription = browser.element(".body-input");

     ideaTitle.setValue('great title');
     ideaDescription.setValue('great description');
     browser.click('.save-btn');

     assert.equal(ideaTitle.getValue(), "");
     assert.equal(ideaDescription.getValue(), "");

  });
    it('should delete the idea when the delete button is clicked', function(){
      // browser.url('/');
      var title = browser.getText('.title');
      var body = browser.getText('.body');

      // browser.click('.delete-btn');

      assert.equal(title, "great title");
      assert.equal(body, "great description");

    });
  });
});

  //   it.skip('should edit the title and description when clicked outside text field', function(){
  //
  //   });
  //   it.skip('should pre-populate field with current text when editing', function(){
  //
  //   });
  //   it.skip('should mark an idea as completed with completed button clicked', function(){
  //
  //   });
  //   it.skip('should filter the ideas when entering text in search box', function(){
  //
  //   });
  //   it.skip('should save ideas and changes on reload', function() {
  //
  //   });
  //   it.skip('completed ideas should be hidden on load', function() {
  //
  //   });
  //   it.skip('should change the importance when user clicks up or down vote', function() {
  //
  //   });
  //
  //   it.skip('should filter level of importance when level of importance buttons are clicked', function() {
  //
  //   });
  //
  //   it.skip('should show completed tasks when user clicks show-completed button', function() {
  //
  //   });
  //   it.skip('should only display ten ideas when the page loads', function() {
  //
  //   });
  //   it.skip('should display all ideas when show more button is clicked', function() {
  //
  //   });
  //   it.skip('should disable the save-btn when the input fields are empty or have over 120 characters', function() {
  //
  //   });
  //   it.skip('should keep a character count for title and body input fields', function() {
  //
  //   });
  // });
