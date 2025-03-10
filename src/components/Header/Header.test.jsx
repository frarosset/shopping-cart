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
});
