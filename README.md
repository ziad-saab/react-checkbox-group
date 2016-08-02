# [React](http://facebook.github.io/react/)-checkbox-group
### Heavily inspired from https://github.com/chenglou/react-radio-group

[![Build Status](https://travis-ci.org/ziad-saab/react-checkbox-group.svg?branch=master)](https://travis-ci.org/ziad-saab/react-checkbox-group)

This is your average checkbox group:

```html
<form>
  <input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="apple" />Apple
  <input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="orange" />Orange
  <input onChange={this.handleFruitChange} type="checkbox" name="fruit" value="watermelon" />Watermelon
</form>
```

Repetitive, hard to manipulate and easily desynchronized.
Lift up `name` and `onChange`, and give the group an initial checked values array:

```javascript
<CheckboxGroup name="fruits" value={['kiwi', 'pineapple']} onChange={this.fruitsChanged}>
  {
    Checkbox => (
      <div>
        <Checkbox value="kiwi"/>
        <Checkbox value="pineapple"/>
        <Checkbox value="watermelon"/>
      </div>
    )
  }
</CheckboxGroup>
```

Listen for changes, get the new value as intuitively as possible:

```javascript
<CheckboxGroup name="fruit" value={['apple','watermelon']} onChange={this.handleChange}>
...
</CheckboxGroup>
```

and further

```javascript
function handleChange(newValues) {
  // ['apple']
}
```

Optionally, specify a component to be used to render the checkboxes:

```javascript
// Component that renders a checkbox, e.g. the Checkbox component from `react-bootstrap`
var CustomCheckbox = (props) => (
  <label className="custom">
    <input type="checkbox" {...props} />
    {props.label}
  </label>
);

// ...

<CheckboxGroup name="fruits" value={['kiwi', 'pineapple']} onChange={this.fruitsChanged} componentClass={CustomCheckbox}>
  {
    Checkbox => (
      <div>
        <Checkbox label="Master Kiwi" value="kiwi"/>
        <Checkbox label="Super Pineapple" value="pineapple"/>
        <Checkbox label="Awesome Watermelon" value="watermelon"/>
      </div>
    )
  }
</CheckboxGroup>
```

That's it for the API! See below for a complete example.

## Install

```sh
bower install react-checkbox-group
```

or

```sh
npm install react-checkbox-group
```

Simply require/import it to use it:

```javascript
var CheckboxGroup = require('react-checkbox-group');
// or
import CheckboxGroup from 'react-checkbox-group';
```

## Example

```javascript
var Demo = React.createClass({
  getInitialState: function() {
    return {
      fruits: ['apple','watermelon']
    };
  },

  componentDidMount: function() {
    // Add orange and remove watermelon after 5 seconds
    setTimeout(function() {
      this.setState({
        value: ['apple','orange']
      });
    }.bind(this), 5000);
  },

  render: function() {
    // the checkboxes can be arbitrarily deep. They will always be fetched and
    // attached the `name` attribute correctly. `value` is optional
    return (
      <CheckboxGroup
        name="fruits"
        value={this.state.fruits}
        onChange={this.fruitsChanged}
      >
        {
          Checkbox => (
            <form>
              <label>
                <Checkbox value="apple"/> Apple
              </label>
              <label>
                <Checkbox value="orange"/> Orange
              </label>
              <label>
                <Checkbox value="watermelon"/> Watermelon
              </label>
            </form>
          )
        }
      </CheckboxGroup>
    );
  },
  fruitsChanged: function(newFruits) {
    this.setState({
      fruits: newFruits
    });
  }
});

ReactDOM.render(<Demo/>, document.body);
```

## License

MIT.
