import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header.jsx";
import data from "../../assets/data.json";

const setup = () => ({
  ...render(<Header />, { wrapper: MemoryRouter }),
});

describe("Header", () => {
  it("renders the correct heading (shop name)", () => {
    setup();

    const heading = screen.getByRole("heading");

    expect(heading.textContent).toMatch(data.shopName);
  });

  it("renders a nav menu to navigate the site", () => {
    setup();

    const nav = screen.getByRole("navigation");

    expect(nav).toBeInTheDocument();
  });

  it("renders links to / (home), /shop and /about pages", () => {
    setup();

    const routesTo = ["", "shop", "about"];
    const basePath = window.location.href;
    const allLinks = screen.getAllByRole("link");

    expect(allLinks).toHaveLength(routesTo.length);

    routesTo.forEach((routeTo) => {
      const link = allLinks.filter((link) => {
        return link.href === `${basePath}${routeTo}`;
      })[0];

      expect(link).toBeInTheDocument();
    });
  });

  it("renders search, profile, watchlist and cart buttons", () => {
    setup();

    const buttonNames = ["search", "profile", "watchlist", "cart"];

    const allButtons = screen.getAllByRole("button");
    const buttons = buttonNames.map((name) =>
      screen.getByRole("button", { name })
    );

    expect(allButtons).toHaveLength(buttonNames.length);
    buttons.forEach((button) => expect(button).toBeInTheDocument());
  });
});
