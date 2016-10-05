var $ = require("jquery");

$(document).ready(function() {
  $('.complete').hide();
});

$('.show-completed').on('click', function() {
  $('.complete').show();
});

var storage = getLocalStorage() || [];
renderLocalStorageToPage();


$('.save-btn').on('click', function() {
  var $title = $('.title-input').val();
  var $body = $('.body-input').val();
  makeIdeaList($title, $body);
  clearField($('.title-input'));
  clearField($('.body-input'));
});


function clearField(element) {
  if (element.val !== "") {
    element.val('');
  }
}

$('.title-input').on('click', function() {
  clearField($('.title-input'));
});

$('.body-input').on('click', function() {
  clearField($('.body-input'));
});

function renderLocalStorageToPage() {
  storage.forEach(function(idea) {
    appendIdea(idea);
  });
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('list'));
}

function Idea(title, body){
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = 'swill';
  this.completion = 'new';
}

function appendIdea(idea) {
  return $('.idea-list').prepend(`
      <li class="idea" class= ${idea.completion} id= ${idea.id}>
        <div class='first-line'>
          <span contenteditable class="title edit-title edit-content search">${idea.title}</span>
          <button type="button" class="delete-btn">Delete</button>
        </div>
        <span contenteditable class="body edit-body edit-content search">${idea.body}</span>
        <div class='third-line'>
          <button type="button" class="up-btn">Up</button>
          <button type="button" class="down-btn">Down</button>
          <span>quality: <span class="quality">${idea.quality}</span></span>
          <button type="button" class="completed-btn">Completed</button>
        </div>
      </li>
  `);
}

function makeIdeaList(title, body) {
  var idea = new Idea(title, body);
  storage.push(idea);
  localStorage.setItem('list', JSON.stringify(storage));
  appendIdea(idea);
}

function changeQuality(id, newQuality, idea) {
  id = parseInt(id);
  var idea = this.findIdeaById(id);
  idea.quality = newQuality;
  localStorage.setItem('list', JSON.stringify(storage));
}

function changeComplete(id, complete, idea) {
  id = parseInt(id);
  var idea = this.findIdeaById(id);
  idea.completion = complete;
  localStorage.setItem('list', JSON.stringify(storage));
}

var upQualities = {
    'swill': 'plausible',
    'plausible': 'genius',
    'genius' : 'genius'
};

$('.idea-list').on('click', '.completed-btn',  function() {

    $(this).parent().parent().addClass('complete');
    var id = $(this).parents('.idea').attr('id'); //bind this
    changeComplete(id);
});

$('.idea-list').on('click', '.up-btn',  function() {
    var $quality = $(this).siblings('span').children();
    var newQuality = upQualities[$quality.text()];
    $quality.text(newQuality);
    var id = $(this).parents('.idea').attr('id');
    changeQuality(id, newQuality);
});

var downQualities = {
  'genius': 'plausible',
  'plausible': 'swill',
  'swill' : 'swill'
};

$('.idea-list').on('click', '.down-btn', function() {
    var $quality = $(this).siblings('span').children();
    var newQuality = downQualities[$quality.text()];
    $quality.text(newQuality);
    var id = $(this).parents('.idea').attr('id');
    changeQuality(id, newQuality);
});

function findIdeaById(id) {
  return this.storage.find(function(idea) {
    return idea.id === id;
  });
}

function editTitle(id, newTitle, idea) {
  id = parseInt(id);
  var idea = this.findIdeaById(id);
  idea.title = newTitle;
  localStorage.setItem('list', JSON.stringify(storage));
}

$('.idea-list').on('focusout', '.edit-title', function() {
  var id = $(this).parents('.idea').attr('id');
  var newTitle = $(this).text();
  editTitle(id, newTitle);
});

function editBody(id, newBody, idea) {
  id = parseInt(id);
  var idea = this.findIdeaById(id);
  idea.body = newBody;
  localStorage.setItem('list', JSON.stringify(storage));
}

$('.idea-list').on('focusout', '.edit-body', function() {
  var id = $(this).parents('.idea').attr('id');
  var newBody = $(this).text();
  editBody(id, newBody);
});

$('.idea-list').keypress(function(event) {
  if (event.which === 13) {
    $('.edit-content').prop('contenteditable', false);
    setTimeout(function() {
      $('.edit-content').prop('contenteditable', true);
    }, 10);
  }
});


$('.search-input').on('keyup', function(event) {
  event.preventDefault();
  var $searchBox = $(this).val().toLowerCase();
  var ideas = $('.idea-list').children();
  ideas.show();
  var nonSearchIdeas = ideas.filter(function() {
    var allIdeas = $(this).find('.search').text();
    var search = (allIdeas).toLowerCase();
    return !(search.includes($searchBox));
  });
  nonSearchIdeas.hide();
});

$('.search-input').on('click', function() {
  clearField($('.search-input'));
});

function removeIdea(id) {
    var id = parseInt(id);
    storage = storage.filter(function(idea) {
      return idea.id != id;
  });
}

$('.idea-list').on('click', '.delete-btn', function() {
  var id = $(this).parent().parent().attr('id');
  $(this).parent().parent().remove();
  removeIdea(id);
  localStorage.setItem('list', JSON.stringify(storage));
});
