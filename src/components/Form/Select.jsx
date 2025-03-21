import StyledSelect from "./StyledSelect.jsx";

function Select({ id, name, value, options, setValue }) {
  return (
    <StyledSelect
      id={id}
      name={name}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {options.map((option, idx) => (
        <option key={idx} value={option}>
          {option}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
