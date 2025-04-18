import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Header from "../Header.jsx";
import { HeadingLevelContextProvider } from "../../../contexts/HeadingLevelContext.jsx";
import data from "../../../assets/data.json";

const navRoutesTo = ["shop"];
const routesTo = ["", "search", "wishlist", "cart", ...navRoutesTo];

const setup = () => ({
  ...render(
    <HeadingLevelContextProvider>
      <Header />
    </HeadingLevelContextProvider>,
    { wrapper: MemoryRouter }
  ),
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
    const links = within(nav).getAllByRole("link");

    expect(nav).toBeInTheDocument();
    expect(links).toHaveLength(navRoutesTo.length);
  });

  it("renders links to / (home), /shop pages", () => {
    setup();

    const basePath = window.location.href;
    const allLinks = screen.getAllByRole("link");

    expect(allLinks).toHaveLength(routesTo.length);

    routesTo.forEach((routeTo) => {
      const link = allLinks.filter((link) => {
        return link.href === `${basePath}${routeTo}`;
      });

      expect(link).toHaveLength(1);
    });
  });

  it("renders profile, wishlist and cart buttons", () => {
    setup();

    const buttonNames = ["profile"];

    const allButtons = screen.getAllByRole("button");
    const buttons = buttonNames.map((name) =>
      screen.getByRole("button", { name })
    );

    expect(allButtons).toHaveLength(buttons.length);
    buttons.forEach((button) => expect(button).toBeInTheDocument());
  });
});
