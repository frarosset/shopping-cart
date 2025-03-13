import { useParams } from "react-router-dom";

function ShopCategoryMain({ className = "" }) {
  const { category } = useParams();

  return (
    <main
      className={`shop-category-main ${className}`}
      data-testid="shop-category-main"
    >
      {category}
    </main>
  );
}

export default ShopCategoryMain;
