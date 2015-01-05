var React = require('react');
var ReactPropTypes = React.PropTypes;

var CommentTextInput = React.createClass({

  propTypes: {
    onSave: ReactPropTypes.func.isRequired,
    value: ReactPropTypes.string
  },

  getInitialState: function() {
    return {
      value: this.props.value || '',
      name: ''
    };
  },

  render: function() {
    return (
      <div className="comment-ti">
        <input onChange={this._onNameChange} value={this.state.name} className="c-input" placeholder="Name"/>
        <textarea onChange={this._onChange} value={this.state.value} className="c-text" placeholder="Post your comment here.."/>
        <button className="comment" onClick={ this._save }>Comment</button>
      </div>
    );
  },

  _save: function() {
    this.props.onSave(this.state.value, this.state.name, this.props.articleId);
    this.setState({
      value: '',
      name: ''
    });
  },

  _onChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },

   _onNameChange: function(event) {
    this.setState({
      name: event.target.value
    });
  }

});

module.exports = CommentTextInput;