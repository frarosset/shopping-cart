import { describe, it, expect } from "vitest";
import { getSingleProductApiUrl, getAllProductsApiUrl } from "./getApiUrl.js";

describe("getApiUrl", () => {
  describe("getSingleProductApiUrl", () => {
    const productId = 3;
    const queries = { select: "title,price" };
    const queriesWithNotApiQuery = {
      select: "title,price",
      notApiQuery: "value",
    };

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

    it("ignores query keys that are not part of the api", () => {
      const apiUrl = getSingleProductApiUrl(productId, queries);
      const apiUrlWithNotApiQuery = getSingleProductApiUrl(
        productId,
        queriesWithNotApiQuery
      );

      expect(apiUrl).toEqual(apiUrlWithNotApiQuery);
    });
  });

  describe("getAllProductsApiUrl", () => {
    it(`returns the correct api url`, () => {
      const apiUrl = getAllProductsApiUrl();
      expect(apiUrl).toMatchSnapshot();
    });
  });
});
