import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductFetch from "../ProductFetch.jsx";

const testOptions = {
  valid: {
    id: 1,
    apiUrl: "/some/api/url/fetching/data",
    del: { data: { data: "valid" }, error: null, loading: false },
  },
  error: {
    id: 2,
    apiUrl: "/some/api/url/leading/to/error",
    del: { data: null, error: { message: "Error!" }, loading: false },
  },
  serverError: {
    id: 3,
    apiUrl: "/some/api/url/leading/to/server/error",
    del: {
      data: null,
      error: { message: "Product 3 not found!", status: 404 },
      loading: false,
    },
  },
  initialLoading: {
    id: 4,
    apiUrl: "/some/api/url/initial/loading/",
    del: { data: null, error: null, loading: true },
  }, // to simulate initial loading
};

// mock Product and  components

const mockProduct = vi.fn();
vi.mock("../Product.jsx", () => ({
  default: (props) => {
    mockProduct(props.productData);
    return <p data-testid="__product__">{props.productData.data}</p>;
  },
}));

const mockLoaderIcon = vi.fn();
vi.mock("../../Icons/LoaderIcon.jsx", () => ({
  default: () => {
    mockLoaderIcon();
    return <span data-testid="__product-fetch-loading__">Loading icon</span>;
  },
}));

const mockGetSingleProductApiUrl = vi.fn();
vi.mock("../../../fetching-utils/getApiUrl.js", () => ({
  getSingleProductApiUrl: (id) => {
    mockGetSingleProductApiUrl(id);

    const opt = Object.values(testOptions).filter((itm) => itm.id === id)[0];

    return opt.apiUrl;
  },
}));

const mockUseFetchFromApiUrl = vi.fn();
vi.mock("../../../fetching-utils/useFetchFromApiUrl.jsx", () => ({
  default: (apiUrl) => {
    mockUseFetchFromApiUrl(apiUrl);

    const opt = Object.values(testOptions).filter(
      (itm) => itm.apiUrl === apiUrl
    )[0];

    return opt.del;
  },
}));

/* mocks are hoisted: reset them before each test */
afterEach(() => {
  vi.resetAllMocks();
});

const setup = (id) => {
  render(<ProductFetch id={id} />);

  const opt = Object.values(testOptions).filter((itm) => itm.id === id)[0];

  expect(mockGetSingleProductApiUrl).toHaveBeenCalledExactlyOnceWith(id);
  expect(mockUseFetchFromApiUrl).toHaveBeenCalledExactlyOnceWith(opt.apiUrl);

  return {
    product: screen.queryByTestId("__product__"),
    loading: screen.queryByTestId("__product-fetch-loading__"),
  };
};

describe("ProductFetch", () => {
  it("renders only a product on successful fetch", () => {
    const opt = testOptions.valid;

    const { product, loading } = setup(opt.id);

    expect(mockProduct).toHaveBeenCalledExactlyOnceWith(opt.del.data);
    expect(mockLoaderIcon).not.toHaveBeenCalled();

    expect(product).toBeInTheDocument();
    expect(loading).not.toBeInTheDocument();
  });

  it("renders an error on failed fetch", () => {
    const opt = testOptions.serverError;

    expect(() => setup(opt.id)).toThrow(opt.del.error.message);
  });

  it("renders an error on failed fetch (for server error)", () => {
    const opt = testOptions.serverError;

    expect(() => setup(opt.id)).toThrow(opt.del.error.message);
  });

  it("renders only a loading element on initial fetching", () => {
    const opt = testOptions.initialLoading;

    const { product, loading } = setup(opt.id);

    expect(mockProduct).not.toHaveBeenCalled();
    expect(mockLoaderIcon).toHaveBeenCalledOnce();

    expect(product).not.toBeInTheDocument();
    expect(loading).toBeInTheDocument();
  });
});
