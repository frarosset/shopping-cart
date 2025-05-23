import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorPage from "../ErrorPage.jsx";
import { MemoryRouter } from "react-router";

const sampleError = { error: { message: "Test Error Message" } };

const mockError = vi.fn();
vi.mock("../Error.jsx", () => ({
  default: (props) => {
    mockError(props);
    return <div data-testid="__error__">{props.error.message}</div>;
  },
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Navigate: (props) => mockNavigate(props),
  };
});

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

window.history.replaceState = vi.fn();

describe("ErrorPage", () => {
  it("correctly renders Error commponent when location state contains error", () => {
    setup(sampleError);

    const error = screen.getByTestId("__error__");

    expect(mockError).toHaveBeenCalledExactlyOnceWith(sampleError);
    expect(mockNavigate).not.toHaveBeenCalled();

    expect(error).toBeInTheDocument();
  });

  it("navigates to '/' when location state does not contain error", () => {
    setup(null);

    expect(mockError).not.toHaveBeenCalled();

    expect(mockNavigate).toHaveBeenCalledExactlyOnceWith({
      to: "/",
      replace: true,
    });
  });

  it("clear route state on rendering", async () => {
    setup(sampleError);

    expect(window.history.replaceState).toHaveBeenCalledWith(null, null);
  });
});

// Restore all mocks
vi.restoreAllMocks();
