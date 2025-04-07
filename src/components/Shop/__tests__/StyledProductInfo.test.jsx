import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { WishlistButton, AddToCartButton } from "../StyledProductInfo.jsx";
import { SavedProductsContextProvider } from "../../../contexts/SavedProductsContext.jsx";
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
  }
};

const setup = (which = "") => {
  return {
    user: userEvent.setup(),
    ...render(
      <SavedProductsContextProvider>
        {getComponentToTest(which)}
      </SavedProductsContextProvider>
    ),
  };
};

describe("StyledProductInfo", () => {
  describe("WishlistButton", () => {
    it("correctly renders the component", () => {
      setup("WishlistButton");

      const button = screen.getByRole("button");
      const heartIcon = within(button).getByTestId("__heart-icon__");

      expect(mockHeartToggleIcon).toHaveBeenCalledExactlyOnceWith(false);
      expect(button).toBeInTheDocument();
      expect(heartIcon).toBeInTheDocument();
    });

    it("correctly adds the product to the wishlist", async () => {
      const { user } = setup("WishlistButton");

      const button = screen.getByRole("button");

      await user.click(button);

      expect(mockHeartToggleIcon).toHaveBeenCalledWith(true);
      expect(button).toBeInTheDocument();
    });

    it("correctly removes the product from the wishlist after having set it", async () => {
      const { user } = setup("WishlistButton");

      const button = screen.getByRole("button");

      await user.click(button);
      await user.click(button);

      expect(mockHeartToggleIcon).toHaveBeenCalledWith(false);
      expect(button).toBeInTheDocument();
    });
  });

  describe("AddToCartButton", () => {
    it("correctly renders the component", () => {
      setup("AddToCartButton");

      const button = screen.getByRole("button");
      const cartIcon = within(button).getByTestId("__cart-icon__");

      expect(button).toBeInTheDocument();
      expect(cartIcon).toBeInTheDocument();
    });

    it("correctly adds a product to the cart", async () => {
      const { user } = setup("AddToCartButton");

      const button = screen.getByRole("button");

      await user.click(button);

      expect(button).toBeInTheDocument();
    });
  });
});
