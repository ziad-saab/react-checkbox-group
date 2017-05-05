import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Checkbox extends Component {
  displayName: 'Checkbox';

  static contextTypes = {
    checkboxGroup: PropTypes.object.isRequired
  }

  componentWillMount() {
    if (!(this.context && this.context.checkboxGroup)) {
      throw new Error('The `Checkbox` component must be used as a child of `CheckboxGroup`.');
    }
  }

  render() {
    const {name, checkedValues, onChange} = this.context.checkboxGroup;
    const optional = {};
    if (checkedValues) {
      optional.checked = (checkedValues.indexOf(this.props.value) >= 0);
    }
    if (typeof onChange === 'function') {
      optional.onChange = onChange.bind(null, this.props.value);
    }

    return (
      <input
        {...this.props}
        type="checkbox"
        name={name}
        disabled={this.props.disabled}
        {...optional}
        />
    );
  }
}

export class CheckboxGroup extends Component {
  displayName: 'CheckboxGroup';

  static childContextTypes = {
    checkboxGroup: PropTypes.object.isRequired
  }

  static propTypes = {
    name: PropTypes.string,
    defaultValue: PropTypes.array,
    value: PropTypes.array,
    onChange: PropTypes.func,
    children: PropTypes.node.isRequired,
    Component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.object
    ])
  }

  static defaultProps = {
    Component: "div"
  }

  constructor(props) {
    super(props);
    this._isControlledComponent = this._isControlledComponent.bind(this);
    this._onCheckboxChange = this._onCheckboxChange.bind(this);
    this.getChildContext = this.getChildContext.bind(this);
    this.getValue = this.getValue.bind(this);
    this.state = {
      value: this.props.value || this.props.defaultValue || []
    };
  }

  getChildContext() {
    const checkboxGroup = {
      name: this.props.name,
      checkedValues: this.state.value,
      onChange: this._onCheckboxChange
    };
    return {checkboxGroup};
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value) {
      this.setState({
        value: newProps.value
      });
    }
  }

  render() {
    const {Component, name, value, onChange, children, ...rest} = this.props;
    return <Component {...rest}>{children}</Component>;
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
      this.props.onChange(newValue, event);
    }
  }
}
