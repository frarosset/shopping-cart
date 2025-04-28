import { Link } from "react-router-dom";
import { useContext } from "react";
import styled from "styled-components";
import {
  Thumbnail,
  Title,
  PriceContainer,
  RatingContainer,
  MinimizedRatingContainer,
  DiscountPercentage,
  AvailabilityStatus,
  StyledRowContainer,
  WishlistButton,
  AddToCartButton,
} from "./StyledProductInfo.jsx";
import { HeadingLevelContextProvider } from "../../contexts/HeadingLevelContext.jsx";
import SavedProductsContext from "../../contexts/SavedProductsContext.jsx";
import data from "../../assets/data.json";

const ProductItem = styled(
  ({ productData, minimized = false, className = "" }) => {
    const { isOutOfStock } = useContext(SavedProductsContext);

    const outOfStock = isOutOfStock(productData);

    return (
      <HeadingLevelContextProvider>
        <StyledProductItem
          className={className}
          $outOfStock={outOfStock}
          $minimized={minimized}
        >
          <StyledHighlightTags>
            <DiscountPercentage {...productData} />
            <AvailabilityStatus
              product={productData}
              ignoreStatusList={[data.availability.inStock]}
            />
          </StyledHighlightTags>
          <StyledWishlistButtonContainer>
            <WishlistButton product={productData} minimized={minimized} />
          </StyledWishlistButtonContainer>
          <Link to={`/shop/p/${productData.id}`}>
            <StyledThumbnailContainer>
              <Thumbnail {...productData} />
            </StyledThumbnailContainer>
            <Title {...productData} nRows={minimized ? 1 : 2} />
          </Link>
          <StyledBottomContainer>
            <StyledBottomTextContainer>
              {minimized ? (
                <MinimizedRatingContainer {...productData} />
              ) : (
                <RatingContainer {...productData} />
              )}
              <PriceContainer {...productData} />
            </StyledBottomTextContainer>
            {!minimized && <AddToCartButton product={productData} />}
          </StyledBottomContainer>
        </StyledProductItem>
      </HeadingLevelContextProvider>
    );
  }
)``;

const StyledHighlightTags = styled(StyledRowContainer)`
  position: absolute;
  top: var(--small-padding);
  left: var(--small-padding);
  z-index: 1;
`;

const StyledBottomContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledBottomTextContainer = styled.div`
  flex: 1;
`;

const StyledWishlistButtonContainer = styled.div`
  position: absolute;
  top: var(--small-padding);
  right: var(--small-padding);
  z-index: 1;
  font-size: 1lh;
  svg {
    filter: drop-shadow(0px 0px 1px white);
  }
`;

const StyledThumbnailContainer = styled.div`
  overflow: hidden;
  box-shadow: 0 0 var(--product-photo-shadow-size) var(--product-photo-color)
    inset;
  background-color: var(--col-pure-white);

  ${Thumbnail} {
    box-shadow: none;
  }
`;

const StyledProductItem = styled.div`
  ${({ $minimized }) =>
    $minimized &&
    `
      --product-item-min-size: var(--product-item-min-size-minimized);
      --product-item-max-size: var(--product-item-max-size-minimized);
  
      && ${PriceContainer}>span {
        font-size: var(--product-text-size);
      }
   `}

  position: relative;
  width: 100%;
  min-width: var(--product-item-min-size);
  max-width: var(--product-item-max-size);
  // overflow: hidden;
  container-type: inline-size;

  * {
    transition: transform var(--product-transition-duration);
  }

  ${Thumbnail} {
    ${({ $outOfStock }) =>
      $outOfStock &&
      `
      filter: opacity(var(--product-item-hover-thumbnail-opacity)) grayscale(var(--product-item-hover-thumbnail-greyscale));
  `}
  }

  &:hover ${Thumbnail} {
    transform: scale(var(--product-item-hover-thumbnail-scale));
  }
`;

export default ProductItem;
