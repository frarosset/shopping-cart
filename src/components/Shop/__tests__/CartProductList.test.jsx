import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import CartProductList from "../CartProductList.jsx";
import List from "../../Generic/List.jsx";

const productDataList = [
  { id: 0, title: "first product" },
  { id: 1, title: "second product" },
  { id: 2, title: "third product" },
];

// Here you pass components as props within the tested elements.
// see: https://dev.to/peterlidee/how-to-test-a-component-passed-as-prop-with-jest-4pgn

// mock List and CartProductItem components
vi.mock("../../Generic/List.jsx", { spy: true });

const mockCartProductItem = vi.fn();
vi.mock("../CartProductItem.jsx", () => ({
  default: (props) => {
    mockCartProductItem(props.productData);
    return <p data-testid="__cart-product-item__">{props.productData.title}</p>;
  },
}));

/* mocks are hoisted: reset them before each test */
afterEach(() => {
  vi.resetAllMocks();
});

const setup = () => ({
  ...render(<CartProductList productDataList={productDataList} />),
});

describe("CartProductList", () => {
  it("renders a single List component", () => {
    setup();

    const list = screen.getByRole("list");

    expect(List).toHaveBeenCalledOnce();
    expect(list).toBeInTheDocument();
  });

  it("renders only a given number of CartProductItem components list items", () => {
    setup();

    const list = screen.getByRole("list");
    const items = within(list).getAllByTestId("__cart-product-item__");

    expect(mockCartProductItem).toHaveBeenCalledTimes(productDataList.length);

    productDataList.forEach((itm, idx) => {
      expect(mockCartProductItem).toHaveBeenNthCalledWith(idx + 1, itm);
    });

    expect(items.length).toBe(productDataList.length);
  });
});
