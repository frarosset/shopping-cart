import StyledInput from "./StyledInput.jsx";

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
}) {
  return (
    <StyledInput
      id={id}
      name={name}
      value={value}
      onChange={(e) => setValue(e.target.value)}
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
