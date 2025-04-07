import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { WishlistButton, AddToCartButton } from "../StyledProductInfo.jsx";
import { SavedProductsContextProvider } from "../../../contexts/SavedProductsContext.jsx";
import userEvent from "@testing-library/user-event";

const productInfo = { id: 1, title: "test product" };

const mockHeartToggleIcon = vi.fn();
vi.mock("../../Icons/HeartToggleIcon.jsx", () => ({
  default: (props) => {
    mockHeartToggleIcon(props.fill);
    return <span>{`Heart icon ${props.fill ? "fill" : ""}`}</span>;
  },
}));

const mockCartIcon = vi.fn();
vi.mock("../../Icons/CartIcon.jsx", () => ({
  default: (props) => {
    mockCartIcon();
    return <span>{`Cart icon ${props.cartItems}`}</span>;
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

      expect(mockHeartToggleIcon).toHaveBeenCalledExactlyOnceWith(false);
      expect(button).toBeInTheDocument();
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

      expect(mockCartIcon).toHaveBeenCalled();
      expect(button).toBeInTheDocument();
    });

    it("correctly adds a product to the cart", async () => {
      const { user } = setup("AddToCartButton");

      const button = screen.getByRole("button");

      await user.click(button);

      expect(mockCartIcon).toHaveBeenCalled();
      expect(button).toBeInTheDocument();
    });
  });
});
