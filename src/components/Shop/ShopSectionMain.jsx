import { useParams } from "react-router-dom";
import CategoryList from "./CategoryList.jsx";
import data from "../../assets/data.json";

const getSectionData = (section) => data.sections[section];

function ShopSectionMain({ className = "" }) {
  const { section } = useParams();

  const sectionData = getSectionData(section);
  const sectionName = sectionData.name;
  const sectionCategories = sectionData.categories;

  return (
    <main
      className={`shop-section-main ${className}`}
      data-testid="shop-section-main"
    >
      <header>
        <h2>{sectionName}</h2>
        <CategoryList categoryList={sectionCategories} />
      </header>
    </main>
  );
}

export default ShopSectionMain;
