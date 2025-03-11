import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  MemoryRouter,
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";
import routes from "./routes.jsx"; // this imports App component

const setupWithRoute = (initialEntry = "/") => {
  const router = createMemoryRouter(routes, {
    initialEntries: [initialEntry],
    initialIndex: 0,
  });
  return {
    router: router,
    ...render(<RouterProvider router={router} />, { wrapper: MemoryRouter }),
  };
};

describe("App", () => {
  it("correctly render the home page", () => {
    setupWithRoute("/");

    const pageHeader = screen.getByTestId("page-header");

    expect(pageHeader).toBeInTheDocument();
  });

  it("correctly render the shop page", () => {
    setupWithRoute("/shop");

    const pageHeader = screen.getByTestId("page-header");

    expect(pageHeader).toBeInTheDocument();
  });

  it("correctly render the about page", () => {
    setupWithRoute("/about");

    const pageHeader = screen.getByTestId("page-header");

    expect(pageHeader).toBeInTheDocument();
  });
});
