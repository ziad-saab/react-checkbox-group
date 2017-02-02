import React, {PropTypes} from 'react';

export const Checkbox = React.createClass({
  displayName: 'Checkbox',

  contextTypes: {
    checkboxGroup: React.PropTypes.object.isRequired
  },

  componentWillMount: function() {
    if (!(this.context && this.context.checkboxGroup)) {
      throw new Error('The `Checkbox` component must be used as a child of `CheckboxGroup`.');
    }
  },

  render: function() {
    const {name, checkedValues, onChange} = this.context.checkboxGroup;
    const optional = {};
    if(checkedValues) {
      optional.checked = (checkedValues.indexOf(this.props.value) >= 0);
    }
    if(typeof onChange === 'function') {
      optional.onChange = onChange.bind(null, this.props.value);
    }

    return (
      <input
        {...this.props}
        type="checkbox"
        name={name}
        disabled={this.props.disabled}
        {...optional} />
    );
  }
});

export const CheckboxGroup = React.createClass({
  displayName: 'CheckboxGroup',

  propTypes: {
    name: PropTypes.string,
    defaultValue: PropTypes.array,
    value: PropTypes.array,
    onChange: PropTypes.func,
    children: PropTypes.node.isRequired,
    Component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.object,
    ])
  },

  getDefaultProps: function() {
    return {
      Component: "div"
    };
  },

  childContextTypes: {
    checkboxGroup: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      checkboxGroup: {
        name: this.props.name,
        checkedValues: this.state.value,
        onChange: this._onCheckboxChange
      }
    }
  },

  getInitialState: function() {
    return {
      value: this.props.value || this.props.defaultValue || []
    }
  },

  componentWillReceiveProps: function(newProps) {
    if (newProps.value) {
      this.setState({
        value: newProps.value
      });
    }
  },

  render: function() {
    const {Component, name, value, onChange, children, ...rest} = this.props;
    return <Component {...rest}>{children}</Component>;
  },

  getValue: function() {
    return this.state.value;
  },

  _isControlledComponent: function() {
    return !!this.props.value;
  },

  _onCheckboxChange: function(checkboxValue, event) {
    var newValue;
    if (event.target.checked) {
      newValue = this.state.value.concat(checkboxValue);
    }
    else {
      newValue = this.state.value.filter(v => v !== checkboxValue);
    }

    if (!this._isControlledComponent()) {
      this.setState({value: newValue});
    }
    else {
      this.setState({value: this.props.value});
    }

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(newValue, event);
    }
  }
});
