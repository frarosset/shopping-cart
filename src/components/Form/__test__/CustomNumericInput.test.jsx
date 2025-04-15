import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { useState } from "react";
import CustomNumericInput from "../CustomNumericInput.jsx";
import userEvent from "@testing-library/user-event";

const mockSetValueCallback = vi.fn();
const mockDecrementValueCallback = vi.fn();
const mockIncrementValueCallback = vi.fn();

const sampleData = {
  id: "componentId",
  min: 1,
  max: 100,
  decrementValueCallback: mockDecrementValueCallback,
  incrementValueCallback: mockIncrementValueCallback,
  inputAriaLabel: "Set Value Aria Label",
  decrementAriaLabel: "Decrement Value Aria Label",
  incrementAriaLabel: "Increment Value Aria Label",
};

const getSampleData = (val, setValueCallback) => ({
  value: val,
  setValueCallback: setValueCallback,
  ...sampleData,
});

const validValue = 3; // min < validValue < max
const typedValue = 9; // min < validValue < max
const typedFractRoundUpValue = 9.7; // min < validValue < max
const typedFractRoundDownValue = 9.3; // min < validValue < max

vi.mock("../../Icons/PlusIcon.jsx", () => ({
  default: () => {
    return <span data-testid="__plus-icon__">{"Plus icon"}</span>;
  },
}));

vi.mock("../../Icons/MinusIcon.jsx", () => ({
  default: () => {
    return <span data-testid="__minus-icon__">{"Minus icon"}</span>;
  },
}));

/* mocks are hoisted: reset them before each test */
afterEach(() => {
  vi.resetAllMocks();
});

const setup = (initialValue) => {
  const Wrapper = () => {
    const [value, setValue] = useState(initialValue);
    const setValueCallback = (val) => {
      mockSetValueCallback(val);
      setValue(val);
    };

    return <CustomNumericInput {...getSampleData(value, setValueCallback)} />;
  };

  return {
    user: userEvent.setup(),
    ...render(<Wrapper />),
  };
};

const getElements = () => {
  const incrementButton = screen.getByRole("button", {
    name: sampleData.incrementAriaLabel,
  });
  const plusIcon = within(incrementButton).getByTestId("__plus-icon__");

  const decrementButton = screen.getByRole("button", {
    name: sampleData.decrementAriaLabel,
  });
  const minusIcon = within(decrementButton).getByTestId("__minus-icon__");

  // spinbutton = input with type="numeric"
  const getNumericInput = () =>
    screen.getByRole("spinbutton", {
      name: sampleData.inputAriaLabel,
    });

  const numericInput = getNumericInput();

  const el = {
    incrementButton,
    plusIcon,
    decrementButton,
    minusIcon,
    numericInput,
    updateReferenceOfNumericInput: function () {
      // useful if the component is unmounted and mounted again (see below)
      this.numericInput = getNumericInput();
    },
  };

  return el;
};

