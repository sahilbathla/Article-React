var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ArticleConstants = require('../constants/ArticleConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _articles = {};

if (!localStorage.articles) {
  localStorage.setItem('articles', JSON.stringify({}))
}
_articles = JSON.parse(localStorage.articles);



function create(text, author) {
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _articles[id] = {
    author: author,
    text: text
  };

  articlesJSON = JSON.parse(localStorage.articles);
  articlesJSON[id]= _articles[id];
  localStorage.articles = JSON.stringify(articlesJSON);
}


var ArticleStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return _articles;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register to handle all updates
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text, author;

  switch(action.actionType) {
    case ArticleConstants.CREATE:
      text = action.text.trim();
      author = action.author.trim();
      if (text !== '' && author !== '') {
        create(text, author);
      }
      break;

    default:
      return true;
  }

  ArticleStore.emitChange();

  return true;
});

module.exports = ArticleStore;
