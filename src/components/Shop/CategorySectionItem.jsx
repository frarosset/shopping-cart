import data from "../../assets/data.json";
const sectionData = (section) => data.sections[section];

function CategorySectionItem({ section, className = "" }) {
  const sectionName = sectionData(section).name;
  return (
    <div
      className={`category-section-item ${className}`}
      data-testid="category-section-item"
    >
      <h2>{sectionName}</h2>
    </div>
  );
}

export default CategorySectionItem;
