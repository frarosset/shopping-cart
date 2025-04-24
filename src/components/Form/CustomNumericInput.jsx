import Input from "./Input.jsx";
import PlusIcon from "../Icons/PlusIcon.jsx";
import MinusIcon from "../Icons/MinusIcon.jsx";
import styled from "styled-components";

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
    <StyledCustomNumericInput className={className}>
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
        disabled={max === min}
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
    </StyledCustomNumericInput>
  );
}

const StyledCustomNumericInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid var(--col-txt);
  border-radius: calc((1lh + var(--small-gap)) / 2);

  max-width: max-content;

  button {
    padding: var(--small-gap);
  }

  button:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }

  input {
    text-align: center;
    width: 3em;
    min-width: max-content;
  }

  /* WebKit and Blink */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
`;

export default CustomNumericInput;
