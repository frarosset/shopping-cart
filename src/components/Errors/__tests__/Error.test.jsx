import { vi, describe, it, expect, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Error from "../Error.jsx";

const mockMessageWithImageBelow = vi.fn();
vi.mock("../../Generic/MessageWithImageBelow", () => ({
  default: (props) => {
    mockMessageWithImageBelow(props);
    return (
      <div data-testid="__message-with-image-below__">{props.children}</div>
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

    // some other custom message are present, but are dynamic and not tested here (see below)
  });

  it("correctly render the error image for 404 errors", () => {
    setup({ status: 404 });

    const image = screen.getByTestId("__message-with-image-below__");

    expect(mockMessageWithImageBelow).toHaveBeenCalledExactlyOnceWith({
      imageUrl: "/images/vector/404.jpg",
      children: expect.anything(),
    });

    expect(image).toBeInTheDocument();
  });

  it("correctly render the error image for generic (non 404) errors", () => {
    setup();

    const image = screen.getByTestId("__message-with-image-below__");

    expect(mockMessageWithImageBelow).toHaveBeenCalledExactlyOnceWith({
      imageUrl: "/images/vector/error.jpg",
      children: expect.anything(),
    });

    expect(image).toBeInTheDocument();
  });

  it("correctly render the error statusText if present", () => {
    setup({ statusText: "Status Text" });

    const imageMsg = screen.getByTestId("__message-with-image-below__");

    const msg = within(imageMsg).getByText("Status Text");

    expect(msg).toBeInTheDocument();
  });

  it("correctly render the error statusText if present", () => {
    setup({ message: "Msg Text" });

    const imageMsg = screen.getByTestId("__message-with-image-below__");

    const msg = within(imageMsg).getByText("Msg Text");

    expect(msg).toBeInTheDocument();
  });

  it("correctly render the error statusText if both statusText and message are present", () => {
    setup({ message: "Msg Text", statusText: "Status Text" });

    const imageMsg = screen.getByTestId("__message-with-image-below__");

    const msg = within(imageMsg).getByText("Status Text");

    expect(msg).toBeInTheDocument();
  });
});
