import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SearchMain from "../SearchMain";
import { HeadingLevelContextProvider } from "../../../contexts/HeadingLevelContext.jsx";

const setup = () => {
  return {
    ...render(
      <HeadingLevelContextProvider>
        <SearchMain />
      </HeadingLevelContextProvider>
    ),
  };
};

describe("SearchMain", () => {
  it("renders a heading with Search text", () => {
    setup();

    const heading = screen.getByRole("heading", { name: /Search/i });

    expect(heading).toBeInTheDocument();
  });

  it("renders a search input component initialized with empty string", () => {
    setup();

    const searchInput = screen.getByRole("searchbox");

    expect(searchInput).toBeInTheDocument();
    expect(searchInput.value).toBe("");
  });
});
