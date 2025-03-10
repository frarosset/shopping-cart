import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header.jsx";
import data from "../../assets/data.json";

describe("Header", () => {
  it("renders the correct heading (shop name)", () => {
    render(<Header />);

    const heading = screen.getByRole("heading");

    expect(heading.textContent).toMatch(data.shopName);
  });

  it("renders a nav menu to navigate the site", () => {
    render(<Header />);

    const nav = screen.getByRole("navigation");

    expect(nav).toBeInTheDocument();
  });

  it("renders search, profile, watchlist and cart buttons", () => {
    render(<Header />);

    const buttonNames = ["search", "profile", "watchlist", "cart"];

    const allButtons = screen.getAllByRole("button");
    const buttons = buttonNames.map((name) =>
      screen.getByRole("button", { name })
    );

    expect(allButtons).toHaveLength(buttonNames.length);
    buttons.forEach((button) => expect(button).toBeInTheDocument());
  });
});
