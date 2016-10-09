var $ = require('jquery');

function Idea({title, body, date, id, quality, completion}){
  this.title = title;
  this.body = body;
  this.date = date;
  this.id = id || Date.now();
  this.quality = quality || 'none';
  this.completion = completion || 'new';
}

Idea.prototype.appendIdea = function() {
  return $('.idea-list').prepend(`
        <li class="idea ${this.completion} ${this.quality}"  id= ${this.id}>
        <article class='first-line'>
          <span contenteditable class="title edit-title edit-content search" placeholder="Title">${this.title}</span>
              <button type="button" class="completed-btn" aria-label="complete"></button>
              <button type="button" class="delete-btn" aria-label="delete"></button>
        </article>
        <span contenteditable class="body edit-body edit-content search" placeholder="Body">${this.body}</span>
        <span contenteditable class="date" placeholder="Due Date"><span>Due Date: </span>${this.date}</span>
        <article class='third-line'>
          <button type="button" class="up-btn" aria-label="increase-importance"></button>
          <button type="button" class="down-btn" aria-label="decrease-importance" ></button>
          <span>Importance: <span class="quality" >${this.quality}</span></span>
        </article>
      </li>
  `);
};



module.exports = Idea;
