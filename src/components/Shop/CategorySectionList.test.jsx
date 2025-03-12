import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import CategorySectionList from "./CategorySectionList.jsx";
import List from "../Generic/List.jsx";
import data from "../../assets/data.json";

const sectionList = data.sectionList;

// Here you pass components as props within the tested elements.
// see: https://dev.to/peterlidee/how-to-test-a-component-passed-as-prop-with-jest-4pgn

// mock List and CategorySectionItem components
vi.mock("../Generic/List.jsx", { spy: true });

const mockCategorySectionItem = vi.fn();
vi.mock("./CategorySectionItem.jsx", () => ({
  default: (props) => {
    mockCategorySectionItem(props);
    return <p data-testid="__category-section-item__">{props.section}</p>;
  },
}));

/* mocks are hoisted: reset them before each test */
beforeEach(() => {
  vi.resetAllMocks();
});

const setup = () => ({
  ...render(<CategorySectionList sectionList={sectionList} />),
});

describe("CategorySectionList", () => {
  it("renders a single List component", () => {
    setup();

    const list = screen.getByRole("list");

    expect(List).toHaveBeenCalledOnce();
    expect(list).toBeInTheDocument();
  });

  it("renders only a given number of CategorySectionItem components list items", () => {
    setup();

    const list = screen.getByRole("list");
    const items = within(list).getAllByTestId("__category-section-item__");

    expect(mockCategorySectionItem).toHaveBeenCalledTimes(sectionList.length);
    expect(items.length).toBe(sectionList.length);
  });
});
