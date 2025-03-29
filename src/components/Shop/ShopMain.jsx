import CategorySectionList from "./CategorySectionList.jsx";
import ShopHighlightPresentation from "./ShopHighlightPresentation.jsx";
import styled from "styled-components";
import data from "../../assets/data.json";

function ShopMain({ className = "" }) {
  return (
    <StyledMain className={`shop-main ${className}`} data-testid="shop-main">
      <CategorySectionList sectionList={data.sectionList} />
      <ShopHighlightPresentation />
    </StyledMain>
  );
}

const StyledMain = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--page-gap);
`;

export default ShopMain;
