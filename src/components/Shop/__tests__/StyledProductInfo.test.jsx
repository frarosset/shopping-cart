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

vi.mock("../../Icons/PlusIcon.jsx", () => ({
  default: () => {
    return <span data-testid="__plus-icon__">{"Plus icon"}</span>;
  },
}));

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

const setup = (which = "", { inWishlist = false, outOfStock = false }) => {
  return {
    user: userEvent.setup(),
    ...render(
      <SavedProductsContext.Provider
        value={{
          isInWishlist: () => inWishlist,
          isOutOfStock: () => outOfStock,
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
    it("correctly renders the component (when not out of stock)", () => {
      setup("EditInCartButton", {
        outOfStock: false,
      });

      const button = screen.getByRole("button", {
        name: "Add one item to cart",
      });
      const plusIcon = within(button).getByTestId("__plus-icon__");

      expect(contextDispatch).not.toHaveBeenCalled();

      expect(button).toBeInTheDocument();
      expect(plusIcon).toBeInTheDocument();
    });

    it("correctly renders the component (when product not out of stock)", () => {
      setup("EditInCartButton", {
        outOfStock: true,
      });

      const addButton = screen.getByRole("button", {
        name: "Add one item to cart",
      });
      const plusIcon = within(addButton).getByTestId("__plus-icon__");

      expect(contextDispatch).not.toHaveBeenCalled();

      expect(addButton).toBeInTheDocument();
      expect(plusIcon).toBeInTheDocument();
      expect(addButton).toBeDisabled();
    });

    it("can add a product to the cart  (when not out of stock)", async () => {
      const { user } = setup("EditInCartButton", {
        outOfStock: false,
      });

      const button = screen.getByRole("button", {
        name: "Add one item to cart",
      });

      vi.resetAllMocks();
      await user.click(button);

      expect(contextDispatch).toHaveBeenCalledExactlyOnceWith({
        type: "addToCart",
        product: productInfo,
      });
    });
  });
});
