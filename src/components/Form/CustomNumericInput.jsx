import Input from "./Input.jsx";
import PlusIcon from "../Icons/PlusIcon.jsx";
import MinusIcon from "../Icons/MinusIcon.jsx";

// Note: currently this works only with numbers with step=1
const step = 1;

function CustomNumericInput({
  id,
  name = id,
  value,
  min,
  max,
  decrementValueCallback,
  incrementValueCallback,
  inputAriaLabel,
  decrementAriaLabel,
  incrementAriaLabel,
  className = "",
}) {
  return (
    <div className={className}>
      <button
        onClick={decrementValueCallback}
        disabled={value == min}
        aria-label={decrementAriaLabel}
      >
        <MinusIcon />
      </button>
      <Input
        id={id}
        name={name}
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        setOnBlur={true}
        ariaLabel={inputAriaLabel}
      />
      <button
        onClick={incrementValueCallback}
        disabled={value == max}
        aria-label={incrementAriaLabel}
      >
        <PlusIcon />
      </button>
    </div>
  );
}

export default CustomNumericInput;
