import { vi, describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import ShopHighlightPresentation from "../ShopHighlightPresentation.jsx";
import { HeadingLevelContextProvider } from "../../../contexts/HeadingLevelContext.jsx";

const highlightData = [
  { title: "Most Appreciated", sortBy: "rating", order: "desc" },
  { title: "Best Deals", sortBy: "discountPercentage", order: "desc" },
];
const sampleUrl = (sortBy, order) => `all/sort-by/${sortBy}/${order}/url/`;

const setup = () => {
  return {
    ...render(
      <HeadingLevelContextProvider>
        <ShopHighlightPresentation />
      </HeadingLevelContextProvider>
    ),
  };
};

const mockGetAllProductsApiUrl = vi.fn();
vi.mock("../../../fetching-utils/getApiUrl.js", () => ({
  getAllProductsApiUrl: ({ sortBy, order }) => {
    mockGetAllProductsApiUrl(sortBy, order);
    return sampleUrl(sortBy, order);
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

describe("ShopHighlightPresentation", () => {
  it("renders a list of categories associated with the section", () => {
    setup();

    const list = screen.getByRole("list");
    const liAll = within(list).getAllByRole("listitem");

    liAll.forEach((li, idx) => {
      const heading = within(li).getByRole("heading", {
        name: highlightData[idx].title,
      });

      expect(heading).toBeInTheDocument();
    });
  });

  it("renders a list of some products associated with each category", () => {
    setup();

    const list = screen.getByRole("list");
    const liAll = within(list).getAllByRole("listitem");

    // const productFetchList = screen.getAllByTestId("__product-fetch-list__");
    const getAllProductsApiUrlCallArgs = mockGetAllProductsApiUrl.mock.calls;

    const productFetchListCallArgs = mockProductFetchList.mock.calls;

    highlightData.forEach(({ sortBy, order }, idx) => {
      const apiUrl = sampleUrl(sortBy, order);

      const productFetchList = within(liAll[idx]).getByTestId(
        `__product-fetch-list-${apiUrl}__`
      );

      // Check that this call has been called with the correct args
      expect(getAllProductsApiUrlCallArgs[idx]).toEqual([sortBy, order]);

      expect(productFetchListCallArgs[idx]).toEqual([apiUrl, true]);

      // Check that the product list has been rendered in the document
      expect(productFetchList).toBeInTheDocument();
    });
  });
});
