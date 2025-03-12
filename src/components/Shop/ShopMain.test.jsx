import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ShopMain from "./ShopMain.jsx";

const setup = () => {
  return {
    ...render(<ShopMain />),
  };
};

describe("ShopMain", () => {
  it("correctly renders the component", () => {
    setup();

    const categorySectionList = screen.getByTestId("category-section-list");

    expect(categorySectionList).toBeInTheDocument();
  });
});
