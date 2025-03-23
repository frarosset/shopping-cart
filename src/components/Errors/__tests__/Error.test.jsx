import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Error from "../Error.jsx";

const mockMessageWithImageBelow = vi.fn();
vi.mock("../../Generic/MessageWithImageBelow", () => ({
  default: (props) => {
    mockMessageWithImageBelow(props);
    return (
      <div data-testid="__message-with-image-below__">
        MessageWithImageBelow
      </div>
    );
  },
}));

/* mocks are hoisted: reset them before each test */
afterEach(() => {
  vi.resetAllMocks();
});

const setup = (error) => {
  return {
    ...render(<Error error={error} />),
  };
};

describe("Error", () => {
  it("correctly render the error message", () => {
    setup();

    const heading = screen.getByRole("heading", { name: "Oops!" });
    const subheading = screen.getByText("Something went wrong...");

    expect(heading).toBeInTheDocument();
    expect(subheading).toBeInTheDocument();

    // some other custom message are present, but are dynamic and not tested here
  });

  it("correctly render the error image for 404 errors", () => {
    setup({ status: 404 });

    const image = screen.getByTestId("__message-with-image-below__");

    expect(mockMessageWithImageBelow).toHaveBeenCalledExactlyOnceWith({
      imageUrl: "/images/vector/404.jpg",
    });

    expect(image).toBeInTheDocument();
  });

  it("correctly render the error image for generic (non 404) errors", () => {
    setup();

    const image = screen.getByTestId("__message-with-image-below__");

    expect(mockMessageWithImageBelow).toHaveBeenCalledExactlyOnceWith({
      imageUrl: "/images/vector/error.jpg",
    });

    expect(image).toBeInTheDocument();
  });
});
