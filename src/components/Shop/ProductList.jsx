import List from "../Generic/List.jsx";
import ProductItem from "./ProductItem.jsx";
import styled from "styled-components";

function ProductList({ productDataList, className = "" }) {
  const items = productDataList.map((productData) => ({
    key: productData.id,
    element: <ProductItem productData={productData} />,
  }));

  return <StyledProductList className={`${className}`} items={items} />;
}

const StyledProductList = styled(List)`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(var(--product-item-min-size), 1fr)
  );
  padding: var(--product-list-padding);
  gap: var(--product-list-gap);
  width: 100%;

  li {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default ProductList;
