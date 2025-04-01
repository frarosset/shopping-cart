import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CartMain from "../CartMain.jsx";
import { HeadingLevelContextProvider } from "../../../contexts/HeadingLevelContext.jsx";

const setup = () => {
  return {
    ...render(
      <HeadingLevelContextProvider>
        <CartMain />
      </HeadingLevelContextProvider>
    ),
  };
};

describe("ShopCategoryMain", () => {
  it("renders a heading with the Cart text", () => {
    setup();

    const heading = screen.getByRole("heading", "Cart");

    expect(heading).toBeInTheDocument();
  });
});
