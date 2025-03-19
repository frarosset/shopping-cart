import styled from "styled-components";
import StarRatingIcons from "./Icons/StarRatingIcons.jsx";
import ClampedText from "./Generic/ClampedText.jsx";
import Heading from "./Generic/Heading.jsx";

import { getDiscountedPrice, getPriceStr } from "../utils/priceUtils.js";
import data from "../assets/data.json";

const Title = styled(({ title, hLevel, nRows = null, className = "" }) => {
  return (
    <StyledTitle $nRows={nRows} hLevel={hLevel} className={className}>
      {nRows ? <ClampedText $nRows={nRows}>{title}</ClampedText> : title}
    </StyledTitle>
  );
})``;

const Thumbnail = styled(({ title, thumbnail, className = "" }) => {
  return (
    <StyledPhoto
      className={className}
      src={thumbnail}
      alt={title}
      loading={"lazy"}
    />
  );
})``;

const PriceContainer = styled(
  ({ price, discountPercentage, className = "" }) => {
    const currency = data.currency;
    const hasDiscount = discountPercentage > 0;
    const discountedPrice = getDiscountedPrice(price, discountPercentage);

    return (
      <StyledRowContainer className={className}>
        <StyledPrice $oldPrice={hasDiscount}>
          {getPriceStr(price, currency)}
        </StyledPrice>
        {hasDiscount && (
          <StyledPrice $newPrice={true}>
            {getPriceStr(discountedPrice, currency)}
          </StyledPrice>
        )}
      </StyledRowContainer>
    );
  }
)``;

const RatingContainer = styled(({ rating, reviews, className = "" }) => {
  const maxRating = data.maxRating;
  const numOfReviews = reviews && reviews.length;

  return (
    <StyledRowContainer className={className}>
      <StarRatingIcons rating={rating} total={maxRating} />
      <StyledText>{rating}</StyledText>
      {numOfReviews && <StyledText>{`(${numOfReviews})`}</StyledText>}
    </StyledRowContainer>
  );
})``;

// StyledProductInfo.jsx
const StyledRowContainer = styled.div`
  display: flex;
  gap: var(--small-gap);
  min-height: 1lh;
`;

const StyledText = styled.span`
  font-size: var(--product-text-size);
`;

const StyledPhoto = styled.img`
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  color: var(--product-image-color);
  box-shadow: 0 0 var(--product-photo-shadow-size) var(--product-photo-color)
    inset;
`;

const StyledTitle = styled(Heading)`
  font-size: var(--product-title-size);
  color: var(--product-title-col);
  font-weight: bold;
  height: ${(props) => (props.$nRows ? `${props.$nRows}lh` : "auto")};
  display: flex;
  align-items: flex-end;
`;

const StyledPrice = styled.span`
  font-family: var(--product-price-font);
  font-size: var(--product-price-size);

  ${(props) =>
    props.$oldPrice &&
    `
      text-decoration: line-through;
      text-decoration: var(--product-price-highlight-col) solid line-through; /* Ignored in CSS1/CSS2 */
  `}

  ${(props) =>
    props.$newPrice &&
    `
      color: var(--product-price-highlight-col);
  `};
`;

export { PriceContainer, RatingContainer, Title, Thumbnail };
