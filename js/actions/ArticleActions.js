var AppDispatcher = require('../dispatcher/AppDispatcher');
var ArticleConstants = require('../constants/ArticleConstants');

var ArticleActions = {

  create: function(text, author) {
    AppDispatcher.handleViewAction({
      actionType: ArticleConstants.CREATE,
      author: author,
      text: text
    });
  }
}

module.exports = ArticleActions;
