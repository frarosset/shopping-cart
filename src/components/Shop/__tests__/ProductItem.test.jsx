import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ProductItem from "../ProductItem.jsx";
import data from "../../../assets/data.json";
import { SavedProductsContextProvider } from "../../../contexts/SavedProductsContext.jsx";

const maxRating = data.maxRating;

const productData = {
  id: 10,
  title: "Product Title",
  thumbnail: "some/thumbnail/url",
  price: 10,
  discountPercentage: 25,
  discountPercentageStr: "-25 %",
  priceStr: "10 €",
  discountedPriceStr: "7.50 €",
  rating: 3.6,
  stock: 10,
};

const mockStarRatingIcons = vi.fn();
vi.mock("../../Icons/StarRatingIcons.jsx", () => ({
  default: (props) => {
    mockStarRatingIcons(props.rating, props.total);
    return (
      <span data-testid="__star-rating-icons__">
        {`star rating icons: ${props.rating} out of ${props.total}`}
      </span>
    );
  },
}));

const mockWishlistButton = vi.fn();
const mockAddToCartButton = vi.fn();
vi.mock("../StyledProductInfo.jsx", async () => {
  const actual = await vi.importActual("../StyledProductInfo.jsx");
  return {
    ...actual,
    WishlistButton: (props) => {
      mockWishlistButton(props.product);
      return <button>Wishlist</button>;
    },
    AddToCartButton: (props) => {
      mockAddToCartButton(props.product);
      return <button>AddToCartButton</button>;
    },
  };
});

/* mocks are hoisted: reset them before each test */
afterEach(() => {
  vi.resetAllMocks();
});

const customSetup = (data) => ({
  ...render(
    <SavedProductsContextProvider>
      <ProductItem productData={data} />
    </SavedProductsContextProvider>,
    {
      wrapper: MemoryRouter,
    }
  ),
});

const setup = () => customSetup(productData);

describe("ProductItem", () => {
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

  it("renders button to add a product to the cart", () => {
    setup();

    const addToCartButton = screen.queryByRole("button", {
      name: "AddToCartButton",
    });

    expect(mockAddToCartButton).toHaveBeenCalledExactlyOnceWith(productData);
    expect(addToCartButton).toBeInTheDocument();
  });

  it("renders the price of the product", () => {
    setup();

    const price = screen.getByText(productData.priceStr);

    expect(price).toBeInTheDocument();
  });

  it("renders the discount percentage of the product", () => {
    setup();

    const discount = screen.getByText(productData.discountPercentageStr);

    expect(discount).toBeInTheDocument();
  });

  it("doesn't render the discounted percentage of the product (if the discount is zero)", () => {
    const customData = Object.assign({}, productData, {
      discountPercentage: 0,
    });

    customSetup(customData);

    // with a 0 discountPercentage, both price and disconted price are the same: do not show that
    const discount = screen.queryByText(`-0 %`);
    const discountAlt = screen.queryByText(`-0%`);

    expect(discount).not.toBeInTheDocument();
    expect(discountAlt).not.toBeInTheDocument();
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

  it("renders the rating of the product", () => {
    setup();

    const rating = screen.getByText(productData.rating);

    expect(rating).toBeInTheDocument();
  });

  it("renders the star rating representation of the product", () => {
    setup();

    const starRatingIcons = screen.getByTestId("__star-rating-icons__");

    expect(mockStarRatingIcons).toHaveBeenCalledExactlyOnceWith(
      productData.rating,
      maxRating
    );
    expect(starRatingIcons).toBeInTheDocument();
  });

  it("doesn't render info about the availability if 'In stock'", () => {
    const stockStr = "In Stock";
    const customData = Object.assign({}, productData, {
      availabilityStatus: stockStr,
    });

    customSetup(customData);

    const stockInfo = screen.queryByText(stockStr);

    expect(stockInfo).not.toBeInTheDocument();
  });

  it("render info about the availability if 'Low stock'", () => {
    const stockStr = "Low Stock";
    const customData = Object.assign({}, productData, {
      availabilityStatus: stockStr,
    });

    customSetup(customData);

    const stockInfo = screen.queryByText(stockStr);

    expect(stockInfo).toBeInTheDocument();
  });

  it("render info about the availability if 'Out Of Stock'", () => {
    const stockStr = "Out of Stock";
    const customData = Object.assign({}, productData, {
      availabilityStatus: stockStr,
    });

    customSetup(customData);

    const stockInfo = screen.queryByText(stockStr);

    expect(stockInfo).toBeInTheDocument();
  });
});
