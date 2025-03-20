import { useParams } from "react-router-dom";
import ProductFetchList from "./ProductFetchList.jsx";
import { getCategoryProductsApiUrl } from "../../fetching-utils/getApiUrl.js";
import Heading from "../Generic/Heading.jsx";
import styled from "styled-components";
import data from "../../assets/data.json";

const getCategoryData = (category) => data.categories[category];

const productDataKeys = [
  "title",
  "price",
  "discountPercentage",
  "rating",
  "thumbnail",
  "availabilityStatus",
];
const productKeysStr = productDataKeys.join(",");

function ShopCategoryMain({ className = "" }) {
  const hLevel = 2;

  const { category } = useParams();

  const categoryData = getCategoryData(category);
  const categoryName = categoryData.name;

  const apiUrl = getCategoryProductsApiUrl(category, {
    select: productKeysStr,
    sortBy: "rating",
    order: "desc",
  });

  return (
    <StyledMain className={className} data-testid="shop-category-main">
      <StyledShopCategoryHeading hLevel={hLevel}>
        {categoryName}
      </StyledShopCategoryHeading>

      <ProductFetchList apiUrl={apiUrl} />
    </StyledMain>
  );
}

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: var(--page-gap);
`;

const StyledShopCategoryHeading = styled(Heading)`
  text-align: center;
`;

export default ShopCategoryMain;
