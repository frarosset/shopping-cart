import Heading from "../Generic/Heading.jsx";
import { useState } from "react";
import Input from "../Form/Input.jsx";
import ProductFetchList from "./ProductFetchList.jsx";
import { getSearchProductsApiUrl } from "../../fetching-utils/getApiUrl.js";
import useSortBy from "../../custom-hooks/useSortBy.jsx";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";

const productDataKeys = [
  "title",
  "price",
  "discountPercentage",
  "rating",
  "thumbnail",
  "availabilityStatus",
  "stock",
];
const productKeysStr = productDataKeys.join(",");

function SearchMain({ className = "" }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q");
  const initialQuery = q ? decodeURI(q) : "";

  const [query, setQuery] = useState(initialQuery);

  const { sortBy, order, sortBySelect } = useSortBy();

  const apiUrl =
    query &&
    getSearchProductsApiUrl(query, {
      select: productKeysStr,
      sortBy: sortBy,
      order: order,
    });

  return (
    <StyledMain className={className}>
      <StyledHeader>
        <Heading>Search</Heading>
      </StyledHeader>
      <StyledSearchContainer>
        <Input
          id="query"
          name="query"
          value={query}
          setValue={(val) => {
            val
              ? setSearchParams({
                  q: val,
                })
              : setSearchParams();
            setQuery(val);
          }}
          type="search"
          maxLength={50}
          placeholder="What are you looking for?"
        />
      </StyledSearchContainer>

      {apiUrl && (
        <ProductFetchList apiUrl={apiUrl} sortBySelect={sortBySelect} />
      )}
    </StyledMain>
  );
}

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 var(--page-padding-lr);
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: var(--page-gap);
  align-items: center;
`;

const StyledSearchContainer = styled.div`
  padding: 0 var(--page-padding-lr);
  width: 100%;
  max-width: 30em;

  input {
    padding: 0 1em;
  }
`;

export default SearchMain;
