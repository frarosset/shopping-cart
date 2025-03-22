import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Error from "../Error.jsx";

/* mocks are hoisted: reset them before each test */
afterEach(() => {
  vi.resetAllMocks();
});

const setup = () => {
  return {
    ...render(<Error />),
  };
};

describe("Error", () => {
  it("correctly render the error message", () => {
    setup();

    const heading = screen.getByRole("heading", { name: "Oops!" });
    const subheading = screen.getByText("Something went wrong...");

    expect(heading).toBeInTheDocument();
    expect(subheading).toBeInTheDocument();

    // some other custom message are present, but are dynamic and not tested
  });
});
