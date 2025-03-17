import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import List from "../List.jsx";

const sampleItemsKeys = ["one", "two", "three"];
const sampleItemsLabel = sampleItemsKeys.map((key) => key.toUpperCase());
const sampleItems = sampleItemsKeys.map((key, idx) => ({
  key: key,
  element: <p>{sampleItemsLabel[idx]}</p>,
}));

const setup = () => ({
  ...render(<List items={sampleItems} />),
});

describe("List", () => {
  it("renders a list", () => {
    setup();

    const list = screen.getByRole("list");

    expect(list).toBeInTheDocument();
  });

  it("renders a list of items", () => {
    setup();

    const items = screen.getAllByRole("listitem");
    expect(items.length).toBe(sampleItemsLabel.length);

    sampleItemsLabel.forEach((text) => {
      const item = items.find((item) => item.textContent === text);
      expect(item).toBeInTheDocument();
    });
  });
});
