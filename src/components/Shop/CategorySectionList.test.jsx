import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CategorySectionList from "./CategorySectionList.jsx";
import data from "../../assets/data.json";

const setup = () => ({
  ...render(<CategorySectionList sectionList={data.sectionList} />),
});

describe("CategorySectionList", () => {
  it("renders a list", () => {
    setup();

    const categorySectionList = screen.getByRole("list");

    expect(categorySectionList).toBeInTheDocument();
  });

  it("renders a list of category sections", () => {
    setup();

    const sectionItems = screen.getAllByRole("listitem");
    expect(sectionItems.length).toBe(data.sectionList.length);

    data.sectionList.forEach((section) => {
      const sectionItem = sectionItems.find(
        (item) => item.textContent === section
      );
      expect(sectionItem).toBeInTheDocument();
    });
  });
});
