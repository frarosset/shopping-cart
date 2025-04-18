import { vi, describe, it, expect, afterEach, afterAll } from "vitest";
import { render, screen } from "@testing-library/react";
// import the following from "react-router" instead of "react-router-dom"
// otherwise, among other problems, Outlets are not rendered
// see: https://stackoverflow.com/a/79286335
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "./routes.jsx"; // this imports App component
import data from "./assets/data.json";
import ErrorRedirect from "./components/Errors/ErrorRedirect.jsx";

const sampleSection = Object.keys(data.sections)[0];
const sampleCategory = Object.keys(data.categories)[0];

window.scrollTo = vi.fn();

const mockHeader = vi.fn();
vi.mock("./components/Header/Header.jsx", () => ({
  default: (props) => {
    mockHeader(props);
    return <header data-testid="page-header">Header</header>;
  },
}));

const mockShopMain = vi.fn();
vi.mock("./components/Shop/ShopMain.jsx", () => ({
  default: (props) => {
    mockShopMain(props);
    return <main data-testid="shop-main">ShopMain</main>;
  },
}));

const mockShopSectionMain = vi.fn();
vi.mock("./components/Shop/ShopSectionMain.jsx", () => ({
  default: (props) => {
    mockShopSectionMain(props);
    return <main data-testid="shop-section-main">ShopSectionMain</main>;
  },
}));

const mockShopCategoryMain = vi.fn();
vi.mock("./components/Shop/ShopCategoryMain.jsx", () => ({
  default: (props) => {
    mockShopCategoryMain(props);
    return <main data-testid="shop-category-main">ShopCategoryMain</main>;
  },
}));

const mockProductMain = vi.fn();
vi.mock("./components/Shop/ProductMain.jsx", () => ({
  default: (props) => {
    mockProductMain(props);
    return <main data-testid="product-main">ProductMain</main>;
  },
}));

const mockHomeMain = vi.fn();
vi.mock("./components/Home/HomeMain.jsx", () => ({
  default: (props) => {
    mockHomeMain(props);
    return <main data-testid="home-main">HomeMain</main>;
  },
}));

const mockCartMain = vi.fn();
vi.mock("./components/Shop/CartMain.jsx", () => ({
  default: (props) => {
    mockCartMain(props);
    return <main data-testid="cart-main">CartMain</main>;
  },
}));

const mockWishlistMain = vi.fn();
vi.mock("./components/Shop/WishlistMain.jsx", () => ({
  default: (props) => {
    mockWishlistMain(props);
    return <main data-testid="wishlist-main">WishlistMain</main>;
  },
}));

const mockSearchMain = vi.fn();
vi.mock("./components/Shop/SearchMain.jsx", () => ({
  default: (props) => {
    mockSearchMain(props);
    return <main data-testid="search-main">SearchMain</main>;
  },
}));

const mockErrorPage = vi.fn();
vi.mock("./components/Errors/ErrorPage.jsx", () => ({
  default: (props) => {
    mockErrorPage(props);
    return <main data-testid="error-page">ErrorPage</main>;
  },
}));

vi.mock("./components/Errors/ErrorRedirect.jsx", { spy: true });

const mockFooter = vi.fn();
vi.mock("./components/Footer/Footer.jsx", () => ({
  default: () => {
    mockFooter();
    return <main data-testid="credit-footer">Footer</main>;
  },
}));

/* mocks are hoisted: reset them before each test */
afterEach(() => {
  vi.resetAllMocks();
});

