import { useContext } from "react";
import styled from "styled-components";
import StarRatingIcons from "../Icons/StarRatingIcons.jsx";
import HeartToggleIcon from "../Icons/HeartToggleIcon.jsx";
import CartIcon from "../Icons/CartIcon.jsx";
import TrashIcon from "../Icons/TrashIcon.jsx";
import FractStarIcon from "../Icons/FractStarIcon.jsx";
import ClampedText from "../Generic/ClampedText.jsx";
import Heading from "../Generic/Heading.jsx";
import Image from "../Generic/Image.jsx";
import CustomNumericInput from "../Form/CustomNumericInput.jsx";
import SavedProductsContext from "../../contexts/SavedProductsContext.jsx";
import { HeadingLevelContextProvider } from "../../contexts/HeadingLevelContext.jsx";

import {
  getDiscountedPrice,
  getPriceStr,
  getProductInCartDiscountedValue,
} from "../../utils/priceUtils.js";
import data from "../../assets/data.json";

const Title = styled(({ title, nRows = null, className = "" }) => {
  return (
    <StyledTitle $nRows={nRows} className={className}>
      {nRows ? <ClampedText $nRows={nRows}>{title}</ClampedText> : title}
    </StyledTitle>
  );
})``;

const Description = styled(({ description, className = "" }) => {
  return <StyledText className={className}>{description}</StyledText>;
})``;

const Details = styled(({ brand, sku, weight, dimensions, className = "" }) => {
  return (
    <HeadingLevelContextProvider>
      <div className={className}>
        <Heading>Details</Heading>
        <StyledTable>
          <tbody>
            {brand && (
              <tr>
                <StyledTh>Brand</StyledTh>
                <StyledTd>{brand}</StyledTd>
              </tr>
            )}
            {sku && (
              <tr>
                <StyledTh>SKU</StyledTh>
                <StyledTd>{sku}</StyledTd>
              </tr>
            )}
            {weight && (
              <tr>
                <StyledTh>Weight</StyledTh>
                <StyledTd>{`${weight} ${data.weightUnit}`}</StyledTd>
              </tr>
            )}
            {dimensions && (
              <tr>
                <StyledTh>Dimensions (W×H×D)</StyledTh>
                <StyledTd>{`${dimensions.width} × ${dimensions.height} × ${dimensions.depth} ${data.lengthUnit}`}</StyledTd>
              </tr>
            )}
          </tbody>
        </StyledTable>
      </div>
    </HeadingLevelContextProvider>
  );
})``;

