import { describe, it, expect } from "vitest";
import { getPriceStr, getDiscountedPrice } from "../priceUtils.js";

const currency = "€";

const strPricesData = [
  { price: 10, priceStr: "10 €" },
  { price: 7.5, priceStr: "7.50 €" },
  { price: 7.25, priceStr: "7.25 €" },
];

const discountPricesData = [
  { price: 10, discount: 0, discountedPrice: 10 },
  { price: 10, discount: 25, discountedPrice: 7.5 },
];

describe("priceUtils", () => {
  describe("getPriceStr", () => {
    it("correctly convert prices to string", () => {
      strPricesData.forEach((data) => {
        const priceStr = getPriceStr(data.price, currency);

        expect(priceStr).toBe(data.priceStr);
      });
    });
  });

  describe("getDiscountedPrice", () => {
    it("correctly computes the discounted prices", () => {
      discountPricesData.forEach((data) => {
        const discountedPrice = getDiscountedPrice(data.price, data.discount);

        expect(discountedPrice).toBe(data.discountedPrice);
      });
    });
  });
});
