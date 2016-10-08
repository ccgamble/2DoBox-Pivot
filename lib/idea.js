var $ = require("jquery");


function Idea(title, body, date){
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = 'none';
  this.completion = 'new';
  this.date = date || 'none';
}

module.exports = Idea;
