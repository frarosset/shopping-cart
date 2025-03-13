import data from "../../assets/data.json";
const getCategoryData = (category) => data.categories[category];

function CategoryItem({ category, className = "" }) {
  const categoryData = getCategoryData(category);
  const categoryName = categoryData.name;

  return (
    <span className={`category-item ${className}`} data-testid="category-item">
      {categoryName}
    </span>
  );
}

export default CategoryItem;
