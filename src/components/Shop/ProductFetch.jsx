import Product from "./Product.jsx";
import useFetchFromApiUrl from "../../fetching-utils/useFetchFromApiUrl.jsx";
import styled from "styled-components";
import LoaderIcon from "../Icons/LoaderIcon.jsx";
import { getSingleProductApiUrl } from "../../fetching-utils/getApiUrl.js";

function handleError(error, id) {
  if (error) {
    if (error.status == 404) {
      const err = new Error(`Product ${id} not found!`);
      err.status = "404";
      throw err;
    } else {
      throw error;
    }
  }
}

function ProductFetch({ id, className = "" }) {
  const apiUrl = getSingleProductApiUrl(id);

  const { data, error, loading } = useFetchFromApiUrl(apiUrl, true);

  handleError(error, id);

  return (
    <StyledProductFetch className={`${className}`}>
      {loading && !data && (
        <StyledCenteredItemContainer>
          <LoaderIcon />
        </StyledCenteredItemContainer>
      )}
      {data && <Product productData={data} />}
    </StyledProductFetch>
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

const StyledProductFetch = styled.div`
  width: 100%;
  height: 100%;
`;

export default ProductFetch;
