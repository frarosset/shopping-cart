import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CartProductItem from "../CartProductItem.jsx";
import SavedProductsContext from "../../../contexts/SavedProductsContext.jsx";

const productData = {
  id: 10,
  title: "Product Title",
  thumbnail: "some/thumbnail/url",
  price: 10,
  discountPercentage: 25,
  inCart: 4,
  discountPercentageStr: "-25 %",
  priceStr: "10 €",
  discountedPriceStr: "7.50 €",
  inCartDiscountedValue: "30 €",
  rating: 3.6,
  stock: 10,
};

const mockWishlistButton = vi.fn();
const mockEditItemsInCart = vi.fn();
const mockRemoveFromCartButton = vi.fn();
vi.mock("../StyledProductInfo.jsx", async () => {
  const actual = await vi.importActual("../StyledProductInfo.jsx");
  return {
    ...actual,
    WishlistButton: (props) => {
      mockWishlistButton(props.product);
      return <button>Wishlist</button>;
    },
    EditItemsInCart: (props) => {
      mockEditItemsInCart(props.product);
      return <button>EditItemsInCart</button>;
    },
    RemoveFromCartButton: (props) => {
      mockRemoveFromCartButton(props.product);
      return <button>RemoveFromCart</button>;
    },
  };
});

/* mocks are hoisted: reset them before each test */
afterEach(() => {
  vi.resetAllMocks();
});

const customSetup = (data) => ({
  ...render(
    <SavedProductsContext.Provider value={{ inCart: () => data.inCart }}>
      <CartProductItem productData={data} />
    </SavedProductsContext.Provider>,
    {
      wrapper: MemoryRouter,
    }
  ),
});

const setup = () => customSetup(productData);

describe("CartProductItem", () => {
  it("renders a heading with the product title", () => {
    setup();

    // screen.debug();

    const productTitle = screen.getByRole("heading", {
      name: productData.title,
    });

    expect(productTitle).toBeInTheDocument();
  });

  it("renders a link to /shop/p/:productId page", () => {
    setup();

    const routeTo = `shop/p/${productData.id}`;
    const basePath = window.location.href;
    const link = screen.getByRole("link");

    expect(link).toBeInTheDocument();
    expect(link.href).toBe(`${basePath}${routeTo}`);
  });

  it("renders a thumbnail of the product", () => {
    setup();

    const basePath = window.location.href;
    const img = screen.getByRole("img");

    expect(img).toBeInTheDocument();
    expect(img.src).toBe(basePath + productData.thumbnail);
    expect(img.alt).toBe(productData.title);
  });

  it("renders button to toggle the wishlish status of the product", () => {
    setup();

    const wishlistButton = screen.queryByRole("button", { name: "Wishlist" });

    expect(mockWishlistButton).toHaveBeenCalledExactlyOnceWith(productData);
    expect(wishlistButton).toBeInTheDocument();
  });

  it("renders a component to edit the number of items in the cart", () => {
    setup();

    const editItemsInCart = screen.queryByRole("button", {
      name: "EditItemsInCart",
    });

    expect(mockEditItemsInCart).toHaveBeenCalledExactlyOnceWith(productData);
    expect(editItemsInCart).toBeInTheDocument();
  });

  it("renders button to remove the product from the cart", () => {
    setup();

    const removeFromCartButton = screen.queryByRole("button", {
      name: "RemoveFromCart",
    });

    expect(mockRemoveFromCartButton).toHaveBeenCalledExactlyOnceWith(
      productData
    );
    expect(removeFromCartButton).toBeInTheDocument();
  });

  it("renders the price of the product", () => {
    setup();

    const price = screen.getByText(productData.priceStr);

    expect(price).toBeInTheDocument();
  });

  it("renders the in cart discounted value of the product", () => {
    setup();

    const inCartPrice = screen.getByText(productData.inCartDiscountedValue);

    expect(inCartPrice).toBeInTheDocument();
  });

  it("renders the discounted price of the product (if the discount is non-zero)", () => {
    setup();

    const discountedPrice = screen.getByText(productData.discountedPriceStr);

    expect(discountedPrice).toBeInTheDocument();
  });

  it("doesn't render the discounted price of the product (if the discount is zero)", () => {
    const customData = Object.assign({}, productData, {
      discountPercentage: 0,
    });

    customSetup(customData);

    // with a 0 discountPercentage, both price and disconted price are the same: do not show that
    const prices = screen.getAllByText(productData.priceStr);

    expect(prices.length).toBe(1);
  });
});
