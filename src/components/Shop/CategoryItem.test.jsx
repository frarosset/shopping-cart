import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CategoryItem from "./CategoryItem.jsx";
import data from "../../assets/data.json";

const category = Object.keys(data.categories)[0];
const categoryData = data.categories[category];

const setup = () => ({
  ...render(<CategoryItem category={category} />),
});

describe("CategoryItem", () => {
  it("renders a text with the category name", () => {
    setup();

    const categoryName = screen.getByText(categoryData.name);

    expect(categoryName).toBeInTheDocument();
  });
});
