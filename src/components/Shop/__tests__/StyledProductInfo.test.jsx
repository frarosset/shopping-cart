import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import {
  WishlistButton,
  AddToCartButton,
  EditItemsInCart,
  AddMultipleToCart,
  RemoveFromCartButton,
} from "../StyledProductInfo.jsx";
import SavedProductsContext from "../../../contexts/SavedProductsContext.jsx";
import userEvent from "@testing-library/user-event";
import data from "../../../assets/data.json";
import CustomNumericInput from "../../Form/CustomNumericInput.jsx";

const productInfo = { id: 1, title: "test product", stock: 100 };

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

vi.mock("../../Icons/TrashIcon.jsx", () => ({
  default: () => {
    return <span data-testid="__trash-icon__">{"Trash icon"}</span>;
  },
}));

vi.mock("../../Form/CustomNumericInput.jsx", { spy: true });

vi.mock("../../Icons/PlusIcon.jsx", () => ({
  default: () => {
    return <span data-testid="__plus-icon__">{"Plus icon"}</span>;
  },
}));

vi.mock("../../Icons/MinusIcon.jsx", () => ({
  default: () => {
    return <span data-testid="__minus-icon__">{"Minus icon"}</span>;
  },
}));

const sampleEditItemsInCartData = {
  id: "itemsInCartInput-#1", // 1: product id
  min: 1,
  max: productInfo.stock,
  inputAriaLabel: "Set number of items in cart",
  decrementAriaLabel: "Remove one item from cart",
  incrementAriaLabel: "Add one item to cart",
};

const getSampleEditItemsInCartData = (inCart) => ({
  value: inCart,
  ...sampleEditItemsInCartData,
});

const sampleAddMultipleToCartData = {
  id: "addMultipleToCartInput-#1", // 1: product id
  min: 1,
  inputAriaLabel: "Set number of items to add to cart",
  decrementAriaLabel: "Decrement number of items to add to cart",
  incrementAriaLabel: "Increment number of items to add to cart",
};

