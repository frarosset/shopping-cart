import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CategoryItem from "./CategoryItem.jsx";
import data from "../../assets/data.json";

const category = Object.keys(data.categories)[0];
const categoryData = data.categories[category];

const setup = () => ({
  ...render(<CategoryItem category={category} />, {
    wrapper: MemoryRouter,
  }),
});

describe("CategoryItem", () => {
  it("renders a text with the category name", () => {
    setup();

    const categoryName = screen.getByText(categoryData.name);

    expect(categoryName).toBeInTheDocument();
  });

  it("renders a link to /shop/c/:category page", () => {
    setup();

    const routeTo = `shop/c/${category}`;
    const basePath = window.location.href;
    const link = screen.getByRole("link");

    expect(link).toBeInTheDocument();
    expect(link.href).toBe(`${basePath}${routeTo}`);
  });
});
