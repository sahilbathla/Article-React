var AppDispatcher = require('../dispatcher/AppDispatcher');
var CommentConstants = require('../constants/CommentConstants');

var CommentActions = {

  create: function(text, author, articleId) {
    AppDispatcher.handleViewAction({
      actionType: CommentConstants.CREATE_COMMENT,
      author: author,
      text: text,
      articleId: articleId
    });
  }
}

module.exports = CommentActions;
