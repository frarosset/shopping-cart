import ProductList from "./ProductList.jsx";
import useFetchFromApiUrl from "../../fetching-utils/useFetchFromApiUrl.jsx";
import styled from "styled-components";
import LoaderIcon from "../Icons/LoaderIcon.jsx";

function ProductFetchList({
  apiUrl,
  resetOnFetch = false,
  sortBySelect = null,
  className = "",
}) {
  const { data, error, loading } = useFetchFromApiUrl(apiUrl, resetOnFetch);

  return (
    <StyledProductFetchList $data={data} className={`${className}`}>
      {loading && !data && <LoaderIcon />}
      {data && (
        <StyledSortByContainer>
          {loading && <LoaderIcon />}
          {sortBySelect}
        </StyledSortByContainer>
      )}
      {data && data.products && <ProductList productDataList={data.products} />}
      {error && (
        <span data-testid="product-fetch-list-error">
          {`Error ${error.message}`}
        </span>
      )}
    </StyledProductFetchList>
  );
}

const StyledSortByContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 var(--page-padding-lr);
  gap: var(--small-gap);
`;

const StyledProductFetchList = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  ${({ $data }) => {
    if (!$data) return `align-items: center; justify-content: center`;
  }}
`;

export default ProductFetchList;
