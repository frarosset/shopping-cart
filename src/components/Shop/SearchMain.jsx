import Heading from "../Generic/Heading.jsx";
import { useState } from "react";
import Input from "../Form/Input.jsx";
import ProductFetchList from "./ProductFetchList.jsx";
import { getSearchProductsApiUrl } from "../../fetching-utils/getApiUrl.js";
import useSortBy from "../../custom-hooks/useSortBy.jsx";

const productDataKeys = [
  "title",
  "price",
  "discountPercentage",
  "rating",
  "thumbnail",
  "availabilityStatus",
];
const productKeysStr = productDataKeys.join(",");

function SearchMain({ className = "" }) {
  const [query, setQuery] = useState("");

  const { sortBy, order, sortBySelect } = useSortBy();

  const apiUrl =
    query &&
    getSearchProductsApiUrl(query, {
      select: productKeysStr,
      sortBy: sortBy,
      order: order,
    });

  return (
    <main className={className}>
      <header>
        <Heading>Search</Heading>
      </header>
      <Input
        id="query"
        name="query"
        value={query}
        setValue={setQuery}
        type="search"
        maxLength={50}
        placeholder="What are you looking for?"
      />
      {apiUrl && (
        <ProductFetchList apiUrl={apiUrl} sortBySelect={sortBySelect} />
      )}
    </main>
  );
}

export default SearchMain;
