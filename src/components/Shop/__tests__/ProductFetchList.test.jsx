import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductFetchList from "../ProductFetchList.jsx";

const validApiUrl = "/some/api/url/fetching/data";
const errorApiUrl = "/some/api/url/leading/to/error";
const apiUrlnitialLoading = "/some/api/url/initial/loading/"; // to simulate initial loading
const apiUrlAfterValidLoading = "/some/api/url/after/data/loading/"; // to simulate loading on refetch after a successful request
const apiUrlAfterErrorLoading = "/some/api/url/after/error/loading/"; // to simulate loading on refetch after a failed request

const validData = { products: "Valid Data" };
const error = { message: "Error!" };

const sortBySelect = <span data-testid="sort-by-select">SortBy Select</span>;

// mock ProductList and  components

const mockProductList = vi.fn();
vi.mock("../ProductList.jsx", () => ({
  default: (props) => {
    mockProductList(props.productDataList);
    return <p data-testid="__product-list__">{props.productDataList}</p>;
  },
}));

const mockLoaderIcon = vi.fn();
vi.mock("../../Icons/LoaderIcon.jsx", () => ({
  default: () => {
    mockLoaderIcon();
    return (
      <span data-testid="__product-fetch-list-loading__">Loading icon</span>
    );
  },
}));

const mockUseFetchFromApiUrl = vi.fn();
vi.mock("../../../fetching-utils/useFetchFromApiUrl.jsx", () => ({
  default: (apiUrl, resetOnFetch = false) => {
    mockUseFetchFromApiUrl(apiUrl, resetOnFetch);
    if (apiUrl === validApiUrl) {
      return { data: validData, error: null, loading: false };
    } else if (apiUrl === errorApiUrl) {
      return { data: null, error: error, loading: false };
    } else if (apiUrl === apiUrlnitialLoading) {
      return { data: null, error: null, loading: true };
    } else if (apiUrl === apiUrlAfterValidLoading) {
      return {
        data: resetOnFetch ? null : validData,
        error: null,
        loading: true,
      };
    } else if (apiUrl === apiUrlAfterErrorLoading) {
      return {
        data: null,
        error: resetOnFetch ? null : error,
        loading: true,
      };
    }
  },
}));

/* mocks are hoisted: reset them before each test */
afterEach(() => {
  vi.resetAllMocks();
});

const setup = (apiUrl, resetOnFetch = false) => {
  render(
    <ProductFetchList
      apiUrl={apiUrl}
      resetOnFetch={resetOnFetch}
      sortBySelect={sortBySelect}
    />
  );

  expect(mockUseFetchFromApiUrl).toHaveBeenCalledExactlyOnceWith(
    apiUrl,
    resetOnFetch
  );

  return {
    productList: screen.queryByTestId("__product-list__"),
    error: screen.queryByTestId("product-fetch-list-error"),
    loading: screen.queryByTestId("__product-fetch-list-loading__"),
    sortBySelect: screen.queryByTestId("sort-by-select"),
  };
};

describe("ProductFetchList", () => {
  it("renders only a product list on successful fetch", () => {
    const { productList, error, loading, sortBySelect } = setup(validApiUrl);

    expect(mockProductList).toHaveBeenCalledExactlyOnceWith(validData.products);
    expect(mockLoaderIcon).not.toHaveBeenCalled();

    expect(productList).toBeInTheDocument();
    expect(error).not.toBeInTheDocument();
    expect(loading).not.toBeInTheDocument();
    expect(sortBySelect).toBeInTheDocument();
  });

  it("renders an error on failed fetch", () => {
    const { productList, error, loading, sortBySelect } = setup(errorApiUrl);

    expect(mockProductList).not.toHaveBeenCalled();
    expect(mockLoaderIcon).not.toHaveBeenCalled();

    expect(productList).not.toBeInTheDocument();
    expect(error).toBeInTheDocument();
    expect(loading).not.toBeInTheDocument();
    expect(sortBySelect).not.toBeInTheDocument();
  });

  it("renders only a loading element on initial fetching", () => {
    const { productList, error, loading, sortBySelect } =
      setup(apiUrlnitialLoading);

    expect(mockProductList).not.toHaveBeenCalled();
    expect(mockLoaderIcon).toHaveBeenCalledOnce();

    expect(productList).not.toBeInTheDocument();
    expect(error).not.toBeInTheDocument();
    expect(loading).toBeInTheDocument();
    expect(sortBySelect).not.toBeInTheDocument();
  });

  it(`renders the previous product list and a loading element on refetch after a successful request`, () => {
    const { productList, error, loading, sortBySelect } = setup(
      apiUrlAfterValidLoading
    );

    expect(mockProductList).toHaveBeenCalledExactlyOnceWith(validData.products);
    expect(mockLoaderIcon).toHaveBeenCalledOnce();

    expect(productList).toBeInTheDocument();
    expect(error).not.toBeInTheDocument();
    expect(loading).toBeInTheDocument();
    expect(sortBySelect).toBeInTheDocument();
  });

  it(`optionally renders only a loading element on refetch after a successful request`, () => {
    const { productList, error, loading, sortBySelect } = setup(
      apiUrlAfterValidLoading,
      true
    );

    expect(mockProductList).not.toHaveBeenCalled();
    expect(mockLoaderIcon).toHaveBeenCalledOnce();

    expect(productList).not.toBeInTheDocument();
    expect(error).not.toBeInTheDocument();
    expect(loading).toBeInTheDocument();
    expect(sortBySelect).not.toBeInTheDocument();
  });

  it(`renders the previous error and a loading element on refetch after a failed request`, () => {
    const { productList, error, loading, sortBySelect } = setup(
      apiUrlAfterErrorLoading
    );

    expect(mockProductList).not.toHaveBeenCalled();
    expect(mockLoaderIcon).toHaveBeenCalledOnce();

    expect(productList).not.toBeInTheDocument();
    expect(error).toBeInTheDocument();
    expect(loading).toBeInTheDocument();
    expect(sortBySelect).not.toBeInTheDocument();
  });

  it(`optionally renders only a loading element on refetch after a failed request`, () => {
    const { productList, error, loading, sortBySelect } = setup(
      apiUrlAfterErrorLoading,
      true
    );

    expect(mockProductList).not.toHaveBeenCalled();
    expect(mockLoaderIcon).toHaveBeenCalledOnce();

    expect(productList).not.toBeInTheDocument();
    expect(error).not.toBeInTheDocument();
    expect(loading).toBeInTheDocument();
    expect(sortBySelect).not.toBeInTheDocument();
  });
});
