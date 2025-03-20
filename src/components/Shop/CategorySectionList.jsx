import CategorySectionItem from "./CategorySectionItem.jsx";
import List from "../Generic/List.jsx";
import styled from "styled-components";

function CategorySectionList({ sectionList, className = "" }) {
  const items = sectionList.map((section) => ({
    key: section,
    element: <CategorySectionItem section={section} />,
  }));

  return (
    <StyledCategorySectionList
      className={`category-section-list ${className}`}
      testId={"category-section-list"}
      items={items}
    />
  );
}

const StyledCategorySectionList = styled(List)`
  display: flex;
  flex-wrap: wrap;
  padding: var(--section-list-padding);
  gap: var(--section-list-gap);
  width: 100%;

  justify-content: center;
`;

export default CategorySectionList;
