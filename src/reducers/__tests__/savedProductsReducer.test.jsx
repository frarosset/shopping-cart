import { describe, it, expect } from "vitest";
import savedProductsReducer from "../savedProductsReducer.jsx";

function createProduct(id) {
  return { id, data: `data${id}` };
}

function createSavedProduct(id, inCart, inWishlist) {
  return { ...createProduct(id), inCart, inWishlist };
}

function generateSavedProducts(arr) {
  const productList = arr.reduce((obj, data) => {
    obj[data[0]] = createSavedProduct(...data);
    return obj;
  }, {});

  const wishlist = arr.filter((itm) => itm[2]).map((itm) => itm[0]);
  const cart = arr.filter((itm) => itm[1]).map((itm) => itm[0]);
  const cartItems = arr.reduce((sum, itm) => sum + itm[1], 0);

  return { productList, wishlist, cart, cartItems };
}

const initialProducts = [
  [0, 4, true],
  [1, 0, true],
  [2, 1, false],
  [3, 0, false],
];

const savedProducts = generateSavedProducts(initialProducts);

const setup = (type, product, count) =>
  savedProductsReducer(savedProducts, {
    type,
    product,
    count,
  });

describe("savedProductsReducer", () => {
  it("test internal generateSavedProducts", () => {
    const expectedSavedProducts = {
      productList: {
        0: { id: 0, data: "data0", inCart: 4, inWishlist: true },
        1: { id: 1, data: "data1", inCart: 0, inWishlist: true },
        2: { id: 2, data: "data2", inCart: 1, inWishlist: false },
        3: { id: 3, data: "data3", inCart: 0, inWishlist: false },
      },
      wishlist: [0, 1],
      cart: [0, 2],
      cartItems: 5,
    };

    expect(savedProducts).toEqual(expectedSavedProducts);
  });

  describe("addToWishlist", () => {
    it("add a non-saved product to the wishlist (4)", () => {
      const results = setup("addToWishlist", createProduct(4));

      const expected = generateSavedProducts([
        ...initialProducts,
        [4, 0, true],
      ]);

      expect(results).toEqual(expected);
    });

    it("add a saved product to the wishlist (3)", () => {
      const results = setup("addToWishlist", createProduct(3));

      const copiedProducts = structuredClone([...initialProducts]);
      copiedProducts[3][2] = true;
      const expected = generateSavedProducts(copiedProducts);

      expect(results).toEqual(expected);
    });

    it("do nothing if the saved product is already in the wishlist (0)", () => {
      const results = setup("addToWishlist", createProduct(0));

      expect(results).toEqual(savedProducts);
    });
  });

  describe("removeFromWishlist", () => {
    it("remove a product from the wishlist (1)", () => {
      const results = setup("removeFromWishlist", createProduct(1));

      const copiedProducts = structuredClone([...initialProducts]);
      copiedProducts[1][2] = false;
      const expected = generateSavedProducts(copiedProducts);

      expect(results).toEqual(expected);
    });

    it("do nothing if the saved product is not in the wishlist (4)", () => {
      const results = setup("removeFromWishlist", createProduct(4));

      expect(results).toEqual(savedProducts);
    });
  });

  describe("toggleWishlist", () => {
    it("add a non-saved product to the wishlist (4)", () => {
      const results = setup("toggleWishlist", createProduct(4));

      const expected = generateSavedProducts([
        ...initialProducts,
        [4, 0, true],
      ]);

      expect(results).toEqual(expected);
    });

    it("add a saved product to the wishlist (3)", () => {
      const results = setup("toggleWishlist", createProduct(3));

      const copiedProducts = structuredClone([...initialProducts]);
      copiedProducts[3][2] = true;
      const expected = generateSavedProducts(copiedProducts);

      expect(results).toEqual(expected);
    });

    it("remove a product from the wishlist (1)", () => {
      const results = setup("toggleWishlist", createProduct(1));

      const copiedProducts = structuredClone([...initialProducts]);
      copiedProducts[1][2] = false;
      const expected = generateSavedProducts(copiedProducts);

      expect(results).toEqual(expected);
    });
  });

  describe("addToCart", () => {
    it("add a non-saved product to the cart (4)", () => {
      const results = setup("addToCart", createProduct(4));

      const expected = generateSavedProducts([
        ...initialProducts,
        [4, 1, false],
      ]);

      expect(results).toEqual(expected);
    });

    it("add a saved product to the cart (3)", () => {
      const results = setup("addToCart", createProduct(3));

      const copiedProducts = structuredClone([...initialProducts]);
      copiedProducts[3][1] = 1;
      const expected = generateSavedProducts(copiedProducts);

      expect(results).toEqual(expected);
    });

    it("add another product if it is already in the wishlist (0)", () => {
      const results = setup("addToCart", createProduct(0));

      const copiedProducts = structuredClone([...initialProducts]);
      copiedProducts[0][1] += 1;
      const expected = generateSavedProducts(copiedProducts);

      expect(results).toEqual(expected);
    });
  });

  describe("addMultipleToCart", () => {
    it("add 4 items of a non-saved product to the cart (4)", () => {
      const results = setup("addMultipleToCart", createProduct(4), 4);

      const expected = generateSavedProducts([
        ...initialProducts,
        [4, 4, false],
      ]);

      expect(results).toEqual(expected);
    });

    it("add 4 items of a saved product to the cart (3)", () => {
      const results = setup("addMultipleToCart", createProduct(3), 4);

      const copiedProducts = structuredClone([...initialProducts]);
      copiedProducts[3][1] = 4;
      const expected = generateSavedProducts(copiedProducts);

      expect(results).toEqual(expected);
    });

    it("add another 4 items of a product if it is already in the wishlist (0)", () => {
      const results = setup("addMultipleToCart", createProduct(0), 4);

      const copiedProducts = structuredClone([...initialProducts]);
      copiedProducts[0][1] += 4;
      const expected = generateSavedProducts(copiedProducts);

      expect(results).toEqual(expected);
    });
  });
});
