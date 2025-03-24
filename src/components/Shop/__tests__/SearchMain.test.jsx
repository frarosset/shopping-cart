import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import SearchMain from "../SearchMain";
import { HeadingLevelContextProvider } from "../../../contexts/HeadingLevelContext.jsx";
import userEvent from "@testing-library/user-event";

const query = "apple";
const sampleSearchProductUrl = `/search/${query}/url`;

const sampleSortBy = "title";
const sampleOrder = "asc";
const sampleSortBySelect = <span>Sort By Select</span>;

const mockGetSearchProductsApiUrl = vi.fn();
vi.mock("../../../fetching-utils/getApiUrl.js", () => ({
  getSearchProductsApiUrl: (query, obj) => {
    mockGetSearchProductsApiUrl(query, obj.sortBy, obj.order);
    return sampleSearchProductUrl;
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

const setup = () => {
  return {
    user: userEvent.setup(),
    ...render(
      <HeadingLevelContextProvider>
        <SearchMain />
      </HeadingLevelContextProvider>
    ),
  };
};

describe("SearchMain", () => {
  it("renders a heading with Search text", () => {
    setup();

    const heading = screen.getByRole("heading", { name: /Search/i });

    expect(heading).toBeInTheDocument();
  });

  it("renders a search input component initialized with empty string", () => {
    setup();

    const searchInput = screen.getByRole("searchbox");

    expect(searchInput).toBeInTheDocument();
    expect(searchInput.value).toBe("");
  });

  it("renders a list of products fetched based on the query string", async () => {
    const { user } = setup();

    const searchInput = screen.getByRole("searchbox");

    await user.type(searchInput, query);

    const productFetchList = screen.getByTestId("__product-fetch-list__");

    expect(mockGetSearchProductsApiUrl).toHaveBeenCalledWith(
      query,
      sampleSortBy,
      sampleOrder
    );

    expect(mockProductFetchList).toHaveBeenCalledWith(
      sampleSearchProductUrl,
      sampleSortBySelect
    );

    expect(productFetchList).toBeInTheDocument();
  });
});
