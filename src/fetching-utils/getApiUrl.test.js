import { describe, it, expect } from "vitest";
import {
  getSingleProductApiUrl,
  getAllProductsApiUrl,
  getCategoryProductsApiUrl,
  getSearchProductsApiUrl,
} from "./getApiUrl.js";

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

    it("ignores query keys that are not part of the api", () => {
      const queriesWithNotApiQuery = {
        ...queries,
        notApiQuery: "value",
      };

      const apiUrl = getSingleProductApiUrl(productId, queries);
      const apiUrlWithNotApiQuery = getSingleProductApiUrl(
        productId,
        queriesWithNotApiQuery
      );

      expect(apiUrl).toEqual(apiUrlWithNotApiQuery);
    });
  });

  describe("getAllProductsApiUrl", () => {
    const queries = {
      limit: 5,
      skip: 100,
      select: "title,price",
      sortBy: "price",
      order: "asc",
    };

    it(`returns the correct api url`, () => {
      const apiUrl = getAllProductsApiUrl();
      expect(apiUrl).toMatchSnapshot();
    });

    it(`returns the correct api url when queries (${JSON.stringify(
      queries
    )}) are provided`, () => {
      const apiUrl = getAllProductsApiUrl(queries);
      expect(apiUrl).toMatchSnapshot();
    });

    it("ignores query keys that are not part of the api", () => {
      const queriesWithNotApiQuery = {
        ...queries,
        notApiQuery: "value",
      };

      const apiUrl = getAllProductsApiUrl(queries);
      const apiUrlWithNotApiQuery = getAllProductsApiUrl(
        queriesWithNotApiQuery
      );

      expect(apiUrl).toEqual(apiUrlWithNotApiQuery);
    });
  });

  describe("getCategoryProductsApiUrl", () => {
    const category = "laptops";
    const queries = {
      limit: 5,
      skip: 3,
      select: "title,price",
      sortBy: "price",
      order: "asc",
    };

    it(`returns the correct api url`, () => {
      const apiUrl = getCategoryProductsApiUrl(category);
      expect(apiUrl).toMatchSnapshot();
    });

    it(`returns the correct api url when queries (${JSON.stringify(
      queries
    )}) are provided`, () => {
      const apiUrl = getCategoryProductsApiUrl(category, queries);
      expect(apiUrl).toMatchSnapshot();
    });

    it("ignores query keys that are not part of the api", () => {
      const queriesWithNotApiQuery = {
        ...queries,
        notApiQuery: "value",
      };

      const apiUrl = getCategoryProductsApiUrl(category, queries);
      const apiUrlWithNotApiQuery = getCategoryProductsApiUrl(
        category,
        queriesWithNotApiQuery
      );

      expect(apiUrl).toEqual(apiUrlWithNotApiQuery);
    });
  });

  describe("getSearchProductsApiUrl", () => {
    const searchQuery = "apple";

    it(`returns the correct api url when a search query is provided`, () => {
      const apiUrl = getSearchProductsApiUrl(searchQuery);
      expect(apiUrl).toMatchSnapshot();
    });
  });
});
