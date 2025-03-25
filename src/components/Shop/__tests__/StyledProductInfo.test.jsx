import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { WishlistButton } from "../StyledProductInfo.jsx";
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

/* mocks are hoisted: reset them before each test */
afterEach(() => {
  vi.resetAllMocks();
});

const setup = () => {
  return {
    user: userEvent.setup(),
    ...render(
      <SavedProductsContextProvider>
        <WishlistButton product={productInfo} />
      </SavedProductsContextProvider>
    ),
  };
};

describe("StyledProductInfo", () => {
  describe("WishlistButton", () => {
    it("correctly renders the component", () => {
      setup();

      const button = screen.getByRole("button");

      expect(mockHeartToggleIcon).toHaveBeenCalledExactlyOnceWith(false);
      expect(button).toBeInTheDocument();
    });

    it("correctly adds the product to the wishlist", async () => {
      const { user } = setup();

      const button = screen.getByRole("button");

      await user.click(button);

      expect(mockHeartToggleIcon).toHaveBeenCalledWith(true);
      expect(button).toBeInTheDocument();
    });

    it("correctly removes the product from the wishlist after having set it", async () => {
      const { user } = setup();

      const button = screen.getByRole("button");

      await user.click(button);
      await user.click(button);

      expect(mockHeartToggleIcon).toHaveBeenCalledWith(false);
      expect(button).toBeInTheDocument();
    });
  });
});
