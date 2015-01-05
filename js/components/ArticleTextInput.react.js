var React = require('react');
var ReactPropTypes = React.PropTypes;

var ArticleTextInput = React.createClass({

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
      <div className="post-article">
        <p>Post your article!! </p>
        <input onChange={this._onNameChange} value={this.state.name} className="textfield" placeholder="Name"/>
        <textarea onChange={this._onChange} value={this.state.value} className="textarea"/>
        <button className="submit" onClick={ this._save }>Post</button>
      </div>
    );
  },

  _save: function() {
    this.props.onSave(this.state.value, this.state.name);
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

module.exports = ArticleTextInput;