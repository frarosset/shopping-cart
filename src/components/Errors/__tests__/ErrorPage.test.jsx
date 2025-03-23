import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorPage from "../ErrorPage.jsx";

const mockHeader = vi.fn();
vi.mock("../../Header/Header.jsx", () => ({
  default: (props) => {
    mockHeader(props);
    return <header data-testid="__page-header__">Header</header>;
  },
}));

/* mocks are hoisted: reset them before each test */
afterEach(() => {
  vi.resetAllMocks();
});

const setup = () => {
  return {
    ...render(<ErrorPage />),
  };
};

describe("ErrorPage", () => {
  it("correctly renders Header component", () => {
    setup();

    const header = screen.getByTestId("__page-header__");

    expect(mockHeader).toHaveBeenCalledOnce();

    expect(header).toBeInTheDocument();
  });
});
