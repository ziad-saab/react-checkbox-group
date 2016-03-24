var React = require('react');

function checkbox(name, checkedValues, onChange) {
  return function Checkbox(props) {
    var checked = checkedValues.indexOf(props.value) >= 0;
    onChange = onChange.bind(null, props.value);

    return (
      <input
        {...props}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
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

    var renderedChildren = children(checkbox(name, checkedValues, this.onCheckboxChange));
    return renderedChildren && React.Children.only(renderedChildren);
  },
});
