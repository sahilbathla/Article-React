var React = require('react');
var CommentBox = require('./CommentBox.react');

var ArticleList = React.createClass({

  render: function() {
    var allArticles = this.props.articles;
    var articles = [];
    for (article_id in allArticles) {
      articles.push(
        <li>
          <div><b>- Article By</b> {allArticles[article_id].author}</div> 
          <div className="article-box">{allArticles[article_id].text}</div>
          <CommentBox articleId={ article_id }/>
        </li>
      );
    }

    return (
      <ul className="articles">{articles}</ul>
    );
  }
});

module.exports = ArticleList;
