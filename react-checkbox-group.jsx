var React = require('react');

function checkbox(Component, name, checkedValues, onChange) {
  return function Checkbox(props) {
    var checked = checkedValues.indexOf(props.value) >= 0;
    let boxChange = onChange.bind(null, props.value);

    return (
      <Component
        {...props}
        type={Component === 'input' ? 'checkbox': null}
        name={name}
        checked={checked}
        onChange={boxChange}
        />
    );
  }
}

module.exports = React.createClass({
  displayName: 'CheckboxGroup',
  getInitialState: function() {
    return {
      value: this.props.value || this.props.defaultValue || []
    };
  },
  isControlledComponent: function() {
    return !!this.props.value;
  },
  componentWillReceiveProps(newProps) {
    if (newProps.value) {
      this.setState({value: newProps.value});
    }
  },
  onCheckboxChange: function(checkboxValue, event) {
    var newValue;
    if (event.target.checked) {
      newValue = this.state.value.concat(checkboxValue);
    }
    else {
      newValue = this.state.value.filter(v => v !== checkboxValue);
    }

    if (!this.isControlledComponent()) {
      this.setState({value: newValue});
    }
    else {
      this.setState({value: this.props.value});
    }

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(newValue);
    }
  },
  getValue: function() {
    return this.state.value;
  },
  render: function() {
    var {name, value, children} = this.props;

    var checkedValues;
    if (!this.isControlledComponent()) {
      checkedValues = this.state.value;
    }
    else {
      checkedValues = value;
    }

    var Component = this.props.componentClass || 'input';

    var renderedChildren = children(checkbox(Component, name, checkedValues, this.onCheckboxChange));
    return renderedChildren && React.Children.only(renderedChildren);
  },
});
