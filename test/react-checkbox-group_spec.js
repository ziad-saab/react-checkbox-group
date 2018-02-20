import React from 'react';
import ReactDOM from 'react-dom';
import {expect} from 'chai';
import {Checkbox, CheckboxGroup} from '../react-checkbox-group.jsx';
import {Simulate, renderIntoDocument} from 'react-dom/test-utils';

function _findInputWithValue(wrapper, value) {
  return (
    Array
    .from(wrapper.querySelectorAll('input[name="fruit"]'))
    .find(x => x.value === value)
  );
}

describe('ReactCheckboxGroup', function() {

  it('Fails when `Checkbox` is not a direct child of `CheckboxGroup`', function() {
    expect(() => {
      renderIntoDocument(
        <CheckboxGroup name="fruit">
          <label><Checkbox value="kiwi"/> Kiwi</label>
          <label><Checkbox value="watermelon"/> Watermelon</label>
        </CheckboxGroup>
      );
    }).to.throw();
  });

  it('Renders correctly when `Checkbox` components at different nesting levels', function() {
    const component = renderIntoDocument(
      <CheckboxGroup checkboxDepth={3} name="fruit">
        <label><Checkbox value="kiwi"/> Kiwi</label>
        <div>
          <label><Checkbox value="watermelon"/> Watermelon</label>
        </div>
      </CheckboxGroup>
    );

    expect(component).to.be.ok;
  });

  it('Renders correctly when one of the `CheckboxGroup` child is null', function() {
    const component = renderIntoDocument(
      <CheckboxGroup checkboxDepth={3} name="fruit">
        <label><Checkbox value="kiwi"/> Kiwi</label>
        {false && ( // or another logical condition which returns `false`
          <label><Checkbox value="watermelon"/> Watermelon</label>
        )}
      </CheckboxGroup>
    );

    expect(component).to.be.ok;
  });

  it('Passes the `name` prop down to the boxes', function() {
    const component = renderIntoDocument(
      <CheckboxGroup name="fruit">
        <Checkbox value="kiwi"/>
        <Checkbox value="watermelon"/>
      </CheckboxGroup>
    );
    const boxes = ReactDOM.findDOMNode(component).querySelectorAll('input[type="checkbox"][name="fruit"]');

    expect(boxes.length).to.equal(2);
  });

  it('Disables a box when `disabled` is used', function() {
    const disabled = true;
    const component = renderIntoDocument(
      <CheckboxGroup name="fruit">
        <Checkbox value="kiwi" disabled={disabled}/>
        <Checkbox value="pineapple" disabled={disabled}/>
        <Checkbox value="watermelon"/>
      </CheckboxGroup>
    );

    const disabledBoxes = ReactDOM.findDOMNode(component).querySelectorAll('input[type="checkbox"][name="fruit"][disabled]');

    expect(disabledBoxes.length).to.equal(2);
  });

  it('Checks the correct boxes when `defaultValue` is used', function() {
    const fruits = ['watermelon', 'pineapple'];
    const component = renderIntoDocument(
      <CheckboxGroup name="fruit" defaultValue={fruits}>
        <Checkbox value="kiwi"/>
        <Checkbox value="pineapple"/>
        <Checkbox value="watermelon"/>
      </CheckboxGroup>
    );

    const checkedBoxes = ReactDOM.findDOMNode(component).querySelectorAll('input[type="checkbox"]:checked');

    expect(checkedBoxes.length).to.equal(2);
    expect(checkedBoxes[0].value).to.equal('pineapple');
    expect(checkedBoxes[1].value).to.equal('watermelon');
  });

  it('Lets boxes become unselected if uncontrolled', function() {
    // Create an element to re-render to
    const div = document.createElement('div');

    const fruits = ['watermelon', 'pineapple'];
    let component = ReactDOM.render(
      <CheckboxGroup name="fruit" defaultValue={fruits}>
        <Checkbox value="kiwi"/>
        <Checkbox value="pineapple"/>
        <Checkbox value="watermelon"/>
      </CheckboxGroup>,
      div
    );

    // Check the box manually
    const wrapper = ReactDOM.findDOMNode(component);
    const box = _findInputWithValue(wrapper, 'kiwi');
    Simulate.change(box, {target: {checked: true}});

    // Re-render with same props, defaultValue shouldn't affect it now
    component = ReactDOM.render(
      <CheckboxGroup name="fruit" defaultValue={fruits}>
        <Checkbox value="kiwi"/>
        <Checkbox value="pineapple"/>
        <Checkbox value="watermelon"/>
      </CheckboxGroup>,
      div
    );

    const newValue = component.getValue();
    expect(newValue.length).to.equal(3);
    expect(newValue).to.include('kiwi');
    expect(newValue).to.include('pineapple');
    expect(newValue).to.include('watermelon');
  });

  it('Keeps the same boxes checked if controlled', function() {
    // Create an element to re-render to
    const div = document.createElement('div');

    const fruits = ['watermelon', 'pineapple'];
    let component = ReactDOM.render(
      <CheckboxGroup name="fruit" value={fruits}>
        <Checkbox value="kiwi"/>
        <Checkbox value="pineapple"/>
        <Checkbox value="watermelon"/>
      </CheckboxGroup>,
      div
    );

    // Check the box manually
    const wrapper = ReactDOM.findDOMNode(component);
    const box = _findInputWithValue(wrapper, 'kiwi');
    Simulate.change(box, {target: {checked: true}});

    // Re-render with same props, value should be kept
    component = ReactDOM.render(
      <CheckboxGroup name="fruit" value={fruits}>
        <Checkbox value="kiwi"/>
        <Checkbox value="pineapple"/>
        <Checkbox value="watermelon"/>
      </CheckboxGroup>,
      div
    );

    const newValue = component.getValue();
    expect(newValue.length).to.equal(2);
    expect(newValue).to.include('pineapple');
    expect(newValue).to.include('watermelon');
    expect(newValue).to.not.include('kiwi');
  });

  it('Checks the correct boxes when props change', function() {
    // Create an element to re-render to
    const div = document.createElement('div');

    const fruits = ['watermelon', 'pineapple'];
    ReactDOM.render(
      <CheckboxGroup name="fruit" value={['watermelon']}>
        <Checkbox value="kiwi"/>
        <Checkbox value="pineapple"/>
        <Checkbox value="watermelon"/>
      </CheckboxGroup>,
      div
    );

    // Re-render in same div with different prop value
    const component = ReactDOM.render(
      <CheckboxGroup name="fruit" value={['watermelon', 'kiwi']}>
        <Checkbox value="kiwi"/>
        <Checkbox value="pineapple"/>
        <Checkbox value="watermelon"/>
      </CheckboxGroup>,
      div
    );

    const newValue = component.getValue();
    expect(newValue.length).to.equal(2);
    expect(newValue).to.include('kiwi');
    expect(newValue).to.include('watermelon');
    expect(newValue).to.not.include('pineapple');
  });

  it('Calls `onChange` with the correct new value', function() {
    const fruits = ['kiwi', 'watermelon'];
    let onChangeCalled = false;
    let newFruits;
    function onChange(newValue) {
      onChangeCalled = true;
      newFruits = newValue;
    }

    const component = renderIntoDocument(
      <CheckboxGroup name="fruit" value={fruits} onChange={onChange}>
        <Checkbox value="kiwi"/>
        <Checkbox value="pineapple"/>
        <Checkbox value="watermelon"/>
      </CheckboxGroup>
    );

    // Check the box manually
    const wrapper = ReactDOM.findDOMNode(component);
    const box = _findInputWithValue(wrapper, 'pineapple');
    Simulate.change(box, {target: {checked: true}});

    expect(onChangeCalled).to.be.ok;
    expect(newFruits.length).to.equal(3);
    expect(newFruits).to.include('kiwi');
    expect(newFruits).to.include('pineapple');
    expect(newFruits).to.include('watermelon');
  });
});
