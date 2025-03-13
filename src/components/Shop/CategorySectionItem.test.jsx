import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CategorySectionItem from "./CategorySectionItem.jsx";
import data from "../../assets/data.json";

const section = data.sectionList[0];
const sectionData = data.sections[section];

const mockCategoryList = vi.fn();
vi.mock("./CategoryList.jsx", () => ({
  default: (props) => {
    mockCategoryList(props);
    return (
      <ul>
        {props.categoryList.map((cat, idx) => (
          <li data-testid="__category-item__" key={idx}>
            {cat}
          </li>
        ))}
      </ul>
    );
  },
}));

/* mocks are hoisted: reset them before each test */
beforeEach(() => {
  vi.resetAllMocks();
});

const setup = () => ({
  ...render(<CategorySectionItem section={section} />, {
    wrapper: MemoryRouter,
  }),
});

describe("CategorySectionItem", () => {
  it("renders a heading with the category name", () => {
    setup();

    const categoryName = screen.getByRole("heading", {
      name: sectionData.name,
    });

    expect(categoryName).toBeInTheDocument();
  });

  it("renders a list of categories associated with the section", () => {
    setup();

    const list = screen.getByRole("list");
    const categoryItems = within(list).getAllByTestId("__category-item__");

    expect(mockCategoryList).toHaveBeenCalledExactlyOnceWith({
      categoryList: sectionData.categories,
    });
    expect(categoryItems.length).toBe(sectionData.categories.length);
  });

  it("renders a link to /shop/:section page", () => {
    setup();

    const routeTo = `shop/${section}`;
    const basePath = window.location.href;
    const link = screen.getByRole("link");

    expect(link).toBeInTheDocument();
    expect(link.href).toBe(`${basePath}${routeTo}`);
  });
});
