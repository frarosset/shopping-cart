import { describe, it, expect } from "vitest";
import { getSingleProductApiUrl } from "./getApiUrl.js";

describe("getApiUrl", () => {
  describe("getSingleProductApiUrl", () => {
    const productId = 3;
    const queries = { select: "title,price" };

    it(`returns the correct api url when an id (${productId}) is provided`, () => {
      const apiUrl = getSingleProductApiUrl(productId);
      expect(apiUrl).toMatchSnapshot();
    });

    it(`returns the correct api url when an id (${productId}) and a select query (${JSON.stringify(
      queries
    )}) are provided`, () => {
      const apiUrl = getSingleProductApiUrl(productId, queries);
      expect(apiUrl).toMatchSnapshot();
    });
  });
});
