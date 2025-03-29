import Heading from "../Generic/Heading.jsx";
import ProductFetchList from "./ProductFetchList.jsx";
import { getAllProductsApiUrl } from "../../fetching-utils/getApiUrl.js";
import styled from "styled-components";

const productsLimit = 40;
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

const highlightData = [
  { title: "Most Appreciated", sortBy: "rating", order: "desc" },
  { title: "Best Deals", sortBy: "discountPercentage", order: "desc" },
];

function ShopHighlightPresentation({ className = "" }) {
  const getApiUrl = (sortBy, order) =>
    getAllProductsApiUrl({
      select: productKeysStr,
      sortBy: sortBy,
      order: order,
      limit: productsLimit,
    });

  return (
    <StyledSectionCategoriesPresentation className={className}>
      {highlightData.map((data, idx) => {
        return (
          <li key={idx}>
            <StyledHeader>
              <StyledHeading>{data.title}</StyledHeading>
            </StyledHeader>
            <ProductFetchList
              apiUrl={getApiUrl(data.sortBy, data.order)}
              rowScroll={true}
            />
          </li>
        );
      })}
    </StyledSectionCategoriesPresentation>
  );
}

const StyledSectionCategoriesPresentation = styled.ul`
  display: flex;
  flex-direction: column;
  gap: var(--page-gap);
`;

const StyledHeader = styled.header`
  padding: 0 var(--page-padding-lr);
`;

const StyledHeading = styled(Heading)`
  color: var(--col-highlight);
`;

export default ShopHighlightPresentation;
