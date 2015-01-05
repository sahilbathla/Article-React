var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CommentConstants = require('../constants/CommentConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _comments = {};

if (!localStorage.comments) {
  localStorage.setItem('comments', JSON.stringify({}))
}

_comments = JSON.parse(localStorage.comments);

function create_comment(text, author, articleId) {
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _comments[id] = {
    author: author,
    text: text,
    articleId: articleId
  };

  commentsJSON = JSON.parse(localStorage.comments);
  commentsJSON[id]= _comments[id];
  localStorage.comments = JSON.stringify(commentsJSON);
}


var CommentStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return _comments;
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
  var text, author, articleId;

  switch(action.actionType) {
    case CommentConstants.CREATE_COMMENT:
      text = action.text.trim();
      author = action.author.trim();
      articleId = action.articleId;

      if (text !== '') {
        create_comment(text, author, articleId);
      }
      break;

    default:
      return true;
  }

  CommentStore.emitChange();

  return true;
});

module.exports = CommentStore;
