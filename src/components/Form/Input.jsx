import StyledInput from "./StyledInput.jsx";

function Input({ id, name, value, setValue, type, maxLength, placeholder }) {
  return (
    <StyledInput
      id={id}
      name={name}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
      maxLength={maxLength}
      placeholder={placeholder}
    />
  );
}

export default Input;
