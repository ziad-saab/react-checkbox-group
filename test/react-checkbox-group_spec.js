import React from 'react';
import ReactDOM from 'react-dom';
import {expect} from 'chai';
import {Checkbox, CheckboxGroup} from '../react-checkbox-group.jsx';
import {Simulate, renderIntoDocument} from 'react-addons-test-utils';

function _findInputWithValue(wrapper, value) {
  return (
    Array
    .from(wrapper.querySelectorAll('input[name="fruit"]'))
    .find(x => x.value === value)
  );
}

describe('ReactCheckboxGroup', function() {

  it('Passes the `name` prop down to the boxes', function() {
    var component = renderIntoDocument(
      <CheckboxGroup name="fruit">
        <Checkbox value="kiwi"/>
        <Checkbox value="watermelon"/>
      </CheckboxGroup>
    );
    var boxes = ReactDOM.findDOMNode(component).querySelectorAll('input[type="checkbox"][name="fruit"]');

    expect(boxes.length).to.equal(2);
  });

  it('Disables a box when `disabled` is used', function() {
    var disabled = true;
    var component = renderIntoDocument(
      <CheckboxGroup name="fruit">
        <Checkbox value="kiwi" disabled={disabled}/>
        <Checkbox value="pineapple" disabled={disabled}/>
        <Checkbox value="watermelon"/>
      </CheckboxGroup>
    );

    var disabledBoxes = ReactDOM.findDOMNode(component).querySelectorAll('input[type="checkbox"][name="fruit"][disabled]');

    expect(disabledBoxes.length).to.equal(2);
  });

  it('Checks the correct boxes when `defaultValue` is used', function() {
    var fruits = ['watermelon', 'pineapple'];
    var component = renderIntoDocument(
      <CheckboxGroup name="fruit" defaultValue={fruits}>
        <Checkbox value="kiwi"/>
        <Checkbox value="pineapple"/>
        <Checkbox value="watermelon"/>
      </CheckboxGroup>
    );

    var checkedBoxes = ReactDOM.findDOMNode(component).querySelectorAll('input[type="checkbox"]:checked');

    expect(checkedBoxes.length).to.equal(2);
    expect(checkedBoxes[0].value).to.equal('pineapple');
    expect(checkedBoxes[1].value).to.equal('watermelon');
  });

  it('Lets boxes become unselected if uncontrolled', function() {
    // Create an element to re-render to
    var div = document.createElement('div');

    var fruits = ['watermelon', 'pineapple'];
    var component = ReactDOM.render(
      <CheckboxGroup name="fruit" defaultValue={fruits}>
        <Checkbox value="kiwi"/>
        <Checkbox value="pineapple"/>
        <Checkbox value="watermelon"/>
      </CheckboxGroup>,
      div
    );

    // Check the box manually
    var wrapper = ReactDOM.findDOMNode(component);
    var box = _findInputWithValue(wrapper, 'kiwi');
    Simulate.change(box, {target: {checked: true}});

    // Re-render with same props, defaultValue shouldn't affect it now
    var component = ReactDOM.render(
      <CheckboxGroup name="fruit" defaultValue={fruits}>
        <Checkbox value="kiwi"/>
        <Checkbox value="pineapple"/>
        <Checkbox value="watermelon"/>
      </CheckboxGroup>,
      div
    );

    var newValue = component.getValue();
    expect(newValue.length).to.equal(3);
    expect(newValue).to.include('kiwi');
    expect(newValue).to.include('pineapple');
    expect(newValue).to.include('watermelon');
  });

  it('Keeps the same boxes checked if controlled', function() {
    // Create an element to re-render to
    var div = document.createElement('div');

    var fruits = ['watermelon', 'pineapple'];
    var component = ReactDOM.render(
      <CheckboxGroup name="fruit" value={fruits}>
        <Checkbox value="kiwi"/>
        <Checkbox value="pineapple"/>
        <Checkbox value="watermelon"/>
      </CheckboxGroup>,
      div
    );

    // Check the box manually
    var wrapper = ReactDOM.findDOMNode(component);
    var box = _findInputWithValue(wrapper, 'kiwi')
    Simulate.change(box, {target: {checked: true}});

    // Re-render with same props, value should be kept
    var component = ReactDOM.render(
      <CheckboxGroup name="fruit" value={fruits}>
        <Checkbox value="kiwi"/>
        <Checkbox value="pineapple"/>
        <Checkbox value="watermelon"/>
      </CheckboxGroup>,
      div
    );

    var newValue = component.getValue();
    expect(newValue.length).to.equal(2);
    expect(newValue).to.include('pineapple');
    expect(newValue).to.include('watermelon');
    expect(newValue).to.not.include('kiwi');
  });

  it('Checks the correct boxes when props change', function() {
    // Create an element to re-render to
    var div = document.createElement('div');

    var fruits = ['watermelon', 'pineapple'];
    var component = ReactDOM.render(
      <CheckboxGroup name="fruit" value={['watermelon']}>
        <Checkbox value="kiwi"/>
        <Checkbox value="pineapple"/>
        <Checkbox value="watermelon"/>
      </CheckboxGroup>,
      div
    );

    // Re-render in same div with different prop value
    var component = ReactDOM.render(
      <CheckboxGroup name="fruit" value={['watermelon', 'kiwi']}>
        <Checkbox value="kiwi"/>
        <Checkbox value="pineapple"/>
        <Checkbox value="watermelon"/>
      </CheckboxGroup>,
      div
    );

    var newValue = component.getValue();
    expect(newValue.length).to.equal(2);
    expect(newValue).to.include('kiwi');
    expect(newValue).to.include('watermelon');
    expect(newValue).to.not.include('pineapple');
  });

  it('Calls `onChange` with the correct new value', function() {
    var fruits = ['kiwi', 'watermelon'];
    var onChangeCalled = false;
    var newFruits;
    function onChange(newValue) {
      onChangeCalled = true;
      newFruits = newValue;
    }

    var component = renderIntoDocument(
      <CheckboxGroup name="fruit" value={fruits} onChange={onChange}>
        <Checkbox value="kiwi"/>
        <Checkbox value="pineapple"/>
        <Checkbox value="watermelon"/>
      </CheckboxGroup>
    );

    // Check the box manually
    var wrapper = ReactDOM.findDOMNode(component);
    var box = _findInputWithValue(wrapper, 'pineapple');
    Simulate.change(box, {target: {checked: true}});

    expect(onChangeCalled).to.be.ok;
    expect(newFruits.length).to.equal(3);
    expect(newFruits).to.include('kiwi');
    expect(newFruits).to.include('pineapple');
    expect(newFruits).to.include('watermelon');
  });
});
