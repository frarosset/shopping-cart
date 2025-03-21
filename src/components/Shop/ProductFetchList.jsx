import ProductList from "./ProductList.jsx";
import useFetchFromApiUrl from "../../fetching-utils/useFetchFromApiUrl.jsx";
import styled from "styled-components";

function ProductFetchList({
  apiUrl,
  resetOnFetch = false,
  sortBySelect = null,
  className = "",
}) {
  const { data, error, loading } = useFetchFromApiUrl(apiUrl, resetOnFetch);

  return (
    <div className={`${className}`}>
      {loading && !data && (
        <span data-testid="product-fetch-list-loading">"Loading ..."</span>
      )}
      {data && (
        <StyledSortByContainer>
          {loading && (
            <span data-testid="product-fetch-list-loading">"Loading ..."</span>
          )}
          {sortBySelect}
        </StyledSortByContainer>
      )}
      {data && data.products && <ProductList productDataList={data.products} />}
      {error && (
        <span data-testid="product-fetch-list-error">
          {`Error ${error.message}`}
        </span>
      )}
    </div>
  );
}

const StyledSortByContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 var(--page-padding-lr);
  gap: var(--small-gap);
`;

export default ProductFetchList;
