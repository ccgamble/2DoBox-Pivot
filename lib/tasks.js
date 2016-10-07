var $ = require('jquery');
var Idea = require('./idea');


function Tasks() {}

Tasks.prototype = {
  ideaList: Tasks.getLocalStorage() || [],

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

  renderIdeaListToPage: function() {
    this.ideaList.forEach(function(idea) {
    this.appendIdea(idea);
    });
  },

  getLocalStorage: function() {
    return JSON.parse(localStorage.getItem('list'));
  },

  findIdea: function(id) {
    return Tasks.ideaList.find(function(idea) {
       return idea.id === id;
   });
  },

  addCompleteClass: function() {
    var item = $(this).closest('li');
    item.addClass('complete');
  },

  clearField: function(element) {
    if (element.val !== "") {
      element.val('');
    }
  },

  appendIdea: function(idea) {
    return $('.idea-list').prepend(`
          <li class="idea ${idea.completion} ${idea.quality}"  id= ${idea.id}>
          <article class='first-line'>
            <span contenteditable class="title edit-title edit-content search" placeholder="Title">${idea.title}</span>
            <button type="button" class="delete-btn" aria-label="delete"></button>
          </article>
          <span contenteditable class="body edit-body edit-content search" placeholder="Body">${idea.body}</span>
          <article class='third-line'>
            <button type="button" class="up-btn" aria-label="increase-importance"></button>
            <button type="button" class="down-btn" aria-label="decrease-importance" ></button>
            <span>Importance: <span class="quality" >${idea.quality}</span></span>
            <button type="button" class="completed-btn" aria-label="complete">Completed</button>
          </article>
        </li>
    `);
  },

  removeIdeas: function(idea) {
    return $('.idea').remove();
  },

  makeIdeaList: function(title, body) {
    var idea = new Idea(title, body);
    Tasks.ideaList.push(idea);
    localStorage.setItem('list', JSON.stringify(ideaList));
    Tasks.appendIdea(idea);
  },

  removeIdea: function(id) {
    id = parseInt(id);
    ideaList = ideaList.filter(function(idea) {
      return idea.id != id;
    }); ///not sure this is used
  },

  changeQuality: function(id, newQuality) {
    id = parseInt(id);
    var idea = Tasks.findIdea(id);
    idea.quality = newQuality;
    localStorage.setItem('list', JSON.stringify(ideaList));
  },

  changeComplete: function(id) {
    id = parseInt(id);
    var idea = Tasks.findIdea(id);
    idea.completion = 'complete';
    localStorage.setItem('list', JSON.stringify(ideaList));
  },

  editTitle: function(id, newTitle) {
    id = parseInt(id);
    var idea = Tasks.findIdea(id);
    idea.title = newTitle;
    localStorage.setItem('list', JSON.stringify(ideaList));
  },

  editBody: function(id, newBody) {
    id = parseInt(id);
    var idea = Tasks.findIdea(id);
    idea.body = newBody;
    localStorage.setItem('list', JSON.stringify(ideaList));
  },

  sortIdeas: function() {
    Tasks.ideaList.sort(function(a, b) {
      var nameA = a.completion;
      var nameB = b.completion;
      if (nameA > nameB) {
        return -1;
      } if (nameA < nameB) {
        return 1;
      }
      return 0;
    });
    return (ideaList);
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
    $('.title-count').text($titleCC);
    $('.body-count').text($bodyCC);
  },

  showFirstTen: function() {
    if (Tasks.ideaList.length > 10) {
      var newIdeas = Tasks.arrayOfNewIdeas();
      var overTen = newIdeas.slice(0, (newIdeas.length - 10));

      var ideasOverTen = Tasks.mapIdeasForGivenArray(overTen);

      ideasOverTen.forEach(function(idea) {
          idea.style.display = "none";
        });
      $('.show-more').attr('disabled', false);
    }
  },

  arrayOfNewIdeas: function() {
    var array = Tasks.ideaList.filter(function(idea) {
    return idea.completion === "new";
    });
    return array;
  },

  mapIdeasForGivenArray: function(array) {
    var mappedArray = array.map(function(idea) {
      var id = idea.id;
      return document.getElementById(id);
    });
    return mappedArray;
  }
};
