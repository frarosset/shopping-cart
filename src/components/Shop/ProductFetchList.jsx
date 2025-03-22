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
      {loading && !data && (
        <StyledCenteredItemContainer>
          <LoaderIcon />
        </StyledCenteredItemContainer>
      )}
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

const StyledCenteredItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: var(--product-list-centered-icon-fontsize);
`;

const StyledSortByContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 var(--page-padding-lr);
  gap: var(--small-gap);
`;

const StyledProductFetchList = styled.div`
  width: 100%;
  height: 100%;
`;

export default ProductFetchList;
