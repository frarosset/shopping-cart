import CategoryList from "./CategoryList.jsx";
import data from "../../assets/data.json";
const getSectionData = (section) => data.sections[section];

function CategorySectionItem({ section, className = "" }) {
  const sectionData = getSectionData(section);
  const sectionName = sectionData.name;
  const sectionCategories = sectionData.categories;

  return (
    <div
      className={`category-section-item ${className}`}
      data-testid="category-section-item"
    >
      <h2>{sectionName}</h2>
      <CategoryList categoryList={sectionCategories} />
    </div>
  );
}

export default CategorySectionItem;
