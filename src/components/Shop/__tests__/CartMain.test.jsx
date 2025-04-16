import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import CartMain from "../CartMain.jsx";
import { MemoryRouter } from "react-router";
import { HeadingLevelContextProvider } from "../../../contexts/HeadingLevelContext.jsx";
import SavedProductsContext from "../../../contexts/SavedProductsContext.jsx";
import data from "../../../assets/data.json";
import { getCartSummary } from "../../../utils/priceUtils.js";

const baseShippingFee = data.baseShippingFee;
const freeShippingAt = data.freeShippingAt;

const sampleCart = [
  {
    id: 2,
    title: "Item 2",
    price: 100,
    discountPercentage: 20,
    rating: 3.5,
    thumbnail: "url/to/thumbnail/2",
    availabilityStatus: "In Stock",
    stock: 44,
    inWishlist: true,
    inCart: 5,
  },
  {
    id: 6,
    title: "Item 6",
    price: 35,
    discountPercentage: 0,
    rating: 5,
    thumbnail: "url/to/thumbnail/6",
    availabilityStatus: "In Stock",
    stock: 64,
    inWishlist: true,
    inCart: 1,
  },
  {
    id: 9,
    title: "Item 9",
    price: 14,
    discountPercentage: 7,
    rating: 1.2,
    thumbnail: "url/to/thumbnail/9",
    availabilityStatus: "In Stock",
    stock: 65,
    inWishlist: false,
    inCart: 2,
  },
];

const mockCartSummary = vi.fn();
vi.mock("../CartSummary.jsx", () => ({
  default: (props) => {
    mockCartSummary(props);
    return <span data-testid="__cart-summary__">Cart Summary</span>;
  },
}));

const mockCartShippingFeeInfo = vi.fn();
vi.mock("../CartShippingFeeInfo.jsx", () => ({
  default: ({ toAddForFreeShipping }) => {
    mockCartShippingFeeInfo(toAddForFreeShipping);
    return (
      <span data-testid="__cart-to-add-for-free-shipping__">
        Message abount the amoung to add to get free shipping
      </span>
    );
  },
}));

const mockCartProductList = vi.fn();
vi.mock("../CartProductList.jsx", () => ({
  default: ({ productDataList }) => {
    mockCartProductList(productDataList);
    return <span data-testid="__cart-product-list__">Cart items list</span>;
  },
}));

vi.mock("../../Icons/CashRegisterIcon.jsx", () => ({
  default: () => {
    return (
      <span data-testid="__cash-register-icon__">{"Cash register icon"}</span>
    );
  },
}));

/* mocks are hoisted: reset them before each test */
afterEach(() => {
  vi.resetAllMocks();
});

const setup = (cart = []) => {
  const cartItems = cart.reduce((count, itm) => count + itm.inCart, 0);
  const savedProducts = { cart, cartItems };
  const cartSummaryData = getCartSummary(cart, baseShippingFee, freeShippingAt);

  return {
    cartItems,
    cart,
    cartSummaryData,
    ...render(
      <MemoryRouter>
        <SavedProductsContext value={savedProducts}>
          <HeadingLevelContextProvider>
            <CartMain />
          </HeadingLevelContextProvider>
        </SavedProductsContext>
      </MemoryRouter>
    ),
  };
};

const getElements = () => {
  const emptyText = screen.queryByText("Your cart is empty!");
  const linkToShopPage = screen.queryByRole("link");
  const cartSummary = screen.queryByTestId("__cart-summary__");
  const cartShippingFeeInfo = screen.queryByTestId(
    "__cart-to-add-for-free-shipping__"
  );
  const cartProductList = screen.queryByTestId("__cart-product-list__");
  const checkoutButton = screen.queryByRole("button", { name: "Checkout" });

  const cashRegisterIcon = checkoutButton
    ? within(checkoutButton).queryByTestId("__cash-register-icon__")
    : screen.queryByTestId("__cash-register-icon__");

  return {
    emptyText,
    linkToShopPage,
    cartSummary,
    cartShippingFeeInfo,
    cartProductList,
    checkoutButton,
    cashRegisterIcon,
  };
};

describe("CartMain", () => {
  it("renders a heading with the Cart text", () => {
    setup();

    const heading = screen.getByRole("heading", "Cart");

    expect(heading).toBeInTheDocument();
  });

  it("renders an empty cart message and a link to the shop page when empty cart", () => {
    // the cart is empty at initialization

    setup();

    const el = getElements();

    expect(mockCartProductList).not.toHaveBeenCalled();
    expect(mockCartSummary).not.toHaveBeenCalled();
    expect(mockCartShippingFeeInfo).toHaveBeenCalledExactlyOnceWith(
      freeShippingAt
    );

    expect(el.emptyText).toBeInTheDocument();
    expect(el.linkToShopPage).toBeInTheDocument();
    expect(el.cartSummary).not.toBeInTheDocument();
    expect(el.cartShippingFeeInfo).toBeInTheDocument();
    expect(el.cartProductList).not.toBeInTheDocument();
    expect(el.checkoutButton).not.toBeInTheDocument();
    expect(el.cashRegisterIcon).not.toBeInTheDocument();
  });

  it("renders a summary of the order costs when not-empty cart", () => {
    const { cartItems, cartSummaryData } = setup(sampleCart);

    const el = getElements();

    expect(mockCartProductList).toHaveBeenCalledExactlyOnceWith(sampleCart);
    expect(mockCartSummary).toHaveBeenCalledExactlyOnceWith({
      ...cartSummaryData,
      cartItems,
      className: expect.anything(),
    });
    expect(mockCartShippingFeeInfo).toHaveBeenCalledExactlyOnceWith(
      cartSummaryData.toAddForFreeShipping
    );

    expect(el.emptyText).not.toBeInTheDocument();
    expect(el.linkToShopPage).not.toBeInTheDocument();
    expect(el.cartSummary).toBeInTheDocument();
    expect(el.cartShippingFeeInfo).toBeInTheDocument();
    expect(el.cartProductList).toBeInTheDocument();
    expect(el.checkoutButton).toBeInTheDocument();
    expect(el.cashRegisterIcon).toBeInTheDocument();
  });
});
