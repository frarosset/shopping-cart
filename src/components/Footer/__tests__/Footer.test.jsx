import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Footer from "../Footer.jsx";

const setup = () => ({
  ...render(<Footer />),
});

describe("Footer", () => {
  it("renders the footer correctly", () => {
    const result = setup();

    expect(result).toMatchSnapshot();
  });
});
