# [React](http://facebook.github.io/react/)-checkbox-group

[![Greenkeeper badge](https://badges.greenkeeper.io/ziad-saab/react-checkbox-group.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/ziad-saab/react-checkbox-group.svg?branch=master)](https://travis-ci.org/ziad-saab/react-checkbox-group)

This is your average checkbox group:

```html
<form>
  <input
    onChange="{handleFruitChange}"
    type="checkbox"
    name="fruit"
    value="apple"
  />Apple
  <input
    onChange="{handleFruitChange}"
    type="checkbox"
    name="fruit"
    value="orange"
  />Orange
  <input
    onChange="{handleFruitChange}"
    type="checkbox"
    name="fruit"
    value="watermelon"
  />Watermelon
</form>
```

Repetitive, hard to manipulate and easily desynchronized.
Lift up `name` and `onChange`, and give the group an initial checked values array.
See below for a [complete example](#example)

## Install

```sh
npm install react-checkbox-group
```

or

```sh
yarn add react-checkbox-group
```

Simply require/import it to use it:

```tsx
import CheckboxGroup from 'react-checkbox-group'
```

## Example

```tsx
import React, { useState, useEffect } from 'react'
import CheckboxGroup from 'react-checkbox-group'

const Demo = () => {
  // Initialize the checked values
  const [fruits, setFruits] = useState<string[]>(['apple', 'watermelon'])

  useEffect(() => {
    const timer = setTimeout(() => {
      setFruits(['apple', 'orange'])
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <CheckboxGroup name="fruits" value={fruits} onChange={setFruits}>
      {(Checkbox) => (
        <>
          <label>
            <Checkbox value="apple" /> Apple
          </label>
          <label>
            <Checkbox value="orange" /> Orange
          </label>
          <label>
            <Checkbox value="watermelon" /> Watermelon
          </label>
        </>
      )}
    </CheckboxGroup>
  )
}

ReactDOM.render(<Demo />, document.body)
```

## License

MIT.
