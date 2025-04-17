import List from "../Generic/List.jsx";
import CartProductItem from "./CartProductItem.jsx";
import styled from "styled-components";

function CartProductList({ productDataList, className = "" }) {
  const items = productDataList.map((productData) => ({
    key: productData.id,
    element: <CartProductItem productData={productData} />,
  }));

  return <StyledList className={className} items={items} />;
}

const StyledList = styled(List)`
  display: flex;
  flex-direction: column;
  gap: var(--cart-product-list-gap);
  width: 100%;

  li {
    display: flex;
    justify-content: center;
  }
`;

export default CartProductList;
