import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductMain from "../ProductMain.jsx";
import { MemoryRouter, Route, Routes } from "react-router";
import { HeadingLevelContextProvider } from "../../../contexts/HeadingLevelContext.jsx";

const sampleProductRoute = `/shop/p/1`;

const mockProductFetch = vi.fn();
vi.mock("../ProductFetch.jsx", () => ({
  default: (props) => {
    mockProductFetch(props.id);
    return <p data-testid="__product-fetch-list__">{props.id}</p>;
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
            path="/shop/p/:id"
            element={
              <HeadingLevelContextProvider>
                <ProductMain />
              </HeadingLevelContextProvider>
            }
          />
        </Routes>
      </MemoryRouter>
    ),
  };
};

describe("ProductMain", () => {
  it("correctly renders the component", () => {
    setup(sampleProductRoute);

    const productFetch = screen.getByTestId("__product-fetch-list__");

    expect(productFetch).toBeInTheDocument();
  });
});
