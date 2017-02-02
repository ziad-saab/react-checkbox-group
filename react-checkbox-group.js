'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckboxGroup = exports.Checkbox = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Checkbox = exports.Checkbox = _react2.default.createClass({
  displayName: 'Checkbox',

  contextTypes: {
    checkboxGroup: _react2.default.PropTypes.object.isRequired
  },

  componentWillMount: function componentWillMount() {
    if (!(this.context && this.context.checkboxGroup)) {
      throw new Error('The `Checkbox` component must be used as a child of `CheckboxGroup`.');
    }
  },

  render: function render() {
    var _context$checkboxGrou = this.context.checkboxGroup;
    var name = _context$checkboxGrou.name;
    var checkedValues = _context$checkboxGrou.checkedValues;
    var onChange = _context$checkboxGrou.onChange;

    var optional = {};
    if (checkedValues) {
      optional.checked = checkedValues.indexOf(this.props.value) >= 0;
    }
    if (typeof onChange === 'function') {
      optional.onChange = onChange.bind(null, this.props.value);
    }

    return _react2.default.createElement('input', _extends({}, this.props, {
      type: 'checkbox',
      name: name,
      disabled: this.props.disabled
    }, optional));
  }
});

var CheckboxGroup = exports.CheckboxGroup = _react2.default.createClass({
  displayName: 'CheckboxGroup',

  propTypes: {
    name: _react.PropTypes.string,
    defaultValue: _react.PropTypes.array,
    value: _react.PropTypes.array,
    onChange: _react.PropTypes.func,
    children: _react.PropTypes.node.isRequired,
    Component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func, _react.PropTypes.object])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      Component: "div"
    };
  },

  childContextTypes: {
    checkboxGroup: _react2.default.PropTypes.object
  },

  getChildContext: function getChildContext() {
    return {
      checkboxGroup: {
        name: this.props.name,
        checkedValues: this.state.value,
        onChange: this._onCheckboxChange
      }
    };
  },

  getInitialState: function getInitialState() {
    return {
      value: this.props.value || this.props.defaultValue || []
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    if (newProps.value) {
      this.setState({
        value: newProps.value
      });
    }
  },

  render: function render() {
    var _props = this.props;
    var Component = _props.Component;
    var name = _props.name;
    var value = _props.value;
    var onChange = _props.onChange;
    var children = _props.children;

    var rest = _objectWithoutProperties(_props, ['Component', 'name', 'value', 'onChange', 'children']);

    return _react2.default.createElement(
      Component,
      rest,
      children
    );
  },

  getValue: function getValue() {
    return this.state.value;
  },

  _isControlledComponent: function _isControlledComponent() {
    return !!this.props.value;
  },

  _onCheckboxChange: function _onCheckboxChange(checkboxValue, event) {
    var newValue;
    if (event.target.checked) {
      newValue = this.state.value.concat(checkboxValue);
    } else {
      newValue = this.state.value.filter(function (v) {
        return v !== checkboxValue;
      });
    }

    if (!this._isControlledComponent()) {
      this.setState({ value: newValue });
    } else {
      this.setState({ value: this.props.value });
    }

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(newValue, event);
    }
  }
});
