# [React](http://facebook.github.io/react/)-checkbox-group
### Heavily inspired from https://github.com/chenglou/react-radio-group

[![Greenkeeper badge](https://badges.greenkeeper.io/ziad-saab/react-checkbox-group.svg)](https://greenkeeper.io/)

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
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

<CheckboxGroup name="fruits" value={['kiwi', 'pineapple']} onChange={this.fruitsChanged}>
  <Checkbox value="kiwi"/>
  <Checkbox value="pineapple"/>
  <Checkbox value="watermelon"/>
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
var Check = require('react-checkbox-group');
var Checkbox = Check.Checkbox;
var CheckboxGroup = Check.CheckboxGroup;

// or ES6
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
```

## Nested `Checkbox`
If you render `Checkbox`es deeply nested inside the `CheckboxGroup`, you need to pass a `checkboxDepth` prop to the `CheckboxGroup` so that it can manage the checkboxes without too much overhead.

This is shown in the example below where the `<Checkbox>` elements are nested inside `<label>`s.

## Example

```javascript
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruits: ['apple','watermelon']
    };
  }

  componentDidMount() {
    // Add orange and remove watermelon after 5 seconds
    setTimeout(() => {
      this.setState({
        fruits: ['apple','orange']
      });
    }, 5000);
  }

  render() {
    // the checkboxes can be arbitrarily deep. They will always be fetched and
    // attached the `name` attribute correctly. `value` is optional
    return (
      <CheckboxGroup
        checkboxDepth={2} // This is needed to optimize the checkbox group
        name="fruits"
        value={this.state.fruits}
        onChange={this.fruitsChanged}>

        <label><Checkbox value="apple"/> Apple</label>
        <label><Checkbox value="orange"/> Orange</label>
        <label><Checkbox value="watermelon"/> Watermelon</label>
      </CheckboxGroup>
    );
  }
  
  fruitsChanged = (newFruits) => {
    this.setState({
      fruits: newFruits
    });
  }
  
};

ReactDOM.render(<Demo/>, document.body);
```

## License

MIT.
