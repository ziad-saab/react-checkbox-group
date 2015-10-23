/**
* @jsx React.DOM
*/
'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
  displayName: 'CheckboxGroup',
  getInitialState: function getInitialState() {
    return { defaultValue: this.props.defaultValue || [] };
  },

  componentDidMount: function componentDidMount() {
    this.setCheckboxNames();
    this.setCheckedBoxes();
  },

  componentDidUpdate: function componentDidUpdate() {
    this.setCheckboxNames();
    this.setCheckedBoxes();
  },

  render: function render() {
    var _props = this.props;
    var name = _props.name;
    var value = _props.value;
    var defaultValue = _props.defaultValue;

    var otherProps = _objectWithoutProperties(_props, ['name', 'value', 'defaultValue']);

    return React.createElement(
      'div',
      otherProps,
      this.props.children
    );
  },

  setCheckboxNames: function setCheckboxNames() {
    // stay DRY and don't put the same `name` on all checkboxes manually. Put it on
    // the tag and it'll be done here
    var $checkboxes = this.getCheckboxes();
    for (var i = 0, _length = $checkboxes.length; i < _length; i++) {
      $checkboxes[i].setAttribute('name', this.props.name);
    }
  },

  getCheckboxes: function getCheckboxes() {
    return ReactDOM.findDOMNode(this).querySelectorAll('input[type="checkbox"]');
  },

  setCheckedBoxes: function setCheckedBoxes() {
    var $checkboxes = this.getCheckboxes();
    // if `value` is passed from parent, always use that value. This is similar
    // to React's controlled component. If `defaultValue` is used instead,
    // subsequent updates to defaultValue are ignored. Note: when `defaultValue`
    // and `value` are both passed, the latter takes precedence, just like in
    // a controlled component
    var destinationValue = this.props.value != null ? this.props.value : this.state.defaultValue;

    for (var i = 0, _length2 = $checkboxes.length; i < _length2; i++) {
      var $checkbox = $checkboxes[i];

      // intentionally use implicit conversion for those who accidentally used,
      // say, `valueToChange` of 1 (integer) to compare it with `value` of "1"
      // (auto conversion to valid html value from React)
      if (destinationValue.indexOf($checkbox.value) >= 0) {
        $checkbox.checked = true;
      }
    }
  },

  getCheckedValues: function getCheckedValues() {
    var $checkboxes = this.getCheckboxes();

    var checked = [];
    for (var i = 0, _length3 = $checkboxes.length; i < _length3; i++) {
      if ($checkboxes[i].checked) {
        checked.push($checkboxes[i].value);
      }
    }

    return checked;
  }
});
