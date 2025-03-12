import CategorySectionItem from "./CategorySectionItem.jsx";
import List from "../Generic/List.jsx";

function CategorySectionList({ sectionList, className = "" }) {
  const items = sectionList.map((section) => ({
    key: section,
    element: <CategorySectionItem section={section} />,
  }));

  return (
    <List
      className={`category-section-list ${className}`}
      testId={"category-section-list"}
      items={items}
    />
  );
}

export default CategorySectionList;
