import * as React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import CheckboxGroup from '../src/CheckboxGroup'

afterEach(cleanup)

describe('CheckboxGroup', () => {
  const renderBasicGroup = ({
    value = [],
    onChange = jest.fn(),
  }: { value?: any[]; onChange?: (v: any[]) => any } = {}) =>
    render(
      <CheckboxGroup name="fruits" value={value} onChange={onChange}>
        {(Checkbox) => (
          <>
            <label>
              <Checkbox value="apple" />
              <span>Apple</span>
            </label>
            <label>
              <Checkbox value="orange" />
              <span>Orange</span>
            </label>
            <label>
              <Checkbox value="watermelon" />
              <span>Watermelon</span>
            </label>
          </>
        )}
      </CheckboxGroup>,
    )

  it('Renders correctly', () => {
    renderBasicGroup()
  })

  it('Renders checked boxes for passed checked values', () => {
    const { container } = renderBasicGroup({ value: ['apple', 'watermelon'] })
    const checkedBoxes = container.querySelectorAll(
      'input:checked',
    ) as NodeListOf<HTMLInputElement>
    expect(checkedBoxes).toHaveLength(2)
    expect(checkedBoxes[0].value).toEqual('apple')
    expect(checkedBoxes[1].value).toEqual('watermelon')
  })

  it('Calls onChange with the appropriate value when a checkbox is checked', () => {
    const onChange = jest.fn()
    const { getByLabelText } = renderBasicGroup({ value: [], onChange })
    const appleLabel = getByLabelText('Apple')
    fireEvent.click(appleLabel)
    expect(onChange).toHaveBeenCalledWith(['apple'])
  })

  it('Calls onChange with the appropriate value when a checkbox is unchecked', () => {
    const onChange = jest.fn()
    const { getByLabelText } = renderBasicGroup({
      value: ['watermelon', 'orange'],
      onChange,
    })
    const orangeLabel = getByLabelText('Orange')
    fireEvent.click(orangeLabel)
    expect(onChange).toHaveBeenCalledWith(['watermelon'])
  })
})
