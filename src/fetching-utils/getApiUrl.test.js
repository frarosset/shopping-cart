import { describe, it, expect } from "vitest";
import { getSingleProductApiUrl } from "./getApiUrl.js";

describe("getApiUrl", () => {
  describe("getSingleProductApiUrl", () => {
    const productId = 3;

    it(`returns the correct api url when an id (${productId}) is provided`, () => {
      const apiUrl = getSingleProductApiUrl(productId);
      expect(apiUrl).toMatchSnapshot();
    });
  });
});
