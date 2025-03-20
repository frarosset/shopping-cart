import { Link } from "react-router-dom";
import styled from "styled-components";
import data from "../../assets/data.json";

const getCategoryData = (category) => data.categories[category];

function CategoryItem({ category, className = "" }) {
  const categoryData = getCategoryData(category);
  const categoryName = categoryData.name;

  return (
    <span className={`category-item ${className}`} data-testid="category-item">
      {
        <StyledCategoryItem to={`/shop/c/${category}`}>
          {categoryName}
        </StyledCategoryItem>
      }
    </span>
  );
}

const StyledCategoryItem = styled(Link)`
  font-family: var(--shop-link-font);
`;

export default CategoryItem;
