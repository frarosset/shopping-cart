import { useContext } from "react";
import styled from "styled-components";
import StarRatingIcons from "../Icons/StarRatingIcons.jsx";
import HeartToggleIcon from "../Icons/HeartToggleIcon.jsx";
import CartIcon from "../Icons/CartIcon.jsx";
import PlusIcon from "../Icons/PlusIcon.jsx";
import MinusIcon from "../Icons/MinusIcon.jsx";
import ClampedText from "../Generic/ClampedText.jsx";
import Heading from "../Generic/Heading.jsx";
import Image from "../Generic/Image.jsx";
import SavedProductsContext from "../../contexts/SavedProductsContext.jsx";

import { getDiscountedPrice, getPriceStr } from "../../utils/priceUtils.js";
import data from "../../assets/data.json";

const Title = styled(({ title, nRows = null, className = "" }) => {
  return (
    <StyledTitle $nRows={nRows} className={className}>
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
)`
  && {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 0 var(--small-gap);
  }
`;

const DiscountPercentage = styled(({ discountPercentage, className = "" }) => {
  const highlightDiscountsAt = data.highlightDiscountsAt;
  const hasDiscount = discountPercentage > 0;
  const highlightDiscount = discountPercentage > highlightDiscountsAt;

  return (
    hasDiscount && (
      <StyledTag $highlight={highlightDiscount} className={className}>
        {`-${discountPercentage} %`}
      </StyledTag>
    )
  );
})``;

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

const AvailabilityStatus = styled(
  ({ product, ignoreStatusList = [], className = "" }) => {
    const { getAvailabilityStatus } = useContext(SavedProductsContext);

    const availabilityStr =
      getAvailabilityStatus(product) || product.AvailabilityStatus;
    const ignoreStatus = ignoreStatusList.includes(availabilityStr);

    return (
      !ignoreStatus && (
        <StyledTag className={className}>{availabilityStr}</StyledTag>
      )
    );
  }
)``;

const WishlistButton = styled(({ product, className = "" }) => {
  const { isInWishlist, dispatch } = useContext(SavedProductsContext);
  const inWishlist = isInWishlist(product.id);

  return (
    <StyledWishlistButton
      className={className}
      onClick={() => dispatch({ type: "toggleWishlist", product })}
      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <HeartToggleIcon fill={inWishlist} />
    </StyledWishlistButton>
  );
})``;

const AddToCartButton = styled(({ product, className = "" }) => {
  const { isOutOfStock, dispatch } = useContext(SavedProductsContext);

  const outOfStock = isOutOfStock(product);

  return (
    <StyledAddToCartButton
      className={className}
      onClick={() => dispatch({ type: "addToCart", product })}
      disabled={outOfStock}
      aria-label="Add to cart"
    >
      <CartIcon />
    </StyledAddToCartButton>
  );
})``;

const EditInCartButton = styled(({ product, className = "" }) => {
  const { isOutOfStock, inCart, dispatch } = useContext(SavedProductsContext);
  const outOfStock = isOutOfStock(product);

  return (
    <div className={className}>
      <button
        disabled={inCart(product.id) == 1}
        aria-label="Remove one item from cart"
      >
        <MinusIcon />
      </button>
      <button
        onClick={() => dispatch({ type: "addToCart", product })}
        disabled={outOfStock}
        aria-label="Add one item to cart"
      >
        <PlusIcon />
      </button>
    </div>
  );
})``;

const StyledWishlistButton = styled.button`
  font-size: 1lh;
  padding: 0;
`;

const StyledAddToCartButton = styled.button`
  font-size: 1lh;
  padding: 0.3lh;
  border-radius: 50%;
  background-color: var(--product-tag-bg-col);
  color: var(--product-tag-col);

  &:disabled {
    opacity: 0.5;
    cursor: auto;
  }
`;

const StyledRowContainer = styled.div`
  display: flex;
  gap: var(--small-gap);
  min-height: 1lh;
`;

const StyledText = styled.span`
  font-size: var(--product-text-size);
`;

const StyledPhoto = styled(Image)`
  aspect-ratio: 1;
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
  width: max-content;

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

const StyledTag = styled.span`
  font-size: var(--product-tag-size);
  color: var(--product-tag-col);
  background: ${({ $highlight }) =>
    $highlight
      ? "var(--product-tag-highlight-bg-col)"
      : "var(--product-tag-bg-col)"};
  border-radius: var(--small-radius);
  padding: var(--small-padding);
  width: max-content;
  max-width: 100%;
`;

export {
  PriceContainer,
  RatingContainer,
  Title,
  Thumbnail,
  DiscountPercentage,
  AvailabilityStatus,
  StyledRowContainer,
  WishlistButton,
  AddToCartButton,
  EditInCartButton,
};
