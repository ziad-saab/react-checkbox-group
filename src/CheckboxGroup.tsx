import * as React from 'react'

interface ICheckboxProps {
  disabled?: boolean
  value: any
}
interface ICheckboxGroupProps {
  children: (Checkbox: React.FC<ICheckboxProps>) => JSX.Element
  name: string
  value: any[]
  onChange: (newValue: any[]) => any
}

const CheckboxGroup: React.FC<ICheckboxGroupProps> = (props) => {
  const { children, name, value: checkedValues, onChange } = props

  const onCheckboxChange = (
    checkboxValue: any,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.checked) {
      onChange(checkedValues.concat(checkboxValue))
    } else {
      onChange(checkedValues.filter((v) => v !== checkboxValue))
    }
  }

  const Checkbox: React.FC<ICheckboxProps> = (checkboxProps) => {
    const { value: cbValue, disabled, ...rest } = checkboxProps

    const checked = checkedValues ? checkedValues.indexOf(cbValue) >= 0 : false

    return (
      <input
        {...rest}
        type="checkbox"
        name={name}
        disabled={disabled}
        checked={checked}
        onChange={onCheckboxChange.bind(null, cbValue)}
        value={cbValue}
      />
    )
  }

  return children(Checkbox)
}

export default CheckboxGroup
