import { useParams } from "react-router-dom";
import data from "../../assets/data.json";

const getSectionData = (section) => data.sections[section];

function ShopSectionMain({ className = "" }) {
  const { section } = useParams();

  const sectionData = getSectionData(section);
  const sectionName = sectionData.name;

  return (
    <main
      className={`shop-section-main ${className}`}
      data-testid="shop-section-main"
    >
      <header>
        <h2>{sectionName}</h2>
      </header>
    </main>
  );
}

export default ShopSectionMain;
