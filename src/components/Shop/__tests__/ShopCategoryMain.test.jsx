import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ShopCategoryMain from "../ShopCategoryMain.jsx";
import data from "../../../assets/data.json";

const sampleCategory = Object.keys(data.categories)[0];
const sampleCategoryUrl = `/category/${sampleCategory}/url`;
const sampleCategoryName = data.categories[sampleCategory].name;

const mockUseParams = vi.fn();
vi.mock("react-router-dom", () => ({
  useParams: (props) => {
    mockUseParams(props);
    return { category: sampleCategory };
  },
}));

const mockGetCategoryProductsApiUrl = vi.fn();
vi.mock("../../../fetching-utils/getApiUrl.js", () => ({
  getCategoryProductsApiUrl: (category) => {
    mockGetCategoryProductsApiUrl(category);
    return sampleCategoryUrl;
  },
}));

const mockProductFetchList = vi.fn();
vi.mock("../ProductFetchList.jsx", () => ({
  default: ({ apiUrl }) => {
    mockProductFetchList(apiUrl);
    return <span data-testid="__product-fetch-list__">Product Fetch List</span>;
  },
}));

/* mocks are hoisted: reset them before each test */
beforeEach(() => {
  vi.resetAllMocks();
});

const setup = () => {
  return {
    ...render(<ShopCategoryMain />),
  };
};

describe("ShopCategoryMain", () => {
  it("gets the category param from the url", () => {
    setup();

    expect(mockUseParams).toHaveBeenCalledOnce();
  });

  it("renders a heading of the associated category", () => {
    setup();

    const heading = screen.getByRole("heading", { name: sampleCategoryName });

    expect(heading).toBeInTheDocument();
  });

  it("renders a list of products fetched based on the current category", () => {
    setup();

    const productFetchList = screen.getByTestId("__product-fetch-list__");

    expect(mockGetCategoryProductsApiUrl).toHaveBeenCalledExactlyOnceWith(
      sampleCategory
    );

    expect(mockProductFetchList).toHaveBeenCalledExactlyOnceWith(
      sampleCategoryUrl
    );

    expect(productFetchList).toBeInTheDocument();
  });
});
