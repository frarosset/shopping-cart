import { describe, it, expect } from "vitest";
import { getPriceStr } from "../../components/Shop/priceUtils.js";

const currency = "€";

const strPricesData = [
  { price: 10, priceStr: "10 €" },
  { price: 7.5, priceStr: "7.50 €" },
  { price: 7.25, priceStr: "7.25 €" },
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
});