const getSampleAddMultipleToCartData = (inCart, itemsToAdd) => ({
  value: itemsToAdd,
  max: Math.max(productInfo.stock - inCart, 1),
  ...sampleAddMultipleToCartData,
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
    case "EditItemsInCart":
      return <EditItemsInCart product={productInfo} />;
    case "AddMultipleToCart":
      return <AddMultipleToCart product={productInfo} />;
    case "RemoveFromCartButton":
      return <RemoveFromCartButton product={productInfo} />;
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

  describe("RemoveFromCartButton", () => {
    it("correctly renders the component (when product in cart)", () => {
      setup("RemoveFromCartButton", {
        inCart: 3,
      });

      const button = screen.getByRole("button", { name: "Remove from cart" });
      const trashIcon = within(button).getByTestId("__trash-icon__");

      expect(contextDispatch).not.toHaveBeenCalled();
      expect(button).toBeInTheDocument();
      expect(trashIcon).toBeInTheDocument();
      expect(button).not.toBeDisabled();
    });

    it("correctly renders the component (when product not in cart)", () => {
      setup("RemoveFromCartButton", {
        inCart: 0,
      });

      const button = screen.getByRole("button", { name: "Remove from cart" });
      const trashIcon = within(button).getByTestId("__trash-icon__");

      expect(contextDispatch).not.toHaveBeenCalled();
      expect(button).toBeInTheDocument();
      expect(trashIcon).toBeInTheDocument();
      expect(button).toBeDisabled();
    });

    it("can remove a product from the cart  (when in cart, regardless on the number of items)", async () => {
      const { user } = setup("RemoveFromCartButton", {
        inCart: 3,
      });

      const button = screen.getByRole("button", { name: "Remove from cart" });

      vi.resetAllMocks();
      await user.click(button);

      expect(contextDispatch).toHaveBeenCalledExactlyOnceWith({
        type: "removeFromCart",
        product: productInfo,
      });
    });
  });

  describe("EditItemsInCart", () => {
    const getElements = (stockLeft) => {
      const allStockInCart = screen.queryByText("No more stock available");
      const lowStock = screen.queryByText(`Only ${stockLeft} items left`);

      const incrementButton = screen.getByRole("button", {
        name: sampleEditItemsInCartData.incrementAriaLabel,
      });
      const decrementButton = screen.getByRole("button", {
        name: sampleEditItemsInCartData.decrementAriaLabel,
      });
      const editValueInput = screen.getByRole("spinbutton", {
        name: sampleEditItemsInCartData.inputAriaLabel,
      });

      return {
        allStockInCart,
        lowStock,
        incrementButton,
        decrementButton,
        editValueInput,
      };
    };

    it("correctly renders the component (when there is enough stock)", () => {
      const stockLeft = data.lowStockAt + 1;
      const inCart = productInfo.stock - stockLeft;

      setup("EditItemsInCart", { inCart: inCart });

      const el = getElements(stockLeft);

      expect(contextDispatch).not.toHaveBeenCalled();

      const CutsomNumericInputProps = CustomNumericInput.mock.calls[0][0];

      // Checking subset of properties
      expect(CutsomNumericInputProps).toMatchObject(
        getSampleEditItemsInCartData(inCart)
      );

      expect(el.incrementButton).toBeInTheDocument();
      expect(el.decrementButton).toBeInTheDocument();
      expect(el.editValueInput).toBeInTheDocument();

      expect(el.allStockInCart).not.toBeInTheDocument();
      expect(el.lowStock).not.toBeInTheDocument();
    });

    it("shows a custom message when all the stock is in the cart", () => {
      const stockLeft = 0;
      const inCart = productInfo.stock - stockLeft;

      setup("EditItemsInCart", {
        inCart: inCart,
      });

      const el = getElements(stockLeft);

      expect(el.allStockInCart).toBeInTheDocument();
      expect(el.lowStock).not.toBeInTheDocument();
    });

    it("shows a custom message when low stock left", () => {
      const stockLeft = data.lowStockAt;
      const inCart = productInfo.stock - stockLeft;

      setup("EditItemsInCart", {
        inCart: inCart,
      });

      const el = getElements(stockLeft);

      expect(el.allStockInCart).not.toBeInTheDocument();
      expect(el.lowStock).toBeInTheDocument();
    });

    it("correctly increment the number of items in the cart (when there is enough stock)", async () => {
      const stockLeft = data.lowStockAt + 1;
      const inCart = productInfo.stock - stockLeft;

      const { user } = setup("EditItemsInCart", {
        inCart: inCart,
      });

      const el = getElements(stockLeft);

      vi.resetAllMocks();
      await user.click(el.incrementButton);

      expect(contextDispatch).toHaveBeenCalledExactlyOnceWith({
        type: "addToCart",
        product: productInfo,
      });
    });

    it("correctly decrement the number of items in the cart (when there is enough stock)", async () => {
      const stockLeft = data.lowStockAt + 1;
      const inCart = productInfo.stock - stockLeft;

      const { user } = setup("EditItemsInCart", {
        inCart: inCart,
      });

      const el = getElements(stockLeft);

      vi.resetAllMocks();
      await user.click(el.decrementButton);

      expect(contextDispatch).toHaveBeenCalledExactlyOnceWith({
        type: "pushFromCart",
        product: productInfo,
      });
    });

    it("correctly change the number of items in the cart (when there is enough stock)", async () => {
      const stockLeft = data.lowStockAt + 1;
      const inCart = productInfo.stock - stockLeft;
      const newItemsInCartToSet = inCart + 2;

      const { user } = setup("EditItemsInCart", {
        inCart: inCart,
      });

      const el = getElements(stockLeft);

      vi.resetAllMocks();
      await user.clear(el.editValueInput);
      await user.type(el.editValueInput, `${newItemsInCartToSet}{Enter}`);

      expect(contextDispatch).toHaveBeenCalledExactlyOnceWith({
        type: "setMultipleToCart",
        product: productInfo,
        count: newItemsInCartToSet,
      });
    });
  });

  describe("AddMultipleToCart", () => {
    const getElements = (stockLeft) => {
      const allStockInCart = screen.queryByText("No more stock available");
      const lowStock = screen.queryByText(`Only ${stockLeft} items left`);

      const incrementButton = screen.getByRole("button", {
        name: sampleAddMultipleToCartData.incrementAriaLabel,
      });
      const decrementButton = screen.getByRole("button", {
        name: sampleAddMultipleToCartData.decrementAriaLabel,
      });
      const editValueInput = screen.getByRole("spinbutton", {
        name: sampleAddMultipleToCartData.inputAriaLabel,
      });

      const addToCartButton = screen.getByRole("button", {
        name: `Add to cart`,
      });

      return {
        allStockInCart,
        lowStock,
        incrementButton,
        decrementButton,
        editValueInput,
        addToCartButton,
      };
    };

    it("correctly renders the component (when there is enough stock)", () => {
      const stockLeft = data.lowStockAt + 1;
      const inCart = productInfo.stock - stockLeft;
      const itemsToAdd = 1;

      setup("AddMultipleToCart", {
        inCart: inCart,
        outOfStock: stockLeft == 0,
      });

      const el = getElements(stockLeft);

      expect(contextDispatch).not.toHaveBeenCalled();

      const CutsomNumericInputProps = CustomNumericInput.mock.calls[0][0];

      // Checking subset of properties
      expect(CutsomNumericInputProps).toMatchObject(
        getSampleAddMultipleToCartData(inCart, itemsToAdd)
      );

      expect(el.incrementButton).toBeInTheDocument();
      expect(el.decrementButton).toBeInTheDocument();
      expect(el.editValueInput).toBeInTheDocument();

      expect(el.allStockInCart).not.toBeInTheDocument();
      expect(el.lowStock).not.toBeInTheDocument();

      expect(el.addToCartButton).toBeInTheDocument();
      expect(el.addToCartButton).not.toBeDisabled();
    });

    it("shows a custom message when all the stock is in the cart", () => {
      const stockLeft = 0;
      const inCart = productInfo.stock - stockLeft;

      setup("AddMultipleToCart", {
        inCart: inCart,
        outOfStock: stockLeft == 0,
      });

      const el = getElements(stockLeft);

      expect(el.allStockInCart).toBeInTheDocument();
      expect(el.lowStock).not.toBeInTheDocument();
    });

    it("shows a custom message when low stock left", () => {
      const stockLeft = data.lowStockAt;
      const inCart = productInfo.stock - stockLeft;

      setup("AddMultipleToCart", {
        inCart: inCart,
        outOfStock: stockLeft == 0,
      });

      const el = getElements(stockLeft);

      expect(el.allStockInCart).not.toBeInTheDocument();
      expect(el.lowStock).toBeInTheDocument();
    });

    it("disables the 'Add to cart' button all the stock is in the cart", () => {
      const stockLeft = 0;
      const inCart = productInfo.stock - stockLeft;

      setup("AddMultipleToCart", {
        inCart: inCart,
        outOfStock: stockLeft == 0,
      });

      const el = getElements(stockLeft);

      expect(el.addToCartButton).toBeInTheDocument();
      expect(el.addToCartButton).toBeDisabled();
    });
  });
});
