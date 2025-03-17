import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ProductItem from "../ProductItem.jsx";

const productData = {
  id: 10,
  title: "Product Title",
};

const setup = () => ({
  ...render(<ProductItem productData={productData} />, {
    wrapper: MemoryRouter,
  }),
});

describe("ProductItem", () => {
  it("renders a heading with the product title", () => {
    setup();

    const productTitle = screen.getByRole("heading", {
      name: productData.title,
    });

    expect(productTitle).toBeInTheDocument();
  });

  it("renders a link to /shop/p/:productId page", () => {
    setup();

    const routeTo = `shop/p/${productData.id}`;
    const basePath = window.location.href;
    const link = screen.getByRole("link");

    expect(link).toBeInTheDocument();
    expect(link.href).toBe(`${basePath}${routeTo}`);
  });
});
