import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import {
  WishlistButton,
  AddToCartButton,
  EditInCartButton,
} from "../StyledProductInfo.jsx";
import SavedProductsContext from "../../../contexts/SavedProductsContext.jsx";
import userEvent from "@testing-library/user-event";

const productInfo = { id: 1, title: "test product" };

const mockHeartToggleIcon = vi.fn();
vi.mock("../../Icons/HeartToggleIcon.jsx", () => ({
  default: (props) => {
    mockHeartToggleIcon(props.fill);
    return (
      <span data-testid="__heart-icon__">{`Heart icon ${
        props.fill ? "fill" : ""
      }`}</span>
    );
  },
}));

vi.mock("../../Icons/CartIcon.jsx", () => ({
  default: () => {
    return <span data-testid="__cart-icon__">{"Cart icon"}</span>;
  },
}));

const sampleNewItemsInCartToSet = 7;
const mockCustomNumericInput = vi.fn();
vi.mock("../../Form/CustomNumericInput.jsx", () => ({
  default: (props) => {
    // The component has already been tested.
    // We just need to check that it is called with the correct props

    // This is used to test that the correct non-function props are passed
    mockCustomNumericInput({
      value: props.value,
      id: props.id,
      min: props.min,
      max: props.max,
      inputAriaLabel: props.inputAriaLabel,
      decrementAriaLabel: props.decrementAriaLabel,
      incrementAriaLabel: props.incrementAriaLabel,
    });

    // The function props are called during setup to ensure they are the correct ones
    // As you will see from the test below, this means the dispatch function
    // from the context has to be called properly
    props.incrementValueCallback();
    props.decrementValueCallback();
    props.setValueCallback(sampleNewItemsInCartToSet);

    return <div>Mock CustomNumericInput</div>;
  },
}));

const sampleEditInCartButtonData = {
  id: "itemsInCartInput-#1", // 1: product id
  min: 1,
  max: productInfo.stock,
  inputAriaLabel: "Set number of items in cart",
  decrementAriaLabel: "Remove one item from cart",
  incrementAriaLabel: "Add one item to cart",
};

const getSampleEditInCartButtonData = (val) => ({
  value: val,
  ...sampleEditInCartButtonData,
});

const contextDispatch = vi.fn();

/* mocks are hoisted: reset them before each test */
afterEach(() => {
  vi.resetAllMocks();
});

const getComponentToTest = (which) => {
  switch (which) {
    case "WishlistButton":
      return <WishlistButton product={productInfo} />;
    case "AddToCartButton":
      return <AddToCartButton product={productInfo} />;
    case "EditInCartButton":
      return <EditInCartButton product={productInfo} />;
  }
};

const setup = (
  which = "",
  { inWishlist = false, outOfStock = false, inCart = 1 }
) => {
  return {
    user: userEvent.setup(),
    ...render(
      <SavedProductsContext.Provider
        value={{
          isInWishlist: () => inWishlist,
          isOutOfStock: () => outOfStock,
          inCart: () => inCart,
          dispatch: contextDispatch,
        }}
      >
        {getComponentToTest(which)}
      </SavedProductsContext.Provider>
    ),
  };
};

describe("StyledProductInfo", () => {
  describe("WishlistButton", () => {
    it("correctly renders the component (when item not in wishlist)", () => {
      setup("WishlistButton", { inWishlist: false });

      const button = screen.getByRole("button", { name: "Add to wishlist" });
      const heartIcon = within(button).getByTestId("__heart-icon__");

      expect(contextDispatch).not.toHaveBeenCalled();
      expect(mockHeartToggleIcon).toHaveBeenCalledExactlyOnceWith(false);
      expect(button).toBeInTheDocument();
      expect(heartIcon).toBeInTheDocument();
    });

    it("correctly renders the component (when item in wishlist)", () => {
      setup("WishlistButton", { inWishlist: true });

      const button = screen.getByRole("button", {
        name: "Remove from wishlist",
      });
      const heartIcon = within(button).getByTestId("__heart-icon__");

      expect(contextDispatch).not.toHaveBeenCalled();
      expect(mockHeartToggleIcon).toHaveBeenCalledExactlyOnceWith(true);
      expect(button).toBeInTheDocument();
      expect(heartIcon).toBeInTheDocument();
    });

    it("correctly toggle the product to the wishlist (when item not in wishlist)", async () => {
      const { user } = setup("WishlistButton", { inWishlist: false });

      const button = screen.getByRole("button", { name: "Add to wishlist" });

      vi.resetAllMocks();
      await user.click(button);

      expect(contextDispatch).toHaveBeenCalledExactlyOnceWith({
        type: "toggleWishlist",
        product: productInfo,
      });
    });

    it("correctly toggle the product to the wishlist (when item in wishlist)", async () => {
      const { user } = setup("WishlistButton", { inWishlist: true });

      const button = screen.getByRole("button", {
        name: "Remove from wishlist",
      });

      vi.resetAllMocks();
      await user.click(button);

      expect(contextDispatch).toHaveBeenCalledExactlyOnceWith({
        type: "toggleWishlist",
        product: productInfo,
      });
    });
  });

  describe("AddToCartButton", () => {
    it("correctly renders the component (when product not out of stock)", () => {
      setup("AddToCartButton", {
        outOfStock: false,
      });

      const button = screen.getByRole("button", { name: "Add to cart" });
      const cartIcon = within(button).getByTestId("__cart-icon__");

      expect(contextDispatch).not.toHaveBeenCalled();
      expect(button).toBeInTheDocument();
      expect(cartIcon).toBeInTheDocument();
      expect(button).not.toBeDisabled();
    });

    it("correctly renders the component (when product out of stock)", () => {
      setup("AddToCartButton", {
        outOfStock: true,
      });

      const button = screen.getByRole("button", { name: "Add to cart" });
      const cartIcon = within(button).getByTestId("__cart-icon__");

      expect(contextDispatch).not.toHaveBeenCalled();
      expect(button).toBeInTheDocument();
      expect(cartIcon).toBeInTheDocument();
      expect(button).toBeDisabled();
    });

    it("can add a product to the cart  (when product not out of stock)", async () => {
      const { user } = setup("AddToCartButton", {
        outOfStock: false,
      });

      const button = screen.getByRole("button", { name: "Add to cart" });

      vi.resetAllMocks();
      await user.click(button);

      expect(contextDispatch).toHaveBeenCalledExactlyOnceWith({
        type: "addToCart",
        product: productInfo,
      });
    });
  });

  describe("EditInCartButton", () => {
    it("correctly renders the component", () => {
      const inCart = 2;

      setup("EditInCartButton", {
        inCart: inCart,
      });

      expect(mockCustomNumericInput).toHaveBeenCalledExactlyOnceWith(
        getSampleEditInCartButtonData(inCart)
      );
      expect(contextDispatch).toHaveBeenCalledTimes(3);

      expect(contextDispatch).toHaveBeenNthCalledWith(1, {
        type: "addToCart",
        product: productInfo,
      });

      expect(contextDispatch).toHaveBeenNthCalledWith(2, {
        type: "pushFromCart",
        product: productInfo,
      });

      expect(contextDispatch).toHaveBeenNthCalledWith(3, {
        type: "setMultipleToCart",
        product: productInfo,
        count: sampleNewItemsInCartToSet,
      });
    });
  });
});
