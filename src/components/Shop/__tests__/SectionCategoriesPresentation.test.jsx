import { vi, describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import SectionCategoriesPresentation from "../SectionCategoriesPresentation.jsx";
import { HeadingLevelContextProvider } from "../../../contexts/HeadingLevelContext.jsx";
import data from "../../../assets/data.json";
import { MemoryRouter } from "react-router-dom";

const sampleCategories = data.sections["electronics"].categories;
const sampleCategoriesData = data.categories;
const sampleCategoryUrl = (category) => `category/${category}/url/`;

const setup = () => {
  return {
    ...render(
      <MemoryRouter>
        <HeadingLevelContextProvider>
          <SectionCategoriesPresentation sectionCategories={sampleCategories} />
        </HeadingLevelContextProvider>
      </MemoryRouter>
    ),
  };
};

const mockGetCategoryProductsApiUrl = vi.fn();
vi.mock("../../../fetching-utils/getApiUrl.js", () => ({
  getCategoryProductsApiUrl: (category) => {
    mockGetCategoryProductsApiUrl(category);
    return sampleCategoryUrl(category);
  },
}));

const mockProductFetchList = vi.fn();
vi.mock("../ProductFetchList.jsx", () => ({
  default: ({ apiUrl, rowScroll }) => {
    mockProductFetchList(apiUrl, rowScroll);
    return (
      <span
        data-testid={`__product-fetch-list-${apiUrl}__`}
      >{`Product Fetch List from ${apiUrl}`}</span>
    );
  },
}));

describe("SectionCategoriesPresentation", () => {
  it("renders a list of categories associated with the section", () => {
    setup();

    const list = screen.getByRole("list");
    const liAll = within(list).getAllByRole("listitem");

    liAll.forEach((li, idx) => {
      const heading = within(li).getByRole("heading", {
        name: sampleCategoriesData[sampleCategories[idx]].name,
      });

      expect(heading).toBeInTheDocument();
    });
  });

  it("renders a list of links to the category pages at /shop/c/:category", () => {
    setup();

    const list = screen.getByRole("list");
    const liAll = within(list).getAllByRole("listitem");

    liAll.forEach((li, idx) => {
      const category = sampleCategories[idx];
      const routeTo = `shop/c/${category}`;
      const basePath = window.location.href;

      const link = within(li).getByRole("link");

      expect(link).toBeInTheDocument();
      expect(link.href).toBe(`${basePath}${routeTo}`);
    });
  });

  it("renders a list of some products associated with each category", () => {
    setup();

    const list = screen.getByRole("list");
    const liAll = within(list).getAllByRole("listitem");

    // const productFetchList = screen.getAllByTestId("__product-fetch-list__");
    const getCategoryProductsApiUrlCallArgs =
      mockGetCategoryProductsApiUrl.mock.calls;

    const productFetchListCallArgs = mockProductFetchList.mock.calls;

    sampleCategories.forEach((category, idx) => {
      const apiUrl = sampleCategoryUrl(category);

      const productFetchList = within(liAll[idx]).getByTestId(
        `__product-fetch-list-${apiUrl}__`
      );

      // Check that this call has been called with the correct args
      expect(getCategoryProductsApiUrlCallArgs[idx]).toEqual([category]);

      expect(productFetchListCallArgs[idx]).toEqual([apiUrl, true]);

      // Check that the product list has been rendered in the document
      expect(productFetchList).toBeInTheDocument();
    });
  });
});
