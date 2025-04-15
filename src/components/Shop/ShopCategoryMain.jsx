import { Link, useParams } from "react-router-dom";
import ProductFetchList from "./ProductFetchList.jsx";
import { getCategoryProductsApiUrl } from "../../fetching-utils/getApiUrl.js";
import Heading from "../Generic/Heading.jsx";
import styled from "styled-components";
import data from "../../assets/data.json";
import useSortBy from "../../custom-hooks/useSortBy.jsx";

const getCategoryData = (category) => {
  const categoryData = data.categories[category];
  if (!categoryData) {
    const error = new Error(`Category '${category}' not found!`);
    error.status = "404";
    throw error;
  }

  return categoryData;
};

const categoriesToSection = Object.entries(data.sections).reduce(
  (map, [section, categoriesData]) => {
    return categoriesData.categories.reduce((map, category) => {
      map.set(category, section);
      return map;
    }, map);
  },
  new Map()
);
const getSection = (category) => categoriesToSection.get(category);
const getSectionData = (section) => data.sections[section];

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

function ShopCategoryMain({ className = "" }) {
  const { category } = useParams();

  const categoryData = getCategoryData(category);
  const categoryName = categoryData.name;

  const section = getSection(category);
  const sectionData = getSectionData(section);
  const sectionName = sectionData.name;

  const { sortBy, order, sortBySelect } = useSortBy();

  const apiUrl = getCategoryProductsApiUrl(category, {
    select: productKeysStr,
    sortBy: sortBy,
    order: order,
    limit: 0, // get all items
  });

  return (
    <StyledMain className={className} data-testid="shop-category-main">
      <StyledHeader>
        <StyledBackToSection to={`/shop/${section}`}>
          {sectionName}
        </StyledBackToSection>
        <Heading>{categoryName}</Heading>
      </StyledHeader>

      <ProductFetchList apiUrl={apiUrl} sortBySelect={sortBySelect} />
    </StyledMain>
  );
}

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 var(--page-padding-lr);
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: var(--page-gap);
  padding: var(--page-outlet-padding);
`;

const StyledBackToSection = styled(Link)`
  font-family: var(--heading-subtext-font);
  font-size: var(--heading-subtext-font-size);
  color: var(--heading-subtext-color);
  text-transform: uppercase;
`;

export default ShopCategoryMain;
