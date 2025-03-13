import { useParams } from "react-router-dom";
import data from "../../assets/data.json";

const getCategoryData = (category) => data.categories[category];

function ShopCategoryMain({ className = "" }) {
  const { category } = useParams();

  const categoryData = getCategoryData(category);
  const categoryName = categoryData.name;

  return (
    <main
      className={`shop-category-main ${className}`}
      data-testid="shop-category-main"
    >
      <header>
        <h2>{categoryName}</h2>
      </header>
    </main>
  );
}

export default ShopCategoryMain;
