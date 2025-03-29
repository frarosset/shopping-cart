import Heading from "../Generic/Heading.jsx";
import useSortBy from "../../custom-hooks/useSortBy.jsx";
import ProductFetchList from "./ProductFetchList.jsx";
import { getCategoryProductsApiUrl } from "../../fetching-utils/getApiUrl.js";
import styled from "styled-components";
import { Link } from "react-router-dom";
import data from "../../assets/data.json";

const productsLimit = 10;
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

function SectionCategoriesPresentation({ sectionCategories, className = "" }) {
  const { sortBy, order } = useSortBy(); // get default values

  const getApiUrl = (category) =>
    getCategoryProductsApiUrl(category, {
      select: productKeysStr,
      sortBy: sortBy,
      order: order,
      limit: productsLimit,
    });

  return (
    <StyledSectionCategoriesPresentation className={className}>
      {sectionCategories.map((category) => {
        const categoryName = data.categories[category].name;

        return (
          <li key={category}>
            <StyledHeader>
              <StyledHeading>{categoryName}</StyledHeading>
              <Link to={`/shop/c/${category}`}>See all</Link>
            </StyledHeader>
            <ProductFetchList apiUrl={getApiUrl(category)} rowScroll={true} />
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--mid-gap);
  align-items: baseline;
  padding: 0 var(--page-padding-lr);
`;

const StyledHeading = styled(Heading)`
  color: var(--col-highlight);
`;

export default SectionCategoriesPresentation;
