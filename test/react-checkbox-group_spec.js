var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('chai').expect;
var CheckboxGroup = require('../react-checkbox-group.jsx');
var ReactTestUtils = require('react-addons-test-utils');
var renderIntoDocument = ReactTestUtils.renderIntoDocument;
var Simulate = ReactTestUtils.Simulate;

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
        {
          Checkbox => (
            <div>
              <Checkbox value="kiwi"/>
              <Checkbox value="watermelon"/>
            </div>
          )
        }
      </CheckboxGroup>
    );
    var boxes = ReactDOM.findDOMNode(component).querySelectorAll('input[type="checkbox"][name="fruit"]');

    expect(boxes.length).to.equal(2);
  });

  it('Checks the correct boxes when `defaultValue` is used', function() {
    var fruits = ['watermelon', 'pineapple'];
    var component = renderIntoDocument(
      <CheckboxGroup name="fruit" defaultValue={fruits}>
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
        {
          Checkbox => (
            <div>
              <Checkbox value="kiwi"/>
              <Checkbox value="pineapple"/>
              <Checkbox value="watermelon"/>
            </div>
          )
        }
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
        {
          Checkbox => (
            <div>
              <Checkbox value="kiwi"/>
              <Checkbox value="pineapple"/>
              <Checkbox value="watermelon"/>
            </div>
          )
        }
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
        {
          Checkbox => (
            <div>
              <Checkbox value="kiwi"/>
              <Checkbox value="pineapple"/>
              <Checkbox value="watermelon"/>
            </div>
          )
        }
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
        {
          Checkbox => (
            <div>
              <Checkbox value="kiwi"/>
              <Checkbox value="pineapple"/>
              <Checkbox value="watermelon"/>
            </div>
          )
        }
      </CheckboxGroup>,
      div
    );

    var newValue = component.getValue();
    expect(newValue.length).to.equal(2);
    expect(newValue).to.include('pineapple');
    expect(newValue).to.include('watermelon');
    expect(newValue).to.not.include('kiwi');
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

  it('Supports rendering a custom checkbox component', function() {
    // Component that renders a checkbox, e.g. the Checkbox component from `react-bootstrap`
    var CustomCheckbox = (props) => (
      <label className="custom">
        <input type="checkbox" {...props} />
        {props.label}
      </label>
    );

    var component = renderIntoDocument(
      <CheckboxGroup name="fruit" componentClass={CustomCheckbox}>
        {
          Checkbox => (
            <div>
              <Checkbox label="Super Kiwi" value="kiwi"/>
              <Checkbox label="Awesome Watermelon" value="watermelon"/>
            </div>
          )
        }
      </CheckboxGroup>
    );
    var elements = ReactDOM.findDOMNode(component).querySelectorAll('.custom');

    expect(elements.length).to.equal(2);
    expect(elements[0].textContent).to.equal('Super Kiwi');
  });
});
