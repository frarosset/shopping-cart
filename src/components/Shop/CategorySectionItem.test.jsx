import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CategorySectionItem from "./CategorySectionItem.jsx";
import data from "../../assets/data.json";

const section = data.sectionList[0];
const sectionData = data.sections[section];

const setup = () => ({
  ...render(<CategorySectionItem section={section} />),
});

describe("CategorySectionItem", () => {
  it("renders a heading with the category name", () => {
    setup();

    const categoryName = screen.getByRole("heading", {
      name: sectionData.name,
    });

    expect(categoryName).toBeInTheDocument();
  });
});
