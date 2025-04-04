import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import ProductList from "../ProductList.jsx";
import List from "../../Generic/List.jsx";

const productDataList = [
  { id: 0, title: "first product" },
  { id: 1, title: "second product" },
  { id: 2, title: "third product" },
];

// Here you pass components as props within the tested elements.
// see: https://dev.to/peterlidee/how-to-test-a-component-passed-as-prop-with-jest-4pgn

// mock List and ProductItem components
vi.mock("../../Generic/List.jsx", { spy: true });

const mockProductItem = vi.fn();
vi.mock("../ProductItem.jsx", () => ({
  default: (props) => {
    mockProductItem(props.productData);
    return <p data-testid="__product-item__">{props.productData.title}</p>;
  },
}));

/* mocks are hoisted: reset them before each test */
afterEach(() => {
  vi.resetAllMocks();
});

const setup = () => ({
  ...render(<ProductList productDataList={productDataList} />),
});

describe("ProductList", () => {
  it("renders a single List component", () => {
    setup();

    const list = screen.getByRole("list");

    expect(List).toHaveBeenCalledOnce();
    expect(list).toBeInTheDocument();
  });

  it("renders only a given number of ProductItem components list items", () => {
    setup();

    const list = screen.getByRole("list");
    const items = within(list).getAllByTestId("__product-item__");

    expect(mockProductItem).toHaveBeenCalledTimes(productDataList.length);
    productDataList.forEach((itm, idx) => {
      expect(mockProductItem).toHaveBeenNthCalledWith(idx + 1, itm);
    });
    expect(items.length).toBe(productDataList.length);
  });
});
