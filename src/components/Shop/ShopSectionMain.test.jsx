import { vi, describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import ShopSectionMain from "./ShopSectionMain.jsx";
import data from "../../assets/data.json";

const sampleSection = Object.keys(data.sections)[0];

const mockUseParams = vi.fn();
vi.mock("react-router-dom", () => ({
  useParams: (props) => {
    mockUseParams(props);
    return { section: sampleSection };
  },
}));

/* mocks are hoisted: reset them before each test */
beforeEach(() => {
  vi.resetAllMocks();
});

const setup = () => {
  return {
    ...render(<ShopSectionMain />),
  };
};

describe("ShopSectionMain", () => {
  it("gets the section param from the url", () => {
    setup();

    expect(mockUseParams).toHaveBeenCalledOnce();
  });
});
