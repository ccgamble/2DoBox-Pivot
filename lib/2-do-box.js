var $ = require("jquery");

$(document).ready(function() {
  showFirstTen();
  $('.complete').hide();
});

var ideaList = getLocalStorage() || [];
renderIdeaListToPage();

var upQualities = {
  //TODO-may be a place to refactor, feels clean but have heard could be changed
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

function Idea(title, body){
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = 'none';
  this.completion = 'new';
}

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

function appendIdea(idea) {
  return $('.idea-list').prepend(`
        <li class="idea ${idea.completion} ${idea.quality}"  id= ${idea.id}>
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

function removeIdeas(idea) {
  return $('.idea').remove();
}

function makeIdeaList(title, body) {
  var idea = new Idea(title, body);
  ideaList.push(idea);
  localStorage.setItem('list', JSON.stringify(ideaList));
  appendIdea(idea);
}

function removeIdea(id) {
    id = parseInt(id);
    ideaList = ideaList.filter(function(idea) {
      return idea.id != id;
  });
}

function changeQuality(id, newQuality) {
  id = parseInt(id);
  var idea = findIdea(id);
  idea.quality = newQuality;
  localStorage.setItem('list', JSON.stringify(ideaList)); //TODO: refactor this out to it's own function?
}

function changeComplete(id) {
  id = parseInt(id);
  var idea = findIdea(id);
  idea.completion = 'complete';
  localStorage.setItem('list', JSON.stringify(ideaList));
}

function editTitle(id, newTitle) {
  id = parseInt(id);
  var idea = findIdea(id);
  idea.title = newTitle;
  localStorage.setItem('list', JSON.stringify(ideaList));
}

function editBody(id, newBody) {
  id = parseInt(id);
  var idea = findIdea(id);
  idea.body = newBody;
  localStorage.setItem('list', JSON.stringify(ideaList));
}

function sortIdeas() {
  ideaList.sort(function(a, b) {
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
  $('.title-count').text($titleCC);
  $('.body-count').text($bodyCC);
}

function showFirstTen() {
if (ideaList.length > 10) {

  var overTen = ideaList.slice(0, (ideaList.length - 10));
  var ideasOverTen = mapIdeasForGivenArray(overTen);

  ideasOverTen.forEach(function(idea) {
      idea.style.display = "none";
    });
  $('.show-more').attr('disabled', false);
  }
}

function mapIdeasForGivenArray(array) {
  var mappedArray = array.map(function(idea) {
    var id = idea.id;
    return document.getElementById(id);
});
  return mappedArray;
}

$('.title-input').on('click', function() {
  clearField($('.title-input'));
  checkInputs();
});

$('.body-input').on('click', function() {
  clearField($('.body-input'));
  checkInputs();
});  //TODO: very repetitive

$('.title-input').on('keyup', function() {
  checkInputs();
});

$('.body-input').on('keyup', function() {
  checkInputs();
});

$('.save-btn').on('click', function() {
  var $title = $('.title-input').val();
  var $body = $('.body-input').val();
  makeIdeaList($title, $body);
  clearField($('.title-input'));
  clearField($('.body-input'));
  checkInputs();
  showFirstTen();
});

$('.idea-list').on('click', '.completed-btn',  function() {
    addCompleteClass.bind(this)();
    var id = $(this).parents('.idea').attr('id');
    changeComplete(id);
});

$('.idea-list').on('click', '.up-btn',  function() {
    var $quality = $(this).siblings('span').children();
    //TODO: reads confusing
    var newQuality = upQualities[$quality.text()];
    $quality.text(newQuality);
    var id = $(this).parents('.idea').attr('id');
    changeQuality(id, newQuality);
});

$('.idea-list').on('click', '.down-btn', function() {
    var $quality = $(this).siblings('span').children();
    var newQuality = downQualities[$quality.text()];
    $quality.text(newQuality);
    var id = $(this).parents('.idea').attr('id');  //TODO: this variable is repeated
    changeQuality(id, newQuality);
});

$('.idea-list').on('focusout', '.edit-title', function() {
  var id = $(this).parents('.idea').attr('id');
  var newTitle = $(this).text();
  editTitle(id, newTitle);
});

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

$('.show-completed').on('click', function() {
  $('.complete').show();
  removeIdeas();
  sortIdeas();
  renderIdeaListToPage();
  showFirstTen();
});

$('.critical-filter').on('click', function() {
  removeIdeas();
  renderIdeaListToPage();
  $(".critical").show();
  $(".none, .low, .normal, .high").hide();
});

$('.high-filter').on('click', function() {
  removeIdeas();
  renderIdeaListToPage();
  $(".high").show();
  $(".none, .low, .normal, .critical").hide();
});

$('.normal-filter').on('click', function() {
  removeIdeas();
  renderIdeaListToPage();
  $(".normal").show();
  $(".none, .low, .high, .critical").hide();
});

$('.low-filter').on('click', function() {
  removeIdeas();
  renderIdeaListToPage();
  $(".low").show();
  $(".none, .normal, .high, .critical").hide();
});

$('.none-filter').on('click', function() {
  removeIdeas();
  renderIdeaListToPage();
  $(".none").show();
  $(".low, .normal, .high, .critical").hide();
});

$('.search-input').on('keyup', function(event) {  //TODO: very long, make less complicated
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

$('.idea-list').on('click', '.delete-btn', function() {
  var id = $(this).closest('li').attr('id');
  $(this).closest('li').remove();
  removeIdea(id);
  localStorage.setItem('list', JSON.stringify(ideaList));
});


$('.show-more').on('click', function() {
    allIdeas = mapIdeasForGivenArray(ideaList);
    allIdeas.forEach(function(idea) {
      idea.style.display = "block";
    });
    $('.complete').hide();
    $('.show-more').attr('disabled', true);
});
