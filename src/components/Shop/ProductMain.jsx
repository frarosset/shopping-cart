import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProductFetch from "./ProductFetch.jsx";

function ProductMain({ className = "" }) {
  const { id } = useParams();

  return (
    <StyledMain className={className}>
      <ProductFetch id={id} />
    </StyledMain>
  );
}

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: var(--page-gap);
  align-items: center;
  justify-content: center;
  padding: var(--page-outlet-padding);
`;

export default ProductMain;
