import { useParams } from "react-router-dom";
import ProductFetchList from "./ProductFetchList.jsx";
import { getCategoryProductsApiUrl } from "../../fetching-utils/getApiUrl.js";
import data from "../../assets/data.json";

const getCategoryData = (category) => data.categories[category];

function ShopCategoryMain({ className = "" }) {
  const { category } = useParams();

  const categoryData = getCategoryData(category);
  const categoryName = categoryData.name;

  const apiUrl = getCategoryProductsApiUrl(category);

  return (
    <main
      className={`shop-category-main ${className}`}
      data-testid="shop-category-main"
    >
      <header>
        <h2>{categoryName}</h2>
      </header>

      <ProductFetchList apiUrl={apiUrl} />
    </main>
  );
}

export default ShopCategoryMain;
