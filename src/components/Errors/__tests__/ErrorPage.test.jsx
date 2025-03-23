import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorPage from "../ErrorPage.jsx";
import { MemoryRouter } from "react-router";

const sampleError = { error: { message: "Test Error Message" } };

const mockHeader = vi.fn();
vi.mock("../../Header/Header.jsx", () => ({
  default: (props) => {
    mockHeader(props);
    return <header data-testid="__page-header__">Header</header>;
  },
}));

const mockError = vi.fn();
vi.mock("../Error.jsx", () => ({
  default: (props) => {
    mockError(props);
    return <div data-testid="__error__">{props.error.message}</div>;
  },
}));

/* mocks are hoisted: reset them before each test */
afterEach(() => {
  vi.resetAllMocks();
});

const setup = (state) => {
  return {
    ...render(
      <MemoryRouter initialEntries={[{ state: state }]}>
        <ErrorPage />
      </MemoryRouter>
    ),
  };
};

describe("ErrorPage", () => {
  it("correctly renders Header component", () => {
    setup(sampleError);

    const header = screen.getByTestId("__page-header__");

    expect(mockHeader).toHaveBeenCalledOnce();

    expect(header).toBeInTheDocument();
  });

  it("renders error when location state contains error", () => {
    setup(sampleError);

    const error = screen.getByTestId("__error__");

    expect(mockError).toHaveBeenCalledExactlyOnceWith(sampleError);

    expect(error).toBeInTheDocument();
  });
});
