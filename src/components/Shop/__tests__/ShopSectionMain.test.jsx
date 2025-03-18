import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import ShopSectionMain from "../ShopSectionMain.jsx";
import data from "../../../assets/data.json";

const sampleSection = Object.keys(data.sections)[0];
const sampleSectionName = data.sections[sampleSection].name;
const sampleSectionData = data.sections[sampleSection];

const mockUseParams = vi.fn();
vi.mock("react-router-dom", () => ({
  useParams: (props) => {
    mockUseParams(props);
    return { section: sampleSection };
  },
}));

const mockCategoryList = vi.fn();
vi.mock("../CategoryList.jsx", () => ({
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
afterEach(() => {
  vi.resetAllMocks();
});

const setup = () => {
  return {
    ...render(<ShopSectionMain />),
  };
};

describe("ShopSectionMain", () => {
  it("gets the section param from the url", () => {
    setup();

    expect(mockUseParams).toHaveBeenCalledOnce();
  });

  it("renders a heading of the associated section", () => {
    setup();

    const heading = screen.getByRole("heading", { name: sampleSectionName });

    expect(heading).toBeInTheDocument();
  });

  it("renders a list of categories associated with the section", () => {
    setup();

    const list = screen.getByRole("list");
    const categoryItems = within(list).getAllByTestId("__category-item__");

    expect(mockCategoryList).toHaveBeenCalledExactlyOnceWith({
      categoryList: sampleSectionData.categories,
    });
    expect(categoryItems.length).toBe(sampleSectionData.categories.length);
  });
});
