import React, {Component} from 'react';

export class Checkbox extends Component {
  static displayName = 'Checkbox';

  componentWillMount() {
    if (!(this.props && this.props.checkboxGroup)) {
      throw new Error('The `Checkbox` component must be used as a child of `CheckboxGroup`.');
    }
  }

  render() {
    const {checkboxGroup: {name, checkedValues, onChange}, ...rest} = this.props;
    const optional = {};
    if (checkedValues) {
      optional.checked = (checkedValues.indexOf(this.props.value) >= 0);
    }
    if (typeof onChange === 'function') {
      optional.onChange = onChange.bind(null, this.props.value);
    }

    return (
      <input
        {...rest}
        type="checkbox"
        name={name}
        disabled={this.props.disabled}
        {...optional}
      />
    );
  }
}

export class CheckboxGroup extends Component {
  static displayName = 'CheckboxGroup';

  static defaultProps = {
    Component: "div"
  };

  constructor(props) {
    super(props);
    this._isControlledComponent = this._isControlledComponent.bind(this);
    this._onCheckboxChange = this._onCheckboxChange.bind(this);
    this.getValue = this.getValue.bind(this);
    this.state = {
      value: this.props.value || this.props.defaultValue || []
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value) {
      this.setState({
        value: newProps.value
      });
    }
  }

  _prepareBoxes = (children, maxDepth=1, depth=1) => {
    if (depth > maxDepth) {
      return children;
    }

    const checkboxGroup = {
      name: this.props.name,
      checkedValues: this.state.value,
      onChange: this._onCheckboxChange
    };

    return React.Children.map(children, child => {
      if (!(child && child.$$typeof)) {
        return child;
      }
      else if (child.type === Checkbox) {
        return React.cloneElement(child, {checkboxGroup})
      }
      else {
        return React.cloneElement(child, {}, child.props.children ? React.Children.map(child.props.children, c => this._prepareBoxes(c, maxDepth, depth + 1)) : null)
      }
    });
  };

  render() {
    const {Component, name, value, onChange, children, checkboxDepth = 1, ...rest} = this.props;
    return <Component {...rest}>{this._prepareBoxes(children, checkboxDepth)}</Component>;
  }

  getValue() {
    return this.state.value;
  }

  _isControlledComponent() {
    return Boolean(this.props.value);
  }

  _onCheckboxChange(checkboxValue, event) {
    let newValue;
    if (event.target.checked) {
      newValue = this.state.value.concat(checkboxValue);
    } else {
      newValue = this.state.value.filter(v => v !== checkboxValue);
    }

    if (this._isControlledComponent()) {
      this.setState({value: this.props.value});
    } else {
      this.setState({value: newValue});
    }

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(newValue, event, this.props.name);
    }
  }
}