const PurchaseInfo = styled(({ product, className = "" }) => {
  const { getAvailabilityStatus, stock } = useContext(SavedProductsContext);

  const availabilityStr = getAvailabilityStatus(product);
  const stockVal = stock(product);

  return (
    <StyledPurchaseInfo className={className}>
      <ul>
        <li key="availabilityStatus">{`${availabilityStr} ${
          stockVal > 0 ? `(${stockVal} items available)` : ""
        }`}</li>
        <li key="shippingInformation">{product.shippingInformation}</li>
        <li key="warrantyInformation">{product.warrantyInformation}</li>
        <li key="returnPolicy">{product.returnPolicy}</li>
      </ul>
    </StyledPurchaseInfo>
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

const InCartProductDicountedValue = styled(
  ({ price, id, discountPercentage, className = "" }) => {
    const { inCart } = useContext(SavedProductsContext);

    const currency = data.currency;
    const inCartValue = getProductInCartDiscountedValue(
      price,
      inCart(id),
      discountPercentage
    );

    return (
      <StyledPrice className={className}>
        {getPriceStr(inCartValue, currency)}
      </StyledPrice>
    );
  }
)``;

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

const MinimizedRatingContainer = styled(({ rating, className = "" }) => {
  return (
    <StyledRowContainer className={className}>
      <FractStarIcon />
      <StyledText>{rating}</StyledText>
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

const WishlistButton = styled(
  ({ product, minimized = false, className = "" }) => {
    const { isInWishlist, dispatch } = useContext(SavedProductsContext);
    const inWishlist = isInWishlist(product.id);

    return (
      <StyledNoBgButton
        className={className}
        onClick={() => dispatch({ type: "toggleWishlist", product })}
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        $minimized={minimized}
      >
        <HeartToggleIcon fill={inWishlist} />
      </StyledNoBgButton>
    );
  }
)``;

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

const RemoveFromCartButton = styled(
  ({ product, minimized = false, className = "" }) => {
    const { inCart, dispatch } = useContext(SavedProductsContext);

    return (
      <StyledNoBgButton
        className={className}
        onClick={() => dispatch({ type: "removeFromCart", product })}
        disabled={inCart(product.id) === 0}
        aria-label="Remove from cart"
        $minimized={minimized}
      >
        <TrashIcon />
      </StyledNoBgButton>
    );
  }
)``;

const EditItemsInCart = styled(({ product, className = "" }) => {
  const { inCart, dispatch } = useContext(SavedProductsContext);

  const stockLeft = product.stock - inCart(product.id);
  const allStockInCart = stockLeft == 0;
  const isLowStock = !allStockInCart && stockLeft <= data.lowStockAt;

  return (
    <StyledEditItemsInCart className={className}>
      <CustomNumericInput
        id={`itemsInCartInput-#${product.id}`}
        value={inCart(product.id)}
        min={1}
        max={product.stock}
        setValueCallback={(count) => {
          dispatch({ type: "setMultipleToCart", product, count });
        }}
        decrementValueCallback={() =>
          dispatch({ type: "pushFromCart", product })
        }
        incrementValueCallback={() => dispatch({ type: "addToCart", product })}
        inputAriaLabel={"Set number of items in cart"}
        decrementAriaLabel={"Remove one item from cart"}
        incrementAriaLabel={"Add one item to cart"}
      />
      {allStockInCart && <p>No more stock available</p>}
      {isLowStock && <p>{`Only ${stockLeft} items left`}</p>}
    </StyledEditItemsInCart>
  );
})``;

const AddMultipleToCart = styled(({ product, className = "" }) => {
  const itemsToAdd = 1;
  const { inCart } = useContext(SavedProductsContext);

  const stockLeft = product.stock - inCart(product.id);
  const allStockInCart = stockLeft == 0;
  const isLowStock = !allStockInCart && stockLeft <= data.lowStockAt;

  return (
    <StyledAddMultipleToCart className={className}>
      <div>
        <CustomNumericInput
          id={`addMultipleToCartInput-#${product.id}`}
          value={itemsToAdd}
          min={1}
          max={Math.max(stockLeft, 1)}
          inputAriaLabel={"Set number of items to add to cart"}
          decrementAriaLabel={"Decrement number of items to add to cart"}
          incrementAriaLabel={"Increment number of items to add to cart"}
        />
      </div>
      {allStockInCart && <p>No more stock available</p>}
      {isLowStock && (
        <p>{`Only ${stockLeft} ${stockLeft > 1 ? "items" : "item"} left`}</p>
      )}
    </StyledAddMultipleToCart>
  );
})``;

const StyledEditItemsInCart = styled.div`
  position: relative;
  overflow: visible;
  padding-bottom: 0.8lh;

  && > p {
    position: absolute;
    white-space: nowrap;
    color: var(--col-highlight);
    font-size: 0.8em;
  }
`;

const StyledAddMultipleToCart = styled(StyledEditItemsInCart)``;

const StyledPurchaseInfo = styled.div`
  border-radius: var(--base-radius);
  overflow: hidden;

  ul {
    display: flex;
    flex-direction: column;
    gap: var(--base-gap);
  }

  li {
    padding: var(--base-padding);
    background-color: var(--col-white);
  }
`;

const StyledNoBgButton = styled.button`
  font-size: ${({ $minimized }) => ($minimized ? "1em" : "1lh")};
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
    cursor: not-allowed;
  }
`;

const StyledRowContainer = styled.div`
  display: flex;
  align-items: center;
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

const StyledTable = styled.table`
  width: 100%;
`;

const StyledTh = styled.th`
  text-align: left;
  font-weight: normal;
  padding-right: var(--small-gap);
  width: 40%;
`;

const StyledTd = styled.td`
  font-family: var(--cart-price-font);
  text-align: left;
  font-weight: bold;
`;

export {
  PriceContainer,
  RatingContainer,
  MinimizedRatingContainer,
  Title,
  Description,
  Details,
  PurchaseInfo,
  Thumbnail,
  DiscountPercentage,
  AvailabilityStatus,
  StyledRowContainer,
  WishlistButton,
  AddToCartButton,
  RemoveFromCartButton,
  EditItemsInCart,
  AddMultipleToCart,
  InCartProductDicountedValue,
};
