import ProductList from "./ProductList.jsx";
import useFetchFromApiUrl from "../../fetching-utils/useFetchFromApiUrl.jsx";
import styled from "styled-components";
import LoaderIcon from "../Icons/LoaderIcon.jsx";
import MessageWithImageBelow from "../Generic/MessageWithImageBelow.jsx";
import Error from "../Errors/Error.jsx";

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
      {data &&
        data.products &&
        (data.products.length > 0 ? (
          <>
            <StyledSortByContainer>
              {loading && <LoaderIcon />}
              {sortBySelect}
            </StyledSortByContainer>
            <ProductList productDataList={data.products} />
          </>
        ) : (
          <MessageWithImageBelow imageUrl="/images/vector/product-not-found.jpg">
            No product found!
          </MessageWithImageBelow>
        ))}
      {error && <Error error={error} />}
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
