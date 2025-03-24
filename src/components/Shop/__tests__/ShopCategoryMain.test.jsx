import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ShopCategoryMain from "../ShopCategoryMain.jsx";
import { MemoryRouter, Route, Routes } from "react-router";
import { HeadingLevelContextProvider } from "../../../contexts/HeadingLevelContext.jsx";
import data from "../../../assets/data.json";

const sampleSection = Object.keys(data.sections)[0];
const sampleCategory = data.sections[sampleSection].categories[0];

const sampleCategoryRoute = `/shop/c/${sampleCategory}`;

const sampleSectionRoute = `shop/${sampleSection}`;
const sampleCategoryUrl = `/category/${sampleCategory}/url`;

const sampleCategoryName = data.categories[sampleCategory].name;
const sampleSectionName = data.sections[sampleSection].name;

const sampleSortBy = "title";
const sampleOrder = "asc";
const sampleSortBySelect = <span>Sort By Select</span>;

const mockGetCategoryProductsApiUrl = vi.fn();
vi.mock("../../../fetching-utils/getApiUrl.js", () => ({
  getCategoryProductsApiUrl: (category, obj) => {
    mockGetCategoryProductsApiUrl(category, obj.sortBy, obj.order);
    return sampleCategoryUrl;
  },
}));

vi.mock("../../../custom-hooks/useSortBy.jsx", () => ({
  default: () => {
    return {
      sortBy: sampleSortBy,
      order: sampleOrder,
      sortBySelect: sampleSortBySelect,
    };
  },
}));

const mockProductFetchList = vi.fn();
vi.mock("../ProductFetchList.jsx", () => ({
  default: ({ apiUrl, sortBySelect }) => {
    mockProductFetchList(apiUrl, sortBySelect);
    return <span data-testid="__product-fetch-list__">Product Fetch List</span>;
  },
}));

/* mocks are hoisted: reset them before each test */
afterEach(() => {
  vi.resetAllMocks();
});

const setup = (route) => {
  // see: https://stackoverflow.com/a/71655231
  return {
    ...render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route
            path="/shop/c/:category"
            element={
              <HeadingLevelContextProvider>
                <ShopCategoryMain />
              </HeadingLevelContextProvider>
            }
          />
        </Routes>
      </MemoryRouter>
    ),
  };
};

describe("ShopCategoryMain", () => {
  it("renders a heading of the associated category", () => {
    setup(sampleCategoryRoute);

    const heading = screen.getByRole("heading", { name: sampleCategoryName });

    expect(heading).toBeInTheDocument();
  });

  it("renders a list of products fetched based on the current category", () => {
    setup(sampleCategoryRoute);

    const productFetchList = screen.getByTestId("__product-fetch-list__");

    expect(mockGetCategoryProductsApiUrl).toHaveBeenCalledExactlyOnceWith(
      sampleCategory,
      sampleSortBy,
      sampleOrder
    );

    expect(mockProductFetchList).toHaveBeenCalledExactlyOnceWith(
      sampleCategoryUrl,
      sampleSortBySelect
    );

    expect(productFetchList).toBeInTheDocument();
  });

  it("renders links to the section page associated with the current category", () => {
    setup(sampleCategoryRoute);

    const basePath = window.location.href;
    const link = screen.getByRole("link", { name: sampleSectionName });

    expect(link).toBeInTheDocument();
    expect(link.href).toBe(`${basePath}${sampleSectionRoute}`);
  });
});
