import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CategorySectionList from "./CategorySectionList.jsx";

const setup = () => ({
  ...render(<CategorySectionList />),
});

describe("CategorySectionList", () => {
  it("renders a list", () => {
    setup();

    const categorySectionList = screen.getByRole("list");

    expect(categorySectionList).toBeInTheDocument();
  });
});
