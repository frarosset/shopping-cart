import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
// import the following from "react-router" instead of "react-router-dom"
// otherwise, among other problems, Outlets are not rendered
// see: https://stackoverflow.com/a/79286335
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "./routes.jsx"; // this imports App component
import data from "./assets/data.json";

const sampleSection = Object.keys(data.sections)[0];
const sampleCategory = Object.keys(data.categories)[0];

const mockHeader = vi.fn();
vi.mock("./components/Header/Header.jsx", () => ({
  default: (props) => {
    mockHeader(props);
    return <header data-testid="page-header">"Header"</header>;
  },
}));

const mockShopMain = vi.fn();
vi.mock("./components/Shop/ShopMain.jsx", () => ({
  default: (props) => {
    mockShopMain(props);
    return <main data-testid="shop-main">"ShopMain"</main>;
  },
}));

const mockShopSectionMain = vi.fn();
vi.mock("./components/Shop/ShopSectionMain.jsx", () => ({
  default: (props) => {
    mockShopSectionMain(props);
    return <main data-testid="shop-section-main">"ShopSectionMain"</main>;
  },
}));

const mockShopCategoryMain = vi.fn();
vi.mock("./components/Shop/ShopCategoryMain.jsx", () => ({
  default: (props) => {
    mockShopCategoryMain(props);
    return <main data-testid="shop-category-main">"ShopCategoryMain"</main>;
  },
}));

/* mocks are hoisted: reset them before each test */
beforeEach(() => {
  vi.resetAllMocks();
});

const setupWithRoute = (initialEntry = "/") => {
  const router = createMemoryRouter(routes, {
    initialEntries: [initialEntry],
    initialIndex: 0,
  });

  return {
    router: router,
    ...render(<RouterProvider router={router} />),
  };
};

describe("App", () => {
  it("correctly render the home page", () => {
    setupWithRoute("/");

    const pageHeader = screen.getByTestId("page-header");

    expect(pageHeader).toBeInTheDocument();

    expect(mockHeader).toHaveBeenCalledOnce();
  });

  it("correctly render the shop page", () => {
    setupWithRoute("/shop");

    const pageHeader = screen.getByTestId("page-header");
    const shopMain = screen.getByTestId("shop-main");

    expect(pageHeader).toBeInTheDocument();
    expect(shopMain).toBeInTheDocument();

    expect(mockHeader).toHaveBeenCalledOnce();
    expect(mockShopMain).toHaveBeenCalledOnce();
  });

  it("correctly render the shop/:section page", () => {
    setupWithRoute(`/shop/${sampleSection}`);

    const pageHeader = screen.getByTestId("page-header");
    const shopSectionMain = screen.getByTestId("shop-section-main");

    expect(pageHeader).toBeInTheDocument();
    expect(shopSectionMain).toBeInTheDocument();

    expect(mockHeader).toHaveBeenCalledOnce();
    expect(mockShopSectionMain).toHaveBeenCalledOnce();
  });

  it("correctly render the shop/c/:category page", () => {
    setupWithRoute(`/shop/c/${sampleCategory}`);

    const pageHeader = screen.getByTestId("page-header");
    const shopCategoryMain = screen.getByTestId("shop-category-main");

    expect(pageHeader).toBeInTheDocument();
    expect(shopCategoryMain).toBeInTheDocument();

    expect(mockHeader).toHaveBeenCalledOnce();
    expect(mockShopCategoryMain).toHaveBeenCalledOnce();
  });

  it("correctly render the about page", () => {
    setupWithRoute("/about");

    const pageHeader = screen.getByTestId("page-header");

    expect(pageHeader).toBeInTheDocument();

    expect(mockHeader).toHaveBeenCalledOnce();
  });
});
