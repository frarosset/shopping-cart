import StyledInput from "./StyledInput.jsx";

// In vanilla JS, onChange event listener can be used to triggered the handler
// after the user has finished typing.
// React components have Component.onChange event listener behave like Component.onInput.
// You have to set Component.onBlur to mimic the behaviour of Component.onChange.
// See: https://stackoverflow.com/a/43834855
// and: https://www.peterbe.com/plog/onchange-in-reactjs
//
// Note that this triggers when the component loses focus, but not when the user press Enter.
// To support that, add an onKeyUp event handler, too, which blurs the component when that occurs.
//
// Moreover, if you do this, you need to set the defaultValue instead of the value of the component.
// Otherwise, as the input is a controlled component, editing the input component is prevented.
// The remaining problem is that defaultValue only specify the value on mount, which cannot be
// modified on successive re-rendering. The workaround is to create an entirely new component
// at each render, assigning a random key.
//
// See: https://stackoverflow.com/a/30346251
// and: https://stackoverflow.com/questions/30792526/defaultvalue-change-does-not-re-render-input

function Input({
  id,
  name,
  value,
  setValue,
  type,
  maxLength,
  placeholder,
  min,
  max,
  step,
  ref,
  setOnBlur = false,
}) {
  return (
    <StyledInput
      id={id}
      name={name}
      value={!setOnBlur ? value : undefined}
      defaultValue={setOnBlur ? value : undefined}
      key={setOnBlur ? crypto.randomUUID() : undefined}
      onInput={
        !setOnBlur
          ? (e) => {
              setValue(e.target.value);
            }
          : undefined
      }
      onBlur={
        setOnBlur
          ? (e) => {
              setValue(e.target.value);
            }
          : undefined
      }
      onKeyUp={(e) => {
        if (e.code == "Enter") {
          e.target.blur();
        }
      }}
      type={type}
      maxLength={maxLength}
      min={min}
      max={max}
      step={step}
      placeholder={placeholder}
      ref={ref}
    />
  );
}

export default Input;
