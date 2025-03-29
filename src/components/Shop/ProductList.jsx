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
    <StyledProductListContainer>
      {rowScroll && (
        <>
          <StyledGoLeftButton onClick={() => scroll(ref, true)}>
            {"⯇"}
          </StyledGoLeftButton>
          <StyledGoRightButton onClick={() => scroll(ref)}>
            {"⯈"}
          </StyledGoRightButton>
        </>
      )}
      <StyledProductList
        className={className}
        items={items}
        $rowScroll={rowScroll}
        ref={ref}
      />
    </StyledProductListContainer>
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

  const scrollLeft = Math.round(ref.current.scrollLeft);
  const maxScrollWidth = ref.current.scrollWidth - ref.current.clientWidth;

  if (scrollLeft == maxScrollWidth && !reverse)
    // return to start
    ref.current.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  else if (scrollLeft == 0 && reverse)
    // 'go back' to end
    ref.current.scrollTo({
      top: 0,
      left: maxScrollWidth,
      behavior: "smooth",
    });
  else
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
         -webkit-overflow-scrolling: touch;

         -ms-overflow-style: none;
         scrollbar-width: none;
         
         &::-webkit-scrollbar {
          display: none;
         }`
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

const StyledProductListContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledButton = styled.button`
  position: absolute;
  top: calc(var(--product-item-min-size) / 2);

  background-color: var(--product-tag-bg-col);
  color: var(--product-tag-col);
  border: 2px solid var(--product-tag-col);

  padding: 0;

  width: var(--scroll-buttons-width);
  height: var(--scroll-buttons-width);
  z-index: 1;
`;

const StyledGoLeftButton = styled(StyledButton)`
  padding-left: var(--half-scroll-buttons-width);
  left: var(--negative-half-scroll-buttons-width);
  border-radius: 0 50% 50% 0;
`;

const StyledGoRightButton = styled(StyledButton)`
  padding-right: var(--half-scroll-buttons-width);
  right: var(--negative-half-scroll-buttons-width);
  border-radius: 50% 0 0 50%;
`;

export default ProductList;