describe("CustomNumericInput", () => {
  it("correctly renders the component (when in range)", () => {
    setup(validValue);

    const el = getElements();

    expect(el.incrementButton).toBeInTheDocument();
    expect(el.plusIcon).toBeInTheDocument();
    expect(el.incrementButton).not.toBeDisabled();

    expect(el.decrementButton).toBeInTheDocument();
    expect(el.minusIcon).toBeInTheDocument();
    expect(el.decrementButton).not.toBeDisabled();

    expect(el.numericInput).toBeInTheDocument();
    expect(el.numericInput.value).toBe(String(validValue));
  });

  it("correctly renders the component (when at lower limit)", () => {
    setup(sampleData.min);

    const el = getElements();

    expect(el.incrementButton).toBeInTheDocument();
    expect(el.plusIcon).toBeInTheDocument();
    expect(el.incrementButton).not.toBeDisabled();

    expect(el.decrementButton).toBeInTheDocument();
    expect(el.minusIcon).toBeInTheDocument();
    expect(el.decrementButton).toBeDisabled();

    expect(el.numericInput).toBeInTheDocument();
    expect(el.numericInput.value).toBe(String(sampleData.min));
  });

  it("correctly renders the component (when at upper limit)", () => {
    setup(sampleData.max);

    const el = getElements();

    expect(el.incrementButton).toBeInTheDocument();
    expect(el.plusIcon).toBeInTheDocument();
    expect(el.incrementButton).toBeDisabled();

    expect(el.decrementButton).toBeInTheDocument();
    expect(el.minusIcon).toBeInTheDocument();
    expect(el.decrementButton).not.toBeDisabled();

    expect(el.numericInput).toBeInTheDocument();
    expect(el.numericInput.value).toBe(String(sampleData.max));
  });

  describe("increment button", () => {
    it("can increment the value (when min <= value < max)", async () => {
      const { user } = setup(validValue);

      const el = getElements();

      vi.resetAllMocks();
      await user.click(el.incrementButton);

      expect(mockDecrementValueCallback).not.toHaveBeenCalled();
      expect(mockIncrementValueCallback).toHaveBeenCalledOnce();
      expect(mockSetValueCallback).not.toHaveBeenCalled();
    });
  });

  describe("decrement button", () => {
    it("can decrement the value (when min < value <= max)", async () => {
      const { user } = setup(validValue);

      const el = getElements();

      vi.resetAllMocks();
      await user.click(el.decrementButton);

      expect(mockDecrementValueCallback).toHaveBeenCalledOnce();
      expect(mockIncrementValueCallback).not.toHaveBeenCalled();
      expect(mockSetValueCallback).not.toHaveBeenCalled();
    });
  });

  describe("numeric input", () => {
    // The Input component behaviour has already been tested.
    // In this component, the Input component is rendered with the setOnBlur prop set to true
    // For simplicity, in the following test the input has been cleared before setting a new value
    // and the blurring has been achieved by pressing Enter

    it(`can set the specified value (when min <= value <= max, onBlur)`, async () => {
      const { user } = setup(validValue);

      const el = getElements();

      vi.resetAllMocks();
      await user.clear(el.numericInput);
      await user.type(el.numericInput, String(typedValue) + "[Enter]");

      expect(mockDecrementValueCallback).not.toHaveBeenCalled();
      expect(mockIncrementValueCallback).not.toHaveBeenCalled();

      expect(el.numericInput.value).toBe(String(typedValue));
      expect(mockSetValueCallback).toHaveBeenCalledExactlyOnceWith(typedValue);
    });

    it(`rounds the value to set to the nearest integer (when min <= value <= max, fractional value, onBlur)`, async () => {
      const { user } = setup(validValue);

      const el = getElements();

      vi.resetAllMocks();
      await user.clear(el.numericInput);
      await user.type(
        el.numericInput,
        String(typedFractRoundUpValue) + "[Enter]"
      );

      // get again the input element (the Input component is
      // unmounted at each value change if setOnBlur prop is true
      // and the value changes)
      el.updateReferenceOfNumericInput();

      expect(el.numericInput.value).toBe(
        String(Math.round(typedFractRoundUpValue))
      );
      expect(mockSetValueCallback).toHaveBeenCalledExactlyOnceWith(
        Math.round(typedFractRoundUpValue)
      );

      vi.resetAllMocks();
      await user.clear(el.numericInput);
      await user.type(
        el.numericInput,
        String(typedFractRoundDownValue) + "[Enter]"
      );

      // see above
      el.updateReferenceOfNumericInput();

      expect(el.numericInput.value).toBe(
        String(Math.round(typedFractRoundDownValue))
      );
      expect(mockSetValueCallback).toHaveBeenCalledExactlyOnceWith(
        Math.round(typedFractRoundDownValue)
      );
    });

    it(`clips the value to set out of bound (when value < min OR value > max, onBlur)`, async () => {
      const { user } = setup(validValue);

      const el = getElements();

      vi.resetAllMocks();
      await user.clear(el.numericInput);
      await user.type(el.numericInput, String(sampleData.min - 1) + "[Enter]");

      // see above
      el.updateReferenceOfNumericInput();

      expect(el.numericInput.value).toBe(String(sampleData.min));
      expect(mockSetValueCallback).toHaveBeenCalledExactlyOnceWith(
        sampleData.min
      );

      vi.resetAllMocks();
      await user.clear(el.numericInput);
      await user.type(el.numericInput, String(sampleData.max + 10) + "[Enter]");

      // see above
      el.updateReferenceOfNumericInput();

      expect(el.numericInput.value).toBe(String(Math.round(sampleData.max)));
      expect(mockSetValueCallback).toHaveBeenCalledExactlyOnceWith(
        Math.round(sampleData.max)
      );
    });

    it(`set the value of 1 when the input is empty (when value = "")`, async () => {
      const { user } = setup("");

      const el = getElements();

      expect(el.numericInput.value).toBe(String(1));
      expect(mockSetValueCallback).not.toHaveBeenCalled();

      // type something and then clear

      vi.resetAllMocks();

      await user.type(el.numericInput, String(validValue) + "[Enter]");

      // see above
      el.updateReferenceOfNumericInput();

      vi.resetAllMocks();
      await user.clear(el.numericInput);
      await user.keyboard("[Enter]");

      // see above
      el.updateReferenceOfNumericInput();

      expect(el.numericInput.value).toBe(String(1));
      expect(mockSetValueCallback).toHaveBeenCalledExactlyOnceWith(1);
    });
  });
});
