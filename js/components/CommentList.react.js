var React = require('react');

var CommentList = React.createClass({

  render: function() {
    var allComments = this.props.comments;
    var comments = [];
    for (comment in allComments) {
      comments.push(
        <li>
          <div className="cmmnt"><p>-by {allComments[comment].author}</p><p>{allComments[comment].text}</p></div>
        </li>
      );
    }

    return (
      <ul className="comment-list"><p>Comments</p>{comments}</ul>
    );
  }
});

module.exports = CommentList;
