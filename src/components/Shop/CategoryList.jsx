import CategoryItem from "./CategoryItem.jsx";
import List from "../Generic/List.jsx";

function CategoryList({ categoryList, className = "" }) {
  const items = categoryList.map((category) => ({
    key: category,
    element: <CategoryItem category={category} />,
  }));

  return (
    <List
      className={`category-list ${className}`}
      testId={"category-list"}
      items={items}
    />
  );
}

export default CategoryList;
