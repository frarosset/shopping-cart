import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import CategoryList from "../CategoryList.jsx";
import List from "../../Generic/List.jsx";
import data from "../../../assets/data.json";

const categoryList = Object.keys(data.categories);

// Here you pass components as props within the tested elements.
// see: https://dev.to/peterlidee/how-to-test-a-component-passed-as-prop-with-jest-4pgn

// mock List and CategoryItem components
vi.mock("../../Generic/List.jsx", { spy: true });

const mockCategoryItem = vi.fn();
vi.mock("../CategoryItem.jsx", () => ({
  default: (props) => {
    mockCategoryItem(props);
    return <p data-testid="__category-item__">{props.category}</p>;
  },
}));

/* mocks are hoisted: reset them before each test */
afterEach(() => {
  vi.resetAllMocks();
});

const setup = () => ({
  ...render(<CategoryList categoryList={categoryList} />),
});

describe("CategoryList", () => {
  it("renders a single List component", () => {
    setup();

    const list = screen.getByRole("list");

    expect(List).toHaveBeenCalledOnce();
    expect(list).toBeInTheDocument();
  });

  it("renders only a given number of CategoryItem components list items", () => {
    setup();

    const list = screen.getByRole("list");
    const items = within(list).getAllByTestId("__category-item__");

    expect(mockCategoryItem).toHaveBeenCalledTimes(categoryList.length);
    expect(items.length).toBe(categoryList.length);
  });
});
