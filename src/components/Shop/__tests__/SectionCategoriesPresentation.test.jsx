import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import SectionCategoriesPresentation from "../SectionCategoriesPresentation.jsx";
import { HeadingLevelContextProvider } from "../../../contexts/HeadingLevelContext.jsx";
import data from "../../../assets/data.json";

const sampleCategories = Object.keys(data.categories);
const sampleCategoriesData = data.categories;

const setup = () => {
  return {
    ...render(
      <HeadingLevelContextProvider>
        <SectionCategoriesPresentation sectionCategories={sampleCategories} />
      </HeadingLevelContextProvider>
    ),
  };
};

describe("SectionCategoriesPresentation", () => {
  it("renders a list of categories associated with the section", () => {
    setup();

    const list = screen.getByRole("list");
    const liAll = within(list).getAllByRole("listitem");

    liAll.forEach((li, idx) => {
      const heading = within(li).getByRole("heading", {
        name: sampleCategoriesData[sampleCategories[idx]].name,
      });

      expect(heading).toBeInTheDocument();
    });
  });
});
