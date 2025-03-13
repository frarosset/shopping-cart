import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ShopMain from "./ShopMain.jsx";
import data from "../../assets/data.json";

const sectionList = data.sectionList;

const mockCategorySectionList = vi.fn();
vi.mock("./CategorySectionList.jsx", () => ({
  default: (props) => {
    mockCategorySectionList(props);
    return (
      <div data-testid="__category-section-list__">
        {JSON.stringify(props.sectionList)}
      </div>
    );
  },
}));

const setup = () => {
  return {
    ...render(<ShopMain />),
  };
};

describe("ShopMain", () => {
  it("correctly renders the component rendering a categorySectionList component", () => {
    setup();

    const categorySectionList = screen.getByTestId("__category-section-list__");

    expect(categorySectionList).toBeInTheDocument();
    expect(mockCategorySectionList).toHaveBeenCalledExactlyOnceWith({
      sectionList: sectionList,
    });
  });
});
