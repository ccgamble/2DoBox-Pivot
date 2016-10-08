var $ = require('jquery');
var Idea = require('./idea');

$(document).ready(function() {
  renderIdeaListToPage();
  $('.complete').hide();
  showFirstTen();
});

var ideaList = getLocalStorage() || [];

var upQualities = {
  'none': 'low',
  'low': 'normal',
  'normal' : 'high',
  'high' : 'critical',
  'critical' : 'critical'
};

var downQualities = {
  'critical': 'high',
  'high': 'normal',
  'normal' : 'low',
  'low' : 'none',
  'none' : 'none'
};

function renderIdeaListToPage() {
  ideaList.forEach(function(idea) {
    appendIdea(idea);
  });
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('list'));
}

function findIdea(id) {
 return ideaList.find(function(idea) {
    return idea.id === id;
  });
}

function addCompleteClass() {
  var item = $(this).closest('li');
  item.addClass('complete');
}

function clearField(element) {
  if (element.val !== "") {
    element.val('');
  }
}

function clearPage(idea) {
  return $('.idea').remove();
}

function removeIdea(id) {
    id = parseInt(id);
    ideaList = ideaList.filter(function(idea) {
      return idea.id != id;
  });
}

function makeIdeaList(title, body, date) {
  var idea = new Idea(title, body, date);
  ideaList.push(idea);
  stringifyForLocalStorage();
  appendIdea(idea);
}

function stringifyForLocalStorage() {
  localStorage.setItem('list', JSON.stringify(ideaList));
}

function editElement(id, input, value) {
  id = parseInt(id);
  var idea = findIdea(id);
  idea[input] = value;
  stringifyForLocalStorage();
}

function editTextField(field) {
  var id = $(this).parents('.idea').attr('id');
  var newText = $(this).text();
  editElement(id, field, newText);
}

function sortIdeas() {
  ideaList.sort(function(a, b) {
    if (a.completion > b.completion) {
      return -1;
    } else { return 1; }
  });
  return (ideaList);
}

function checkInputs() {
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
  displayCharacterCount();
}

function displayCharacterCount() {
  $('.title-count').text($('.title-input').val().length);
  $('.body-count').text($('.body-input').val().length);
}

function showFirstTen() {
if (ideaList.length > 10) {
  var newIdeas = arrayOfNewIdeas();
  var overTen = newIdeas.slice(0, (newIdeas.length - 10));
  hideIdeasOverTen(mapIdeasForGivenArray(overTen));
}

function hideIdeasOverTen(ideasOverTen) {
  ideasOverTen.forEach(function(idea) {
      idea.style.display = "none";
    });
  $('.show-more').attr('disabled', false);
  }
}

function arrayOfNewIdeas() {
  var array = ideaList.filter(function(idea) {
  return idea.completion === "new";
  });
  return array;
}

function mapIdeasForGivenArray(array) {
  var mappedArray = array.map(function(idea) {
    var id = idea.id;
    return document.getElementById(id);
  });
  return mappedArray;
}

function qualityChange(directionQualities) {
  var $quality = $(this).siblings('span').children();
  var newQuality = directionQualities[$quality.text()];
  $quality.text(newQuality);
  var id = $(this).parents('.idea').attr('id');
  editElement(id, "quality", newQuality);
}

function displayAllIdeas() {
  allIdeas = mapIdeasForGivenArray(ideaList);
  allIdeas.forEach(function(idea) {
    idea.style.display = "block";
  });
}

function submitOnEnter(field) {
  if (event.which === 13) {
    $(field).prop('contenteditable', false);
    setTimeout(function() {
      $(field).prop('contenteditable', true);
    }, 10);
  }
}

function filterByImportance(importance) {
  clearPage();
  renderIdeaListToPage();
  $(".none, .low, .normal, .high, .critical").hide();
  $(importance).show();
}

function appendIdea(idea) {
  return $('.idea-list').prepend(`
        <li class="idea ${idea.completion} ${idea.quality}"  id= ${idea.id}>
        <article class='first-line'>
          <span contenteditable class="title edit-title edit-content search" placeholder="Title">${idea.title}</span>

          <button type="button" class="delete-btn" aria-label="delete"></button>
        </article>
        <span contenteditable class="body edit-body edit-content search" placeholder="Body">${idea.body}</span>
        <span>Due Date: <span class="due-date" >${idea.date}</span>
        <article class='third-line'>
          <button type="button" class="up-btn" aria-label="increase-importance"></button>
          <button type="button" class="down-btn" aria-label="decrease-importance" ></button>
          <span>Importance: <span class="quality" >${idea.quality}</span>
          <button type="button" class="completed-btn" aria-label="complete"></button>
        </article>
      </li>
  `);
}

$('.title-input').on('click', function() {
  clearField($('.title-input'));
  checkInputs();
});

$('.body-input').on('click', function() {
  clearField($('.body-input'));
  checkInputs();
});

$('.title-input').on('keyup', function() {
  checkInputs();
});

$('.body-input').on('keyup', function() {
  checkInputs();
});

$('.save-btn').on('click', function() {
  makeIdeaList($('.title-input').val(), $('.body-input').val(), $('.date-input').val());
  clearField($('.title-input'));
  clearField($('.body-input'));
  checkInputs();
  showFirstTen();
});

$('.idea-list').on('click', '.completed-btn',  function() {
    addCompleteClass.bind(this)();
    var id = $(this).parents('.idea').attr('id');
    editElement(id, "completion", "complete");
});

$('.idea-list').on('click', '.up-btn',  function() {
    qualityChange.bind(this)(upQualities);
});

$('.idea-list').on('click', '.down-btn', function() {
  qualityChange.bind(this)(downQualities);
});

$('.idea-list').on('focusout', '.edit-title', function() {
  editTextField.bind(this)("title");
});

$('.idea-list').on('focusout', '.edit-body', function() {
  editTextField.bind(this)("body");
});

$('.idea-list').keypress(function(event) {
  submitOnEnter('.edit-content');
});

$('.show-completed').on('click', function() {
  $('.complete').show();
  clearPage();
  sortIdeas();
  renderIdeaListToPage();
  showFirstTen();
});

$('.critical-filter').on('click', function() {
  filterByImportance(".critical");
});

$('.high-filter').on('click', function() {
  filterByImportance(".high");
});

$('.normal-filter').on('click', function() {
  filterByImportance(".normal");
});

$('.low-filter').on('click', function() {
  filterByImportance(".low");
});

$('.none-filter').on('click', function() {
  filterByImportance(".none");
});

$('.search-input').on('click', function() {
  clearField($('.search-input'));
});

$('.idea-list').on('click', '.delete-btn', function() {
  var id = $(this).closest('li').attr('id');
  $(this).closest('li').remove();
  removeIdea(id);
  stringifyForLocalStorage();
});

$('.show-more').on('click', function() {
    displayAllIdeas();
    $('.complete').hide();
    $('.show-more').attr('disabled', true);
});

$('.search-input').on('keyup', function(event) {  //TODO: Chelsea will refactor
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
