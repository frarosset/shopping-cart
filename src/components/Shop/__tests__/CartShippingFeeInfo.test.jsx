import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CartShippingFeeInfo from "../CartShippingFeeInfo.jsx";
import { getPriceStr } from "../../../utils/priceUtils.js";

const setup = (toAddForFreeShipping) => ({
  ...render(
    <CartShippingFeeInfo toAddForFreeShipping={toAddForFreeShipping} />
  ),
});

describe("CartShippingFeeInfo", () => {
  it("renders the correct message when the amount to get free shipping is reached", () => {
    setup(0);

    const text = screen.getByText("You are eligible", {
      exact: false,
    });

    expect(text.textContent).toEqual("You are eligible for FREE shipping");
  });

  it("renders the correct message when the amount to get free shipping is not reached", () => {
    const toAddForFreeShipping = 10;
    setup(toAddForFreeShipping);

    const text = screen.getByText("Add at least", {
      exact: false,
    });

    expect(text.textContent).toEqual(
      `Add at least ${getPriceStr(
        toAddForFreeShipping
      )} to your cart to get FREE shipping`
    );
  });
});
