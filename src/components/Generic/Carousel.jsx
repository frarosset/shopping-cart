import { useRef } from "react";
import CaretLeftFillIcon from "../Icons/CaretLeftFillIcon";
import CaretRightFillIcon from "../Icons/CaretRightFillIcon";
import styled from "styled-components";

function Carousel({ children, scrollPage = true, className = "" }) {
  const ref = useRef();

  return (
    <StyledCarousel className={className}>
      <StyledGoLeftButton onClick={() => scroll(ref, true, scrollPage)}>
        <CaretLeftFillIcon />
      </StyledGoLeftButton>
      <StyledGoRightButton onClick={() => scroll(ref, false, scrollPage)}>
        <CaretRightFillIcon />
      </StyledGoRightButton>
      <StyledContent ref={ref}>{children}</StyledContent>
    </StyledCarousel>
  );
}

function scroll(ref, reverse = false, scrollPage = true) {
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

  // if scrollPage=true, the offset to scroll is the full width minus half of the item width
  // (to make it possible to show the partially hidden item on next scroll)
  // else, only an item is scrolled
  const scrollOffset = scrollPage ? ulWidth - liWidth / 2 : liWidth;

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
const StyledContent = styled.div`
  max-width: 100%;
  overflow: auto hidden;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledCarousel = styled.div`
  position: relative;
  width: 100%;
`;

const StyledButton = styled.button`
  position: absolute;
  top: calc((100% - var(--half-scroll-buttons-width)) / 2);

  background-color: none;
  color: var(--scroll-buttons-bg-col);
  border: none;

  -webkit-touch-callout: none; /* Disables long-touch menu */
  -webkit-user-select: none; /* Disable text selection (for Webkit) */
  user-select: none; /* Disable text selection (standard syntax) */

  -webkit-text-stroke: 1px var(--scroll-buttons-col);
  font-size: var(--scroll-buttons-font-size);

  padding: 0;

  width: var(--scroll-buttons-width);
  height: var(--scroll-buttons-width);
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  @media not all and (hover: none) {
    &:hover {
      background-color: var(--scroll-buttons-bg-col);
      color: var(--scroll-buttons-col);
    }
  }

  &:active {
    background-color: var(--scroll-buttons-bg-col);
    color: var(--scroll-buttons-col);
  }
`;

const StyledGoLeftButton = styled(StyledButton)`
  padding-left: var(--half-scroll-buttons-width);
  left: var(--negative-half-scroll-buttons-width);
`;

const StyledGoRightButton = styled(StyledButton)`
  padding-right: var(--half-scroll-buttons-width);
  right: var(--negative-half-scroll-buttons-width);
`;

export default Carousel;
