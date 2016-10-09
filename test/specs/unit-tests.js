const assert =  require('assert');
const domObject = require('../../lib/domObject');
const Idea = require('../../lib/idea')

describe('domObject', function () {
  context('findIdea', function() {
    it('should return object that matches id ', function () {
      var ideaList = [{id:1}, {name: 'Chelsea', id:2}, {id:3}];
      var result = domObject.findIdea(2, ideaList);
      assert.equal(result.name, 'Chelsea');
    });
  });

  context('removeIdea', function() {
    it('should remove idea with the given id', function() {
      var ideaList = [{id:1}, {name: 'Chelsea', id:2}, {id:3}];
      var result = domObject.removeIdea(2, ideaList);
      assert.equal(result.length, 2);
      assert.deepEqual(result, [{id:1}, {id:3}]);
    });
  });

  context('clearPage', function() {
    it('should clear the page of all ideas', function() {
      var ideaList = [{id:1}, {name: 'Chelsea', id:2}, {id:3}];
      var result = domObject.clearPage();
      assert.equal(result.length, 0);
    });
  });

  context('sort items', function() {
    it('should sort given items by classes', function() {
      var ideaList = [{id:1, completion: "new"}, {id:2, completion: "complete"}, {id:3, completion: "new"}];
      var result = domObject.sortIdeas(ideaList);
      assert.deepEqual(result, [ { id: 3, completion: 'new' }, { id: 1, completion: 'new' }, { id: 2, completion: 'complete' } ] );
    });
  });

  context('editElement', function() {
    it('should edit the given element', function() {
      var ideaList = [{id:1}, {name: 'Chelsea', id:2}, {id:3}];
      domObject.editElement(2, "name", "Christine", ideaList);
      assert.deepEqual(ideaList,  [ { id: 1 }, { name: 'Christine', id: 2 }, { id: 3 } ]);
    });
  });
  //
  // context('checkPastDate', function() {
  //   it('should compare given date to current date', function() {
  //     var ideaList = [{id: 1}, {id: 2}, {id: 3}];
  //     var idea = new Idea({date:"04/05/2015", id:4});
  //     domObject.checkPastDate("04/05/2015", 4, idea, ideaList);
  //     assert.deepEqual(ideaList[3], "");
  //
  //   });
  // });





});
