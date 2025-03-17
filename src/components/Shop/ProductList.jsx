import List from "../Generic/List.jsx";
import ProductItem from "./ProductItem.jsx";

function ProductList({ productDataList, className = "" }) {
  const items = productDataList.map((productData) => ({
    key: productData.id,
    element: <ProductItem productData={productData} />,
  }));

  return (
    <List
      className={`products-list ${className}`}
      testId={"products-list"}
      items={items}
    />
  );
}

export default ProductList;
