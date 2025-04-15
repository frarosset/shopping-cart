import Input from "./Input.jsx";
import PlusIcon from "../Icons/PlusIcon.jsx";
import MinusIcon from "../Icons/MinusIcon.jsx";

// Note: currently this works only with numbers with step=1
const step = 1;

const getValue = (value, min, max) =>
  Math.round(Math.max(Math.min(Number(value || 0), max), min));

function CustomNumericInput({
  id,
  name = id,
  value,
  min,
  max,
  setValueCallback,
  decrementValueCallback,
  incrementValueCallback,
  inputAriaLabel,
  decrementAriaLabel,
  incrementAriaLabel,
  className = "",
}) {
  const actualValue = getValue(value, min, max);

  return (
    <div className={className}>
      <button
        onClick={decrementValueCallback}
        disabled={actualValue == min}
        aria-label={decrementAriaLabel}
      >
        <MinusIcon />
      </button>
      <Input
        id={id}
        name={name}
        type="number"
        value={actualValue}
        setValue={(value) => {
          const valToSet = getValue(value, min, max);
          setValueCallback(valToSet);
        }}
        min={min}
        max={max}
        step={step}
        setOnBlur={true}
        ariaLabel={inputAriaLabel}
      />
      <button
        onClick={incrementValueCallback}
        disabled={actualValue == max}
        aria-label={incrementAriaLabel}
      >
        <PlusIcon />
      </button>
    </div>
  );
}

export default CustomNumericInput;
