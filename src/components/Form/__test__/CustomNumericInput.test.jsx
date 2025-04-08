import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import CustomNumericInput from "../CustomNumericInput.jsx";
import userEvent from "@testing-library/user-event";

const mockSetValueCallback = vi.fn();
const mockDecrementValueCallback = vi.fn();
const mockIncrementValueCallback = vi.fn();

const sampleData = {
  min: 1,
  max: 5,
  decrementValueCallback: mockDecrementValueCallback,
  incrementValueCallback: mockIncrementValueCallback,
  decrementAriaLabel: "Decrement Value Aria Label",
  incrementAriaLabel: "Increment Value Aria Label",
};

const getSampleData = (val) => ({
  value: val,
  ...sampleData,
});

const validValue = 3; // min < validValue < max

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

const setup = (value) => {
  return {
    user: userEvent.setup(),
    ...render(<CustomNumericInput {...getSampleData(value)} />),
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

  return {
    incrementButton,
    plusIcon,
    decrementButton,
    minusIcon,
  };
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
  });

  it("can increment the value (when min <= value < max)", async () => {
    const { user } = setup(validValue);

    const el = getElements();

    vi.resetAllMocks();
    await user.click(el.incrementButton);

    expect(mockSetValueCallback).not.toHaveBeenCalled();
    expect(mockDecrementValueCallback).not.toHaveBeenCalled();
    expect(mockIncrementValueCallback).toHaveBeenCalledOnce();
  });

  it("can decrement the value (when min < value <= max)", async () => {
    const { user } = setup(validValue);

    const el = getElements();

    vi.resetAllMocks();
    await user.click(el.decrementButton);

    expect(mockSetValueCallback).not.toHaveBeenCalled();
    expect(mockDecrementValueCallback).toHaveBeenCalledOnce();
    expect(mockIncrementValueCallback).not.toHaveBeenCalled();
  });
});
