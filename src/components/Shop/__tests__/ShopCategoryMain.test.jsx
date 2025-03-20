import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ShopCategoryMain from "../ShopCategoryMain.jsx";
import { MemoryRouter } from "react-router";
import data from "../../../assets/data.json";

const sampleSection = Object.keys(data.sections)[0];
const sampleCategory = data.sections[sampleSection].categories[0];

const sampleSectionRoute = `shop/${sampleSection}`;
const sampleCategoryUrl = `/category/${sampleCategory}/url`;

const sampleCategoryName = data.categories[sampleCategory].name;
const sampleSectionName = data.sections[sampleSection].name;

const mockUseParams = vi.fn();
vi.mock("react-router-dom", async (useActualImplementation) => {
  return {
    ...(await useActualImplementation()), // import actual Link
    useParams: (props) => {
      mockUseParams(props);
      return { category: sampleCategory };
    },
  };
});

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
afterEach(() => {
  vi.resetAllMocks();
});

const setup = () => {
  return {
    ...render(<ShopCategoryMain />, { wrapper: MemoryRouter }),
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

  it("renders links to the section page associated with the current category", () => {
    setup();

    const basePath = window.location.href;
    const link = screen.getByRole("link", { name: sampleSectionName });

    expect(link).toBeInTheDocument();
    expect(link.href).toBe(`${basePath}${sampleSectionRoute}`);
  });
});
