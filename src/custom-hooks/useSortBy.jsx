import { useState } from "react";
import SelectWithLabel from "../components/Form/SelectWithLabel.jsx";

const initialSortByStr = "Rating ↓";

const sortOptions = {
  "Name A-Z": { sortBy: "title", order: "asc" },
  "Name Z-A": { sortBy: "title", order: "desc" },
  "Price ↑": { sortBy: "price", order: "asc" },
  "Price ↓": { sortBy: "price", order: "desc" },
  "Discount ↑": { sortBy: "discountPercentage", order: "asc" },
  "Discount ↓": { sortBy: "discountPercentage", order: "desc" },
  "Rating ↑": { sortBy: "rating", order: "asc" },
  "Rating ↓": { sortBy: "rating", order: "desc" },
};
const sortByOptions = Object.keys(sortOptions);

const useSortBy = () => {
  const [sortByKey, setSortByKey] = useState(initialSortByStr);

  const sortBy = sortOptions[sortByKey].sortBy;
  const order = sortOptions[sortByKey].order;

  const sortBySelect = (
    <SelectWithLabel
      label="Sort by: "
      id="sortBy"
      name="sortBy"
      value={sortByKey}
      options={sortByOptions}
      setValue={setSortByKey}
    />
  );

  return { sortBy, order, sortBySelect };
};

export default useSortBy;
