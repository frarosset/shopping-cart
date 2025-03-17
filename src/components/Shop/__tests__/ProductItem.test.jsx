import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductItem from "../ProductItem.jsx";

const productData = {
  title: "Product Title",
};

const setup = () => ({
  ...render(<ProductItem productData={productData} />),
});

describe("ProductItem", () => {
  it("renders a heading with the product title", () => {
    setup();

    const productTitle = screen.getByRole("heading", {
      name: productData.title,
    });

    expect(productTitle).toBeInTheDocument();
  });
});
