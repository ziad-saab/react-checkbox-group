'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckboxGroup = exports.Checkbox = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Checkbox = exports.Checkbox = function (_Component) {
  _inherits(Checkbox, _Component);

  function Checkbox() {
    _classCallCheck(this, Checkbox);

    return _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).apply(this, arguments));
  }

  _createClass(Checkbox, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (!(this.context && this.context.checkboxGroup)) {
        throw new Error('The `Checkbox` component must be used as a child of `CheckboxGroup`.');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$checkboxGrou = this.context.checkboxGroup,
          name = _context$checkboxGrou.name,
          checkedValues = _context$checkboxGrou.checkedValues,
          onChange = _context$checkboxGrou.onChange;

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
  }]);

  return Checkbox;
}(_react.Component);

Checkbox.contextTypes = {
  checkboxGroup: _propTypes2.default.object.isRequired
};

var CheckboxGroup = exports.CheckboxGroup = function (_Component2) {
  _inherits(CheckboxGroup, _Component2);

  function CheckboxGroup(props) {
    _classCallCheck(this, CheckboxGroup);

    var _this2 = _possibleConstructorReturn(this, (CheckboxGroup.__proto__ || Object.getPrototypeOf(CheckboxGroup)).call(this, props));

    _this2._isControlledComponent = _this2._isControlledComponent.bind(_this2);
    _this2._onCheckboxChange = _this2._onCheckboxChange.bind(_this2);
    _this2.getChildContext = _this2.getChildContext.bind(_this2);
    _this2.getValue = _this2.getValue.bind(_this2);
    _this2.state = {
      value: _this2.props.value || _this2.props.defaultValue || []
    };
    return _this2;
  }

  _createClass(CheckboxGroup, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var checkboxGroup = {
        name: this.props.name,
        checkedValues: this.state.value,
        onChange: this._onCheckboxChange
      };
      return { checkboxGroup: checkboxGroup };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.value) {
        this.setState({
          value: newProps.value
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          Component = _props.Component,
          name = _props.name,
          value = _props.value,
          onChange = _props.onChange,
          children = _props.children,
          rest = _objectWithoutProperties(_props, ['Component', 'name', 'value', 'onChange', 'children']);

      return _react2.default.createElement(
        Component,
        rest,
        children
      );
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.state.value;
    }
  }, {
    key: '_isControlledComponent',
    value: function _isControlledComponent() {
      return Boolean(this.props.value);
    }
  }, {
    key: '_onCheckboxChange',
    value: function _onCheckboxChange(checkboxValue, event) {
      var newValue = void 0;
      if (event.target.checked) {
        newValue = this.state.value.concat(checkboxValue);
      } else {
        newValue = this.state.value.filter(function (v) {
          return v !== checkboxValue;
        });
      }

      if (this._isControlledComponent()) {
        this.setState({ value: this.props.value });
      } else {
        this.setState({ value: newValue });
      }

      if (typeof this.props.onChange === 'function') {
        this.props.onChange(newValue, event);
      }
    }
  }]);

  return CheckboxGroup;
}(_react.Component);

CheckboxGroup.childContextTypes = {
  checkboxGroup: _propTypes2.default.object.isRequired
};
CheckboxGroup.propTypes = {
  name: _propTypes2.default.string,
  defaultValue: _propTypes2.default.array,
  value: _propTypes2.default.array,
  onChange: _propTypes2.default.func,
  children: _propTypes2.default.node.isRequired,
  Component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func, _propTypes2.default.object])
};
CheckboxGroup.defaultProps = {
  Component: "div"
};
