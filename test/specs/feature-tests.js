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


  it('should clear the input fields and reset backt to placeholder text', function(){
	   browser.url('/');
     var ideaTitle = browser.element(".title-input");
     var ideaDescription = browser.element(".body-input");

     browser.click('.save-btn');

     assert.equal(ideaTitle.getText(), "");
     assert.equal(ideaDescription.getText(), "");

  });
    it('should edit the title and description when these fields are changed', function(){
      var editTitle = browser.element('.edit-title');
      var editBody = browser.element('.edit-body');


      assert.equal(editTitle.getText(), "great title");
      assert.equal(editBody.getText(), "great description");

      editTitle.setValue('new title');
      browser.click('.idea-list');
      editBody.setValue('new body');
      browser.click('.idea-list');

      assert.equal(editTitle.getText(), "new title");
      assert.equal(editBody.getText(), "new body");
    });

    it('should have edits persist on page after refresh', function() {
      browser.refresh();
      var title = browser.element('.title');

      assert.equal(title.getText(), "new title");
    });

    it('should change the importance of an idea when a user clicks the up button', function(){
       browser.url('/');
       browser.url('/');
       var ideaTitle = browser.element('.title-input');
       var ideaDescription = browser.element('.body-input');
       var ideaList = browser.element('.idea-list');

       ideaTitle.setValue('great title');
       ideaDescription.setValue('great description');

       browser.click('.save-btn');

       var initialImportance = ideaList.elements('li').elements('.quality').getText();
       assert.equal(initialImportance[0], 'none');
       browser.click('.up-btn');
       var importanceAfterUpvote = ideaList.elements('li').elements('.quality').getText();
       assert.equal(importanceAfterUpvote[0], 'low');
 });

   it('should change the importance of an idea when a user clicks the down button', function(){
      browser.url('/');
      browser.url('/');
      var ideaTitle = browser.element('.title-input');
      var ideaDescription = browser.element('.body-input');
      var ideaList = browser.element('.idea-list');

      ideaTitle.setValue('great title');
      ideaDescription.setValue('great description');

      browser.click('.save-btn');

      var initialImportance = ideaList.elements('li').elements('.quality').getText();
      assert.equal(initialImportance[0], 'none');
      browser.click('.up-btn');
      var importanceAfterUpvote = ideaList.elements('li').elements('.quality').getText();
      assert.equal(importanceAfterUpvote[0], 'low');
      browser.click('.down-btn');
      var importanceAfterDownvote = ideaList.elements('li').elements('.quality').getText();
      assert.equal(importanceAfterDownvote[0], 'none');
  });

    it('should delete the idea when the delete button is clicked', function(){
      browser.url('/');
      var ideaTitle = browser.element(".title-input");
      var ideaDescription = browser.element(".body-input");

      ideaTitle.setValue('great title');
      ideaDescription.setValue('great description');

      browser.click('.save-btn');
      browser.click('.save-btn');

      var ideasBeforeDelete = browser.elements('li').getText().length;

      browser.click('.delete-btn');
      browser.click('.delete-btn');

      var ideasAfterDelete = browser.elements('li').getText().length;

      assert.equal(ideasAfterDelete, ideasBeforeDelete-2);
    });

    it('should display all ideas when show more button is clicked', function() {
      browser.url('/');
      var ideaTitle = browser.element(".title-input");
      var ideaDescription = browser.element(".body-input");

      ideaTitle.setValue('great title');
      ideaDescription.setValue('great description');

      browser.click('.save-btn');
      browser.click('.save-btn');
      browser.click('.save-btn');
      browser.click('.save-btn');
      browser.click('.save-btn');
      browser.click('.save-btn');
      browser.click('.save-btn');
      browser.click('.save-btn');
      browser.click('.save-btn');
      browser.click('.save-btn');
      browser.click('.save-btn');
      browser.click('.save-btn');

      var ideasBeforeRefresh = browser.elements('li').getText().length;

      browser.refresh();
      browser.click('.show-more');

      var ideasAfterMoreClicked = browser.elements('li').getText().length;

      assert.equal(ideasBeforeRefresh, ideasAfterMoreClicked);
     });

    it.skip('should mark an idea as completed with completed button clicked', function(){
      browser.url('/');
      var ideaTitle = browser.element('.title-input');
      var ideaDescription = browser.element('.body-input');
      var ideaList = browser.element('.idea-list');

      ideaTitle.setValue('great title');
      ideaDescription.setValue('great description');

      browser.click('.save-btn');
      browser.click('.completed-btn');

      var afterCompletion = browser.elements('.complete');
      assert.equal(idea, afterCompletion);
    });

    it.skip('should hide completed ideas after refresh', function() {
      browser.url('/');
      var ideaTitle = browser.element('.title-input');
      var ideaDescription = browser.element('.body-input');
      var ideaList = browser.element('.idea-list');

      ideaTitle.setValue('great title');
      ideaDescription.setValue('great description');

      browser.click('.save-btn');
      browser.click('.completed-btn');

      browser.refresh();
      var completedIdea = browser.element('.complete');
      var completedIdeaDisplay = completedIdea.getAttribute("display");
      assert.equal(completedIdea, null);
    });

  //   it.skip('should filter the ideas when entering text in search box', function(){
  //
  //   });

  //   it.skip('should filter level of importance when level of importance buttons are clicked', function() {
  //
  //   });
  //
  //   it.skip('should show completed tasks when user clicks show-completed button', function() {
  //
  //   it.skip('should disable the save-btn when the input fields are empty or have over 120 characters', function() {
  //
  //   });
  //   it.skip('should keep a character count for title and body input fields', function() {
  //
  //   });
  // });
});
