'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

function checkbox(name, checkedValues, onChange) {
  return function Checkbox(props) {
    var checked = checkedValues.indexOf(props.value) >= 0;
    onChange = onChange.bind(null, props.value);

    return React.createElement('input', _extends({}, props, {
      type: 'checkbox',
      name: name,
      checked: checked,
      onChange: onChange
    }));
  };
}

module.exports = React.createClass({
  displayName: 'CheckboxGroup',
  getInitialState: function getInitialState() {
    return {
      value: this.props.value || this.props.defaultValue || [],
      firstRender: true // for defaultValue
    };
  },
  isControlledComponent: function isControlledComponent() {
    return !!this.props.value;
  },
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    if (newProps.value) {
      this.setState({ value: newProps.value });
    }
  },

  componentDidMount: function componentDidMount() {
    // TODO: this seems wrong, is there a better way??
    this.setState({
      firstRender: false
    });
  },
  onCheckboxChange: function onCheckboxChange(checkboxValue, event) {
    var newValue;
    if (event.target.checked) {
      newValue = this.state.value.concat(checkboxValue);
    } else {
      newValue = this.state.value.filter(function (v) {
        return v !== checkboxValue;
      });
    }

    if (!this.isControlledComponent()) {
      this.setState({ value: newValue });
    } else {
      this.setState({ value: this.props.value });
    }

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(newValue);
    }
  },
  getValue: function getValue() {
    return this.state.value;
  },
  render: function render() {
    var _props = this.props;
    var name = _props.name;
    var value = _props.value;
    var children = _props.children;


    var checkedValues;
    if (!this.isControlledComponent()) {
      checkedValues = this.state.value;
    } else {
      checkedValues = value;
    }

    var renderedChildren = children(checkbox(name, checkedValues, this.onCheckboxChange));
    return renderedChildren && React.Children.only(renderedChildren);
  }
});
