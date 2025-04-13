import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { useState } from "react";
import Input from "../Input.jsx";
import userEvent from "@testing-library/user-event";

const inputTypes = [
  {
    type: "text",
    role: "textbox",
    validValue: "hello",
    typedValue: "world",
    getValueWithExpectedType(args) {
      return args.join("");
    },
  },
  {
    type: "number",
    role: "spinbutton",
    validValue: 3,
    typedValue: 91,
    getValueWithExpectedType(args) {
      return Number(args.join(""));
    },
  },
];

const clearBeforeVariant = [
  {
    clearBefore: true,
    clearBeforeLabel: "clearing input before typing",
  },
  {
    clearBefore: false,
    clearBeforeLabel: "without clearing input before typing",
  },
];
const unBlurVariant = [
  {
    unblurFcn: (user) => user.keyboard("{Enter}"),
    unblurFcnLabel: "pressing enter after typing",
  },
  {
    unblurFcn: (user) => user.click(document.body),
    unblurFcnLabel: "unblurring by clicking elsewere after typing",
  },
  {
    unblurFcn: (user) => user.tab(),
    unblurFcnLabel: "unblurring by pressing Tab after typing",
  },
];

const mockSetValue = vi.fn();

afterEach(() => {
  vi.resetAllMocks();
});

const getSampleData = (value, setValue, setOnBlur, type) => ({
  id: "componentId",
  value: value,
  setValue: setValue,
  setOnBlur: setOnBlur,
  type: type,
});

const setup = (initialValue, setOnBlur, type) => {
  const Wrapper = () => {
    const [value, setValue] = useState(initialValue);
    const setValueCallback = (val) => {
      mockSetValue(val);
      setValue(val);
    };

    return (
      <Input {...getSampleData(value, setValueCallback, setOnBlur, type)} />
    );
  };

  return {
    user: userEvent.setup(),
    ...render(<Wrapper />),
  };
};

describe("Input", () => {
  describe("setOnInput", () => {
    const setOnBlur = false;
    inputTypes.forEach(
      ({ type, role, validValue, typedValue, getValueWithExpectedType }) => {
        describe(`Input with type=${type}`, () => {
          it("correctly renders the component", () => {
            setup(validValue, setOnBlur, type);

            const input = screen.getByRole(role);

            expect(input).toBeInTheDocument();
            expect(input.value).toBe(String(validValue));
          });

          clearBeforeVariant.forEach(({ clearBefore, clearBeforeLabel }) => {
            it(`can set the specified value (${clearBeforeLabel})`, async () => {
              const { user } = setup(validValue, setOnBlur, type);

              const input = screen.getByRole(role);

              const [finalValue, args] = String(typedValue)
                .split("")
                .reduce(
                  ([str, args], ch) => {
                    const newStr = getValueWithExpectedType([str, ch]);

                    args.push([newStr]);

                    return [newStr, args];
                  },
                  clearBefore
                    ? ["", [[getValueWithExpectedType([""])]]]
                    : [validValue, []]
                );

              vi.resetAllMocks();
              if (clearBefore) {
                await user.clear(input);
              }
              await user.type(input, String(typedValue));

              expect(input.value).toBe(String(finalValue));
              expect(mockSetValue).toHaveBeenCalledTimes(
                (clearBefore ? 1 : 0) + String(typedValue).length
              );

              expect(mockSetValue.mock.calls).toEqual(args);
            });
          });
        });
      }
    );
  });

  describe("setOnBlur", () => {
    const setOnBlur = true;
    inputTypes.forEach(
      ({ type, role, validValue, typedValue, getValueWithExpectedType }) => {
        describe(`Input with type=${type}`, () => {
          it("correctly renders the component", () => {
            setup(validValue, setOnBlur, type);

            const input = screen.getByRole(role);

            expect(input).toBeInTheDocument();
            expect(input.value).toBe(String(validValue));
          });

          clearBeforeVariant.forEach(({ clearBefore, clearBeforeLabel }) => {
            unBlurVariant.forEach(({ unblurFcn, unblurFcnLabel }) => {
              it(`can set the specified value (${clearBeforeLabel}, ${unblurFcnLabel})`, async () => {
                const { user } = setup(validValue, setOnBlur, type);

                const input = screen.getByRole(role);
                const finalValue = clearBefore
                  ? typedValue
                  : getValueWithExpectedType([validValue, typedValue]);

                vi.resetAllMocks();
                if (clearBefore) {
                  await user.clear(input);
                }
                await user.type(input, String(typedValue));
                await unblurFcn(user); // move the focus away

                expect(input.value).toBe(String(finalValue));
                expect(mockSetValue).toHaveBeenCalledExactlyOnceWith(
                  finalValue
                );
              });
            });
          });

          it("does not set the specified value (without unblurring or pressing Enter after typing)", async () => {
            const { user } = setup(validValue, setOnBlur, type);

            const input = screen.getByRole(role);

            vi.resetAllMocks();
            await user.clear(input);
            await user.type(input, String(typedValue));

            expect(input.value).toBe(String(typedValue));
            expect(mockSetValue).not.toHaveBeenCalled();
          });
        });
      }
    );
  });
});
