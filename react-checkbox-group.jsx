/**
* @jsx React.DOM
*/
var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
  displayName: 'CheckboxGroup',
  getInitialState: function() {
    return {defaultValue: this.props.defaultValue || []};
  },

  componentDidMount: function() {
    this.setCheckboxNames();
    this.setCheckedBoxes();
  },

  componentDidUpdate: function() {
    this.setCheckboxNames();
    this.setCheckedBoxes();
  },

  render: function() {
    let {name, value, defaultValue, ...otherProps} = this.props;
    return (
      <div {...otherProps}>
        {this.props.children}
      </div>
    );
  },

  setCheckboxNames: function() {
    // stay DRY and don't put the same `name` on all checkboxes manually. Put it on
    // the tag and it'll be done here
    let $checkboxes = this.getCheckboxes();
    for (let i = 0, length = $checkboxes.length; i < length; i++) {
      $checkboxes[i].setAttribute('name', this.props.name);
    }
  },

  getCheckboxes: function() {
    return ReactDOM.findDOMNode(this).querySelectorAll('input[type="checkbox"]');
  },

  setCheckedBoxes: function() {
    let $checkboxes = this.getCheckboxes();
    // if `value` is passed from parent, always use that value. This is similar
    // to React's controlled component. If `defaultValue` is used instead,
    // subsequent updates to defaultValue are ignored. Note: when `defaultValue`
    // and `value` are both passed, the latter takes precedence, just like in
    // a controlled component
    let destinationValue = this.props.value != null
      ? this.props.value
      : this.state.defaultValue;

    for (let i = 0, length = $checkboxes.length; i < length; i++) {
      let $checkbox = $checkboxes[i];

      // intentionally use implicit conversion for those who accidentally used,
      // say, `valueToChange` of 1 (integer) to compare it with `value` of "1"
      // (auto conversion to valid html value from React)
      if (destinationValue.indexOf($checkbox.value) >= 0) {
        $checkbox.checked = true;
      }
    }
  },

  getCheckedValues: function() {
    let $checkboxes = this.getCheckboxes();

    let checked = [];
    for (let i = 0, length = $checkboxes.length; i < length; i++) {
      if ($checkboxes[i].checked) {
        checked.push($checkboxes[i].value);
      }
    }

    return checked;
  }
});
