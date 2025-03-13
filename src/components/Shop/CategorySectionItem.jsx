import CategoryList from "./CategoryList.jsx";
import { Link } from "react-router-dom";
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
      <h2>
        <Link to={`/shop/${section}`}>{sectionName}</Link>
      </h2>
      <CategoryList categoryList={sectionCategories} />
    </div>
  );
}

export default CategorySectionItem;
