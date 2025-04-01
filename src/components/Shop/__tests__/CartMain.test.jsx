import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CartMain from "../CartMain.jsx";
import { MemoryRouter } from "react-router";
import { HeadingLevelContextProvider } from "../../../contexts/HeadingLevelContext.jsx";
import SavedProductsContext from "../../../contexts/SavedProductsContext.jsx";

const setup = (savedProducts = { cart: [] }) => {
  return {
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

describe("ShopCategoryMain", () => {
  it("renders a heading with the Cart text", () => {
    setup();

    const heading = screen.getByRole("heading", "Cart");

    expect(heading).toBeInTheDocument();
  });

  it("renders an empty cart message and a link to the shop page when empty cart", () => {
    // the cart is empty at initialization

    setup();

    const emptyText = screen.getByText("Your cart is empty!");
    const linkToShopPage = screen.getByRole("link");

    expect(emptyText).toBeInTheDocument();
    expect(linkToShopPage).toBeInTheDocument();
  });
});
