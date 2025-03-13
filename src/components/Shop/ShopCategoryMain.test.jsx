import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ShopCategoryMain from "./ShopCategoryMain.jsx";
import data from "../../assets/data.json";

const sampleCategory = Object.keys(data.categories)[0];
const sampleCategoryName = data.categories[sampleCategory].name;

const mockUseParams = vi.fn();
vi.mock("react-router-dom", () => ({
  useParams: (props) => {
    mockUseParams(props);
    return { category: sampleCategory };
  },
}));

/* mocks are hoisted: reset them before each test */
beforeEach(() => {
  vi.resetAllMocks();
});

const setup = () => {
  return {
    ...render(<ShopCategoryMain />),
  };
};

describe("ShopCategoryMain", () => {
  it("gets the category param from the url", () => {
    setup();

    expect(mockUseParams).toHaveBeenCalledOnce();
  });

  it("renders a heading of the associated category", () => {
    setup();

    const heading = screen.getByRole("heading", { name: sampleCategoryName });

    expect(heading).toBeInTheDocument();
  });
});
