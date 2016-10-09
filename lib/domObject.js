var $ = require('jquery');
var Idea = require('./idea');

var domObject = {

  upQualities: {
    'none': 'low',
    'low': 'normal',
    'normal' : 'high',
    'high' : 'critical',
    'critical' : 'critical'
  },

  downQualities: {
    'critical': 'high',
    'high': 'normal',
    'normal' : 'low',
    'low' : 'none',
    'none' : 'none'
  },

  findIdea: function(id, ideaList) {
   return ideaList.find(function(idea) {
      return idea.id === id;
    });
  },

  removeIdea: function(id, ideaList) {
    id = parseInt(id);
    return ideaList.filter(function(idea) {
        return idea.id != id;
    });
  },

  clearPage: function(idea) {
    return $('.idea').remove();
  },

  clearField: function(element) {
    if (element.val() !== "") {
      element.val('');
    }
  },

  filterByImportance: function(importance, ideaList) {
    this.clearPage();
    this.renderIdeaListToPage(ideaList);
    $(".none, .low, .normal, .high, .critical").hide();
    $(importance).show();
  },

  renderIdeaListToPage: function(ideaList) {
    ideaList.forEach(function(item) {
      var idea = new Idea(item);
      idea.appendIdea();
    });
  },

  displayAllIdeas: function(ideaList) {
    allIdeas = this.mapIdeasForGivenArray(ideaList);
    allIdeas.forEach(function(idea) {
      idea.style.display = "block";
    });
  },

  mapIdeasForGivenArray: function(array) {
    var mappedArray = array.map(function(idea) {
      var id = idea.id;
      return document.getElementById(id);
    });
    return mappedArray;
  },

  submitOnEnter: function(field) {
    if (event.which === 13) {
      $(field).prop('contenteditable', false);
      setTimeout(function() {
        $(field).prop('contenteditable', true);
      }, 10);
    }
  },

  displayCharacterCount: function() {
    $('.title-count').text($('.title-input').val().length);
    $('.body-count').text($('.body-input').val().length);
  },

  sortIdeas: function(ideaList) {
    ideaList.sort(function(a, b) {
      if (a.completion > b.completion) {
        return -1;
      } else { return 1; }
    });
    return (ideaList);
  },

  arrayOfNewIdeas: function(ideaList) {
    var array = ideaList.filter(function(idea) {
    return idea.completion === "new";
    });
    return array;
  },

  showFirstTen: function(ideaList) {
    if (ideaList.length > 10) {
      var newIdeas = this.arrayOfNewIdeas(ideaList);
      var overTen = newIdeas.slice(0, (newIdeas.length - 10));
      this.hideIdeasOverTen(this.mapIdeasForGivenArray(overTen));
    }
  },

  hideIdeasOverTen: function(ideasOverTen) {
    ideasOverTen.forEach(function(idea) {
        idea.style.display = "none";
      });
    $('.show-more').attr('disabled', false);
  },

  checkInputs: function() {
    var $titleCC = $('.title-input').val().length;
    var $bodyCC = $('.body-input').val().length;

    if ($titleCC !== 0 && $bodyCC !== 0) {
      $('.save-btn').attr('disabled', false);
    }
    if ($titleCC === 0 || $bodyCC === 0) {
      $('.save-btn').attr('disabled', true);
    }
    if ($titleCC > 120 || $bodyCC > 120) {
      $('.save-btn').attr('disabled', true);
    }
    this.displayCharacterCount();
  },

  addCompleteClass: function() {
    var item = $(this).closest('li');
    item.addClass('complete');
  },

  getLocalStorage: function() {
    return JSON.parse(localStorage.getItem('list'));
  },

  stringifyForLocalStorage: function(ideaList) {
    localStorage.setItem('list', JSON.stringify(ideaList));
  },

  editElement: function(id, input, value, ideaList) {
    id = parseInt(id);
    var idea = this.findIdea(id, ideaList);
    idea[input] = value;
    this.stringifyForLocalStorage(ideaList);
  },

  editTextField: function(field, ideaList) {
    var id = $(this).parents('.idea').attr('id');
    var newText = $(this).text();
    domObject.editElement(id, field, newText, ideaList);
  },

  makeIdeaList: function(title, body, date, ideaList) {
    var item = {title: title, body: body, date:date};
    var idea = new Idea(item);
    ideaList.push(idea);
    this.stringifyForLocalStorage(ideaList);
    idea.appendIdea();
    },

  qualityChange: function(directionQualities, ideaList) {
    var $quality = $(this).siblings('span').children();
    var newQuality = directionQualities[$quality.text()];
    $quality.text(newQuality);
    var id = $(this).parents('.idea').attr('id');
    domObject.editElement(id, "quality", newQuality, ideaList);
  },

  checkDatePast: function(date) {
     var month = (date.substring(0, 2)) - 1;
     var day = date.substring(3, 5);
     var year = date.substring(6, 10);
     var inputDate = new Date(year, month, day);
     var today = new Date();
     if (inputDate < today) {
       domObject.addCompleteClass();
       var id = $(this).parents('.idea').attr('id');
       domObject.editElement(id, "completion", "complete", ideaList);
       }
  }
};

module.exports = domObject;