afterAll(() => {
  vi.clearAllMocks();
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
    const homeMain = screen.getByTestId("home-main");
    const footer = screen.getByTestId("credit-footer");

    expect(pageHeader).toBeInTheDocument();
    expect(homeMain).toBeInTheDocument();
    expect(footer).toBeInTheDocument();

    expect(mockHeader).toHaveBeenCalledOnce();
    expect(mockHomeMain).toHaveBeenCalledOnce();
    expect(mockFooter).toHaveBeenCalledOnce();
  });

  it("correctly render the shop page", () => {
    setupWithRoute("/shop");

    const pageHeader = screen.getByTestId("page-header");
    const shopMain = screen.getByTestId("shop-main");
    const footer = screen.getByTestId("credit-footer");

    expect(pageHeader).toBeInTheDocument();
    expect(shopMain).toBeInTheDocument();
    expect(footer).toBeInTheDocument();

    expect(mockHeader).toHaveBeenCalledOnce();
    expect(mockShopMain).toHaveBeenCalledOnce();
    expect(mockFooter).toHaveBeenCalledOnce();
  });

  it("correctly render the shop/:section page", () => {
    setupWithRoute(`/shop/${sampleSection}`);

    const pageHeader = screen.getByTestId("page-header");
    const shopSectionMain = screen.getByTestId("shop-section-main");
    const footer = screen.getByTestId("credit-footer");

    expect(pageHeader).toBeInTheDocument();
    expect(shopSectionMain).toBeInTheDocument();
    expect(footer).toBeInTheDocument();

    expect(mockHeader).toHaveBeenCalledOnce();
    expect(mockShopSectionMain).toHaveBeenCalledOnce();
    expect(mockFooter).toHaveBeenCalledOnce();
  });

  it("correctly render the shop/c/:category page", () => {
    setupWithRoute(`/shop/c/${sampleCategory}`);

    const pageHeader = screen.getByTestId("page-header");
    const shopCategoryMain = screen.getByTestId("shop-category-main");
    const footer = screen.getByTestId("credit-footer");

    expect(pageHeader).toBeInTheDocument();
    expect(shopCategoryMain).toBeInTheDocument();
    expect(footer).toBeInTheDocument();

    expect(mockHeader).toHaveBeenCalledOnce();
    expect(mockShopCategoryMain).toHaveBeenCalledOnce();
    expect(mockFooter).toHaveBeenCalledOnce();
  });

  it("correctly render the product page", () => {
    setupWithRoute(`/shop/p/1`);

    const pageHeader = screen.getByTestId("page-header");
    const productMain = screen.getByTestId("product-main");
    const footer = screen.getByTestId("credit-footer");

    expect(pageHeader).toBeInTheDocument();
    expect(productMain).toBeInTheDocument();
    expect(footer).toBeInTheDocument();

    expect(mockHeader).toHaveBeenCalledOnce();
    expect(mockProductMain).toHaveBeenCalledOnce();
    expect(mockFooter).toHaveBeenCalledOnce();
  });

  it("correctly render the cart page", () => {
    setupWithRoute(`/cart`);

    const pageHeader = screen.getByTestId("page-header");
    const shopCartMain = screen.getByTestId("cart-main");
    const footer = screen.getByTestId("credit-footer");

    expect(pageHeader).toBeInTheDocument();
    expect(shopCartMain).toBeInTheDocument();
    expect(footer).toBeInTheDocument();

    expect(mockHeader).toHaveBeenCalledOnce();
    expect(mockCartMain).toHaveBeenCalledOnce();
    expect(mockFooter).toHaveBeenCalledOnce();
  });

  it("correctly render the wishlist page", () => {
    setupWithRoute(`/wishlist`);

    const pageHeader = screen.getByTestId("page-header");
    const wishlistMain = screen.getByTestId("wishlist-main");
    const footer = screen.getByTestId("credit-footer");

    expect(pageHeader).toBeInTheDocument();
    expect(wishlistMain).toBeInTheDocument();
    expect(footer).toBeInTheDocument();

    expect(mockHeader).toHaveBeenCalledOnce();
    expect(mockWishlistMain).toHaveBeenCalledOnce();
    expect(mockFooter).toHaveBeenCalledOnce();
  });

  it("correctly render the search page", () => {
    setupWithRoute(`/search`);

    const pageHeader = screen.getByTestId("page-header");
    const searchMain = screen.getByTestId("search-main");
    const footer = screen.getByTestId("credit-footer");

    expect(pageHeader).toBeInTheDocument();
    expect(searchMain).toBeInTheDocument();
    expect(footer).toBeInTheDocument();

    expect(mockHeader).toHaveBeenCalledOnce();
    expect(mockSearchMain).toHaveBeenCalledOnce();
    expect(mockFooter).toHaveBeenCalledOnce();
  });

  it("correctly render the error page", () => {
    setupWithRoute(`/error`);

    expect(ErrorRedirect).not.toHaveBeenCalled();

    const pageHeader = screen.getByTestId("page-header");
    const errorPage = screen.getByTestId("error-page");
    const footer = screen.getByTestId("credit-footer");

    expect(pageHeader).toBeInTheDocument();
    expect(errorPage).toBeInTheDocument();
    expect(footer).toBeInTheDocument();

    expect(mockHeader).toHaveBeenCalledOnce();
    expect(mockErrorPage).toHaveBeenCalledOnce();
    expect(mockFooter).toHaveBeenCalledOnce();
  });

  it("correctly redirects to error page when an error occurs", () => {
    setupWithRoute(`/unknown`);

    expect(ErrorRedirect).toHaveBeenCalledOnce();

    const pageHeader = screen.getByTestId("page-header");
    const errorPage = screen.getByTestId("error-page");
    const footer = screen.getByTestId("credit-footer");

    expect(pageHeader).toBeInTheDocument();
    expect(errorPage).toBeInTheDocument();
    expect(footer).toBeInTheDocument();

    expect(mockHeader).toHaveBeenCalledOnce();
    expect(mockErrorPage).toHaveBeenCalledOnce();
    expect(mockFooter).toHaveBeenCalledOnce();
  });
});
