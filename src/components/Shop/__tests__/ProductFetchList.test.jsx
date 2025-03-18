import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductFetchList from "../ProductFetchList.jsx";

const validApiUrl = "/some/api/url/fetching/data";

const validData = { products: "Valid Data" };

// mock ProductList and  components

const mockProductList = vi.fn();
vi.mock("../ProductList.jsx", () => ({
  default: (props) => {
    mockProductList(props.productDataList);
    return <p data-testid="__product-list__">{props.productDataList}</p>;
  },
}));

const mockUseFetchFromApiUrl = vi.fn();
vi.mock("../../../fetching-utils/useFetchFromApiUrl.jsx", () => ({
  default: (apiUrl) => {
    mockUseFetchFromApiUrl(apiUrl);
    if (apiUrl === validApiUrl) {
      return { data: validData, error: null, loading: false };
    }
  },
}));

/* mocks are hoisted: reset them before each test */
beforeEach(() => {
  vi.resetAllMocks();
});

const setup = (apiUrl) => {
  render(<ProductFetchList apiUrl={apiUrl} />);

  expect(mockUseFetchFromApiUrl).toHaveBeenCalledExactlyOnceWith(apiUrl);

  return {
    productList: screen.queryByTestId("__product-list__"),
    error: screen.queryByTestId("product-fetch-list-error"),
    loading: screen.queryByTestId("product-fetch-list-loading"),
  };
};

describe("ProductFetchList", () => {
  it("renders only a product list on successful fetch", () => {
    const { productList, error, loading } = setup(validApiUrl);

    expect(mockProductList).toHaveBeenCalledExactlyOnceWith(validData.products);

    expect(productList).toBeInTheDocument();
    expect(error).not.toBeInTheDocument();
    expect(loading).not.toBeInTheDocument();
  });
});
