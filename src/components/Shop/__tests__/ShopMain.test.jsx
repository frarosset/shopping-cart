import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ShopMain from "../ShopMain.jsx";
import data from "../../../assets/data.json";

const sectionList = data.sectionList;

const mockCategorySectionList = vi.fn();
vi.mock("../CategorySectionList.jsx", () => ({
  default: (props) => {
    mockCategorySectionList(props);
    return (
      <div data-testid="__category-section-list__">
        {JSON.stringify(props.sectionList)}
      </div>
    );
  },
}));

const mockShopHighlightPresentation = vi.fn();
vi.mock("../ShopHighlightPresentation.jsx", () => ({
  default: () => {
    mockShopHighlightPresentation();
    return (
      <div data-testid="__shop-highlight-presentation__">
        Shop Highlight Presentation
      </div>
    );
  },
}));

/* mocks are hoisted: reset them before each test */
afterEach(() => {
  vi.resetAllMocks();
});

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

  it("renders a shop highlight presentation", () => {
    setup();

    const shopHighlightPresentation = screen.getByTestId(
      "__shop-highlight-presentation__"
    );

    expect(mockShopHighlightPresentation).toHaveBeenCalledOnce();
    expect(shopHighlightPresentation).toBeInTheDocument();
  });
});
