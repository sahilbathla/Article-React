var React = require('react');
var CommentStore = require('../stores/CommentStore');
var CommentActions = require('../actions/CommentActions');
var CommentTextInput = require('./CommentTextInput.react');
var CommentList = require('./CommentList.react');

function getCommentsState() {
  return {
    allComments: CommentStore.getAll(),
  };
}

var CommentBox = React.createClass({

  getInitialState: function() {
    return getCommentsState();
  },

  componentDidMount: function() {
    CommentStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    CommentStore.removeChangeListener(this._onChange);
  },

  filterComments: function(comments, articleId) {
    var filteredComments = []
    for(var comment_id in comments) {
      var comment = comments[comment_id];
      if(comment.articleId == articleId) {
        filteredComments.push(comment)
      }
    }
    return filteredComments;
  },

  render: function() {
    var comments = this.filterComments(this.state.allComments, this.props.articleId)
    return (
      <div className="comment-box">
        <CommentList comments={ comments } />
        <CommentTextInput onSave={this._onSave} articleId={ this.props.articleId } />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getCommentsState());
  },

  _onSave: function(text, author, articleId) {
    CommentActions.create(text, author, articleId);
  }

});

module.exports = CommentBox;
