import PlusIcon from "../Icons/PlusIcon.jsx";
import MinusIcon from "../Icons/MinusIcon.jsx";

function CustomNumericInput({
  value,
  min,
  max,
  decrementValueCallback,
  incrementValueCallback,
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
