import List from "../Generic/List.jsx";
import ProductItem from "./ProductItem.jsx";
import { useRef } from "react";
import styled from "styled-components";

function ProductList({ productDataList, rowScroll = false, className = "" }) {
  const items = productDataList.map((productData) => ({
    key: productData.id,
    element: <ProductItem productData={productData} />,
  }));

  const ref = useRef();

  return (
    <>
      <button onClick={() => scroll(ref, true)}>{"⯇"}</button>
      <button onClick={() => scroll(ref)}>{"⯈"}</button>
      <StyledProductList
        className={className}
        items={items}
        $rowScroll={rowScroll}
        ref={ref}
      />
    </>
  );
}

function scroll(ref, reverse = false) {
  // get list width
  const ulWidth = ref.current
    ? window
        .getComputedStyle(ref.current)
        .getPropertyValue("width")
        .match(/\d+/)[0]
    : 0;

  // get item width
  const liWidth =
    ref.current && ref.current.children.length > 0
      ? window
          .getComputedStyle(ref.current.children[0])
          .getPropertyValue("width")
          .match(/\d+/)[0]
      : 0;

  // the offset to scroll is the full width minus half of the item width
  // (to make it possible to show the partially hidden item on next scroll)
  const scrollOffset = ulWidth - liWidth / 2;

  ref.current.scrollBy({
    top: 0,
    left: reverse ? -scrollOffset : scrollOffset,
    behavior: "smooth",
  });
}

// horizontal scrolling build based on:
// https://ishadeed.com/article/css-scroll-snap/
const StyledProductList = styled(List)`
  ${({ $rowScroll }) =>
    $rowScroll
      ? `display: flex;
         max-width: 100%;
         overflow: auto hidden;
         scroll-behavior: smooth;
         scroll-snap-type: x mandatory;
         scroll-padding: 0 var(--product-list-padding-lr);
         -webkit-overflow-scrolling: touch;`
      : `display: grid;
         grid-template-columns: repeat(
            auto-fit,
            minmax(var(--product-item-min-size), 1fr)
         );`}

  padding: var(--product-list-padding);
  gap: var(--product-list-gap);
  width: 100%;

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    scroll-snap-align: start;
  }
`;

export default ProductList;
