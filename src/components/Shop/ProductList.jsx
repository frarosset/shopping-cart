import List from "../Generic/List.jsx";
import ProductItem from "./ProductItem.jsx";
import styled from "styled-components";
import Carousel from "../Generic/Carousel.jsx";

function ProductList({ productDataList, rowScroll = false, className = "" }) {
  const items = productDataList.map((productData) => ({
    key: productData.id,
    element: <ProductItem productData={productData} minimized={rowScroll} />,
  }));

  const content = (
    <StyledProductList
      className={className}
      items={items}
      $rowScroll={rowScroll}
    />
  );

  return (
    <StyledProductListContainer>
      {rowScroll ? <Carousel>{content}</Carousel> : content}
    </StyledProductListContainer>
  );
}

const StyledProductList = styled(List)`
  ${({ $rowScroll }) =>
    $rowScroll
      ? `display: flex;
         background-color: var(--col-white);

         *:has(>&) {
          scroll-padding-left: var(--product-list-padding-lr);
         }

         /* adjust right padding of the scrollable content */
        li:last-child::after {
          content: "";
          width: var(--product-list-padding-lr);
        }
      `
      : `display: grid;
         grid-template-columns: repeat(
            auto-fit,
            minmax(var(--product-item-min-size), 1fr)
         );`}

  padding: var(--product-list-padding);
  gap: var(--product-list-gap);
  width: 100%;
  align-items: flex-start;

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    scroll-snap-align: start;
  }
`;

const StyledProductListContainer = styled.div`
  position: relative;
  width: 100%;
`;

export default ProductList;
