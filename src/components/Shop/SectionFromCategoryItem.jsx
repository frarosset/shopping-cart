import data from "../../assets/data.json";
import SectionItem from "./SectionItem.jsx";

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

function SectionFromCategoryItem({ category, className = "" }) {
  const section = getSection(category);
  return (
    <SectionItem
      section={section}
      className={`section-item ${className}`}
      data-testid="section-item"
    />
  );
}

export default SectionFromCategoryItem;
