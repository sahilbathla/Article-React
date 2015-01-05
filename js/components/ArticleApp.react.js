var React = require('react');
var ArticleStore = require('../stores/ArticleStore');
var ArticleActions = require('../actions/ArticleActions');
var ArticleTextInput = require('./ArticleTextInput.react');
var ArticleList = require('./ArticleList.react');

function getArticlesState() {
  return {
    allArticles: ArticleStore.getAll(),
  };
}

var ArticleApp = React.createClass({

  getInitialState: function() {
    return getArticlesState();
  },

  componentDidMount: function() {
    ArticleStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ArticleStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <ArticleList articles={this.state.allArticles}/>
        <ArticleTextInput onSave={this._onSave} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getArticlesState());
  },

  _onSave: function(text, author) {
    ArticleActions.create(text, author);
  }

});

module.exports = ArticleApp;
