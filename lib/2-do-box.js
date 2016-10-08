var $ = require('jquery');
var Idea = require('./idea');
var domObject = require('./domObject');

var ideaList = domObject.getLocalStorage() || [];

$(document).ready(function() {
  domObject.renderIdeaListToPage(ideaList);
  $('.complete').hide();
  domObject.showFirstTen(ideaList);
});

$('.title-input').on('click', function() {
  domObject.clearField($('.title-input'));
  domObject.checkInputs();
});

$('.body-input').on('click', function() {
  domObject.clearField($('.body-input'));
  domObject.checkInputs();
});

$('.title-input').on('keyup', function() {
  domObject.checkInputs();
});

$('.body-input').on('keyup', function() {
  domObject.checkInputs();
});

$('.date-input').on('focusout', function() {
  checkDate();
});

$('.save-btn').on('click', function() {

  domObject.makeIdeaList($('.title-input').val(), $('.body-input').val(), $('.date-input').val(),ideaList);
  domObject.checkDatePast($('.date-input').val(), ideaList);
  domObject.clearField($('.title-input'));
  domObject.clearField($('.body-input'));
  domObject.checkInputs();
  domObject.showFirstTen(ideaList);
});

$('.idea-list').on('click', '.completed-btn',  function() {
  domObject.addCompleteClass.bind(this)();
  var id = $(this).parents('.idea').attr('id');
  domObject.editElement(id, "completion", "complete", ideaList);
});

$('.idea-list').on('click', '.up-btn',  function() {
  domObject.qualityChange.bind(this)(domObject.upQualities, ideaList);
});

$('.idea-list').on('click', '.down-btn', function() {
  domObject.qualityChange.bind(this)(domObject.downQualities, ideaList);
});

$('.idea-list').on('focusout', '.edit-title', function() {
  domObject.editTextField.bind(this)("title", ideaList);
});

$('.idea-list').on('focusout', '.edit-body', function() {
  domObject.editTextField.bind(this)("body", ideaList);
});

$('.idea-list').keypress(function(event) {
  domObject.submitOnEnter('.edit-content');
});

$('.show-completed').on('click', function() {

  $('.complete').show();
  domObject.clearPage();
  domObject.sortIdeas(ideaList);
  domObject.renderIdeaListToPage(ideaList);
  domObject.showFirstTen(ideaList);
});

$('.critical-filter').on('click', function() {
  domObject.filterByImportance(".critical", ideaList);
});

$('.high-filter').on('click', function() {
  domObject.filterByImportance(".high", ideaList);
});

$('.normal-filter').on('click', function() {
  domObject.filterByImportance(".normal", ideaList);
});

$('.low-filter').on('click', function() {
  domObject.filterByImportance(".low", ideaList);
});

$('.none-filter').on('click', function() {
  domObject.filterByImportance(".none", ideaList);
});


$('.search-input').on('click', function() {
  domObject.clearField($('.search-input'));
});

$('.idea-list').on('click', '.delete-btn', function() {
  var id = $(this).closest('li').attr('id');
  $(this).closest('li').remove();
  ideaList = domObject.removeIdea(id, ideaList);
  domObject.stringifyForLocalStorage(ideaList);
});

$('.show-more').on('click', function() {
    domObject.displayAllIdeas(ideaList);
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

function dateIsValid (){
  $('.save-btn').attr('disabled', false);
  $('.date-error-message').text('');
}

function dateIsNotValid (){
  $('.save-btn').attr('disabled', true);
  $('.date-error-message').text("Date is not valid");
  return false;
}

function checkDate(){
    re = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    if($('.date-input').val() === '') {
      return false;
      }
    if($('.date-input').val().match(re)) {
      dateIsValid();
      } else {
      dateIsNotValid();
        }
    if(($('.date-input').val().substring(0,1) <= 1) && ($('.date-input').val().substring(1,2) <= 9)) {
      dateIsValid();
    } else {
      dateIsNotValid();
    }
    if(($('.date-input').val().substring(3,5) <= 31) && ($('.date-input').val().substring(3,5) >= 1)) {
      dateIsValid();
    } else {
      dateIsNotValid();
    }
    if(($('.date-input').val().substring(6,10) >= 2015) && ($('.date-input').val().substring(6,10) <= 2999)) {
      dateIsValid();
    } else {
      dateIsNotValid();
}
}


// checkDatePast: function(date) {
//    var EnteredDate = $('.date-input').val();
//    var month = (EnteredDate.substring(0, 2)) - 1;
//    var day = EnteredDate.substring(3, 5);
//    var year = EnteredDate.substring(6, 10);
//    var inputDate = new Date(year, month, day);
//    var today = new Date();
//    if (inputDate < today) {
//      debugger
//      domObject.addCompleteClass.bind(this)();
//      var id = $(this).parents('.idea').attr('id');
//      domObject.editElement(id, "completion", "complete", ideaList);
//      }
//  }
