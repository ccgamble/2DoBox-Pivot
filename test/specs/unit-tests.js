const assert =  require('assert');
const domObject = require('../../lib/domObject');

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
      assert.equal(result.length, 2)
      assert.equal(result, )
    })
  })

});
