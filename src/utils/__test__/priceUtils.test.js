import { describe, it, expect } from "vitest";
import {
  getPriceStr,
  getDiscountedPrice,
  getDiscountValue,
  getCartValue,
  getCartDiscountValue,
  getShippingFee,
  getCartSummary,
} from "../priceUtils.js";

const currency = "€";

const strPricesData = [
  { price: 10, priceStr: "10 €" },
  { price: 7.5, priceStr: "7.50 €" },
  { price: 7.25, priceStr: "7.25 €" },
];

const discountPricesData = [
  { price: 10, discount: 0, discountedPrice: 10, discountValue: 0 },
  { price: 10, discount: 25, discountedPrice: 7.5, discountValue: 2.5 },
];

const baseShippingFee = 6;
const freeShippingAt = 10;
const shippingFeeData = [
  { subtotal: freeShippingAt - 5, shippingFee: baseShippingFee },
  { subtotal: freeShippingAt, shippingFee: 0 },
  { subtotal: freeShippingAt + 5, shippingFee: 0 },
  { subtotal: 0, shippingFee: 0 },
];

const sampleCart = [
  {
    price: 10,
    discountPercentage: 20,
    inCart: 5,
  },
  {
    price: 100,
    discountPercentage: 75,
    inCart: 2,
  },
  {
    price: 1000,
    discountPercentage: 0,
    inCart: 1,
  },
];

const sampleCartValue = 10 * 5 + 100 * 2 + 1000 * 1;
const sampleCartDiscountValue =
  (10 * 5 * 20) / 100 + (100 * 2 * 75) / 100 + (1000 * 1 * 0) / 100;
const sampleSubtotal = sampleCartValue - sampleCartDiscountValue;
const sampleShippingFee = sampleSubtotal < freeShippingAt ? baseShippingFee : 0;
const sampleTotal = sampleSubtotal + sampleShippingFee;

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

  describe("getDiscount", () => {
    it("correctly computes the discount", () => {
      discountPricesData.forEach((data) => {
        const discountValue = getDiscountValue(data.price, data.discount);

        expect(discountValue).toBe(data.discountValue);
      });
    });
  });

  describe("getCartValue", () => {
    it("correctly computes the cart value when not-empty", () => {
      const cartSubtotal = getCartValue(sampleCart);

      expect(cartSubtotal).toBe(sampleCartValue);
    });

    it("correctly computes the cart value when it is empty", () => {
      const cartSubtotal = getCartValue([]);

      expect(cartSubtotal).toBe(0);
    });
  });

  describe("getCartDiscountValue", () => {
    it("correctly computes the cart discount value when not-empty", () => {
      const cartSubtotal = getCartDiscountValue(sampleCart);

      expect(cartSubtotal).toBe(sampleCartDiscountValue);
    });

    it("correctly computes the cart discount value when it is empty", () => {
      const cartSubtotal = getCartDiscountValue([]);

      expect(cartSubtotal).toBe(0);
    });
  });

  describe("getShippingFee", () => {
    it("correctly computes the shipping fees", () => {
      shippingFeeData.forEach((data) => {
        const shippingFee = getShippingFee(
          data.subtotal,
          baseShippingFee,
          freeShippingAt
        );

        expect(shippingFee).toBe(data.shippingFee);
      });
    });
  });

  describe("getCartSummary", () => {
    it("correctly computes the cart summary values when not-empty", () => {
      const {
        cartValue,
        cartDiscountValue,
        cartSubtotal,
        shippingFee,
        cartTotal,
      } = getCartSummary(sampleCart, baseShippingFee, freeShippingAt);

      expect(cartValue).toBe(sampleCartValue);
      expect(cartDiscountValue).toBe(sampleCartDiscountValue);
      expect(cartSubtotal).toBe(sampleSubtotal);
      expect(shippingFee).toBe(sampleShippingFee);
      expect(cartTotal).toBe(sampleTotal);
    });

    it("correctly computes the cart summary values when it is empty", () => {
      const {
        cartValue,
        cartDiscountValue,
        cartSubtotal,
        shippingFee,
        cartTotal,
      } = getCartSummary([], baseShippingFee, freeShippingAt);

      expect(cartValue).toBe(0);
      expect(cartDiscountValue).toBe(0);
      expect(cartSubtotal).toBe(0);
      expect(shippingFee).toBe(0);
      expect(cartTotal).toBe(0);
    });
  });
});
