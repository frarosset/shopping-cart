import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import ShopSectionMain from "../ShopSectionMain.jsx";
import { MemoryRouter, Route, Routes } from "react-router";
import { HeadingLevelContextProvider } from "../../../contexts/HeadingLevelContext.jsx";
import data from "../../../assets/data.json";

const sampleSection = Object.keys(data.sections)[0];
const sampleSectionName = data.sections[sampleSection].name;
const sampleSectionData = data.sections[sampleSection];

const sampleSectionRoute = `/shop/${sampleSection}`;

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

const setup = (route) => {
  // see: https://stackoverflow.com/a/71655231
  return {
    ...render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route
            path="/shop/:section"
            element={
              <HeadingLevelContextProvider>
                <ShopSectionMain />
              </HeadingLevelContextProvider>
            }
          />
        </Routes>
      </MemoryRouter>
    ),
  };
};

describe("ShopSectionMain", () => {
  it("renders a heading of the associated section", () => {
    setup(sampleSectionRoute);

    const heading = screen.getByRole("heading", { name: sampleSectionName });

    expect(heading).toBeInTheDocument();
  });

  it("renders a list of categories associated with the section", () => {
    setup(sampleSectionRoute);

    const list = screen.getByRole("list");
    const categoryItems = within(list).getAllByTestId("__category-item__");

    expect(mockCategoryList).toHaveBeenCalledExactlyOnceWith({
      categoryList: sampleSectionData.categories,
      className: expect.anything(),
    });
    expect(categoryItems.length).toBe(sampleSectionData.categories.length);
  });
});
