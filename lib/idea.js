var $ = require("jquery");


function Idea(title, body){
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = 'none';
  this.completion = 'new';
}




module.exports = Idea;
