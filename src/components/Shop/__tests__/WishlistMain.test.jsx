import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import WishlistMain from "../WishlistMain.jsx";
import { MemoryRouter } from "react-router";
import { HeadingLevelContextProvider } from "../../../contexts/HeadingLevelContext.jsx";
import SavedProductsContext from "../../../contexts/SavedProductsContext.jsx";

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

const mockProductList = vi.fn();
vi.mock("../ProductList.jsx", () => ({
  default: ({ productDataList }) => {
    mockProductList(productDataList);
    return <span data-testid="__product-list__">Product Fetch List</span>;
  },
}));

/* mocks are hoisted: reset them before each test */
afterEach(() => {
  vi.resetAllMocks();
});

const setup = (savedProducts = { wishlist: [] }) => {
  return {
    ...render(
      <MemoryRouter>
        <SavedProductsContext value={savedProducts}>
          <HeadingLevelContextProvider>
            <WishlistMain />
          </HeadingLevelContextProvider>
        </SavedProductsContext>
      </MemoryRouter>
    ),
  };
};

describe("ShopCategoryMain", () => {
  it("renders a heading with the Wishlist text", () => {
    setup();

    const heading = screen.getByRole("heading", "Wishlist");

    expect(heading).toBeInTheDocument();
  });

  it("renders an empty list message and a link to the shop page when empty wishlist", () => {
    // the wishlist is empty at initialization

    setup();

    const productList = screen.queryByTestId("__product-list__");
    const emptyText = screen.getByText("Your wishlist is empty!");
    const linkToShopPage = screen.getByRole("link");

    expect(mockProductList).not.toHaveBeenCalled();

    expect(productList).not.toBeInTheDocument();
    expect(emptyText).toBeInTheDocument();
    expect(linkToShopPage).toBeInTheDocument();
  });

  it("renders an empty ..", async () => {
    setup({ wishlist: [productData] });

    const productList = screen.getByTestId("__product-list__");
    const emptyText = screen.queryByText("Your wishlist is empty!");
    const linkToShopPage = screen.queryByRole("link");

    expect(mockProductList).toHaveBeenCalledWith([productData]);

    expect(productList).toBeInTheDocument();
    expect(emptyText).not.toBeInTheDocument();
    expect(linkToShopPage).not.toBeInTheDocument();
  });
});
