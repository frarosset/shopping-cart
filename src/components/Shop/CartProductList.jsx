import List from "../Generic/List.jsx";
import CartProductItem from "./CartProductItem.jsx";

function CartProductList({ productDataList, className = "" }) {
  const items = productDataList.map((productData) => ({
    key: productData.id,
    element: <CartProductItem productData={productData} />,
  }));

  return <List className={className} items={items} />;
}

export default CartProductList;
