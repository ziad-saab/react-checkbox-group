'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckboxGroup = exports.Checkbox = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
      if (!(this.props && this.props.checkboxGroup)) {
        throw new Error('The `Checkbox` component must be used as a child of `CheckboxGroup`.');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$checkboxGroup = _props.checkboxGroup,
          name = _props$checkboxGroup.name,
          checkedValues = _props$checkboxGroup.checkedValues,
          onChange = _props$checkboxGroup.onChange,
          rest = _objectWithoutProperties(_props, ['checkboxGroup']);

      var optional = {};
      if (checkedValues) {
        optional.checked = checkedValues.indexOf(this.props.value) >= 0;
      }
      if (typeof onChange === 'function') {
        optional.onChange = onChange.bind(null, this.props.value);
      }

      return _react2.default.createElement('input', _extends({}, rest, {
        type: 'checkbox',
        name: name,
        disabled: this.props.disabled
      }, optional));
    }
  }]);

  return Checkbox;
}(_react.Component);

Checkbox.displayName = 'Checkbox';

var CheckboxGroup = exports.CheckboxGroup = function (_Component2) {
  _inherits(CheckboxGroup, _Component2);

  function CheckboxGroup(props) {
    _classCallCheck(this, CheckboxGroup);

    var _this2 = _possibleConstructorReturn(this, (CheckboxGroup.__proto__ || Object.getPrototypeOf(CheckboxGroup)).call(this, props));

    _this2._prepareBoxes = function (children) {
      var maxDepth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      if (depth > maxDepth) {
        return children;
      }

      var checkboxGroup = {
        name: _this2.props.name,
        checkedValues: _this2.state.value,
        onChange: _this2._onCheckboxChange
      };

      return _react2.default.Children.map(children, function (child) {
        if (!(child && child.$$typeof)) {
          return child;
        } else if (child.type === Checkbox) {
          return _react2.default.cloneElement(child, { checkboxGroup: checkboxGroup });
        } else {
          return _react2.default.cloneElement(child, {}, child.props.children ? _react2.default.Children.map(child.props.children, function (c) {
            return _this2._prepareBoxes(c, maxDepth, depth + 1);
          }) : null);
        }
      });
    };

    _this2._isControlledComponent = _this2._isControlledComponent.bind(_this2);
    _this2._onCheckboxChange = _this2._onCheckboxChange.bind(_this2);
    _this2.getValue = _this2.getValue.bind(_this2);
    _this2.state = {
      value: _this2.props.value || _this2.props.defaultValue || []
    };
    return _this2;
  }

  _createClass(CheckboxGroup, [{
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
      var _props2 = this.props,
          Component = _props2.Component,
          name = _props2.name,
          value = _props2.value,
          onChange = _props2.onChange,
          children = _props2.children,
          _props2$checkboxDepth = _props2.checkboxDepth,
          checkboxDepth = _props2$checkboxDepth === undefined ? 1 : _props2$checkboxDepth,
          rest = _objectWithoutProperties(_props2, ['Component', 'name', 'value', 'onChange', 'children', 'checkboxDepth']);

      return _react2.default.createElement(
        Component,
        rest,
        this._prepareBoxes(children, checkboxDepth)
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
        this.props.onChange(newValue, event, this.props.name);
      }
    }
  }]);

  return CheckboxGroup;
}(_react.Component);

CheckboxGroup.displayName = 'CheckboxGroup';
CheckboxGroup.defaultProps = {
  Component: "div"
};
