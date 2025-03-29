import CategorySectionList from "./CategorySectionList.jsx";
import ShopHighlightPresentation from "./ShopHighlightPresentation.jsx";
import data from "../../assets/data.json";

function ShopMain({ className = "" }) {
  return (
    <main className={`shop-main ${className}`} data-testid="shop-main">
      <CategorySectionList sectionList={data.sectionList} />
      <ShopHighlightPresentation />
    </main>
  );
}

export default ShopMain;
