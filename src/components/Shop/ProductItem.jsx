import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Thumbnail,
  Title,
  PriceContainer,
  RatingContainer,
  DiscountPercentage,
  AvailabilityStatus,
  StyledRowContainer,
} from "../StyledProductInfo.jsx";
import data from "../../assets/data.json";

const ProductItem = styled(({ productData, className = "" }) => {
  const hLevel = 3;
  const outOfStock =
    productData.availabilityStatus == data.availability.outOfStock;

  return (
    <StyledProductItem className={className} $outOfStock={outOfStock}>
      <StyledHighlightTags>
        <DiscountPercentage {...productData} />
        <AvailabilityStatus
          {...productData}
          ignoreStatusList={[data.availability.inStock]}
        />
      </StyledHighlightTags>
      <Link to={`/shop/p/${productData.id}`}>
        <StyledThumbnailContainer>
          <Thumbnail {...productData} />
        </StyledThumbnailContainer>
        <Title {...productData} hLevel={hLevel} nRows={2} />
      </Link>
      <RatingContainer {...productData} />
      <PriceContainer {...productData} />
    </StyledProductItem>
  );
})``;

const StyledHighlightTags = styled(StyledRowContainer)`
  position: absolute;
  top: var(--small-padding);
  left: var(--small-padding);
  z-index: 1;
`;

const StyledThumbnailContainer = styled.div`
  overflow: hidden;
  box-shadow: 0 0 var(--product-photo-shadow-size) var(--product-photo-color)
    inset;

  ${Thumbnail} {
    box-shadow: none;
  }
`;

const StyledProductItem = styled.div`
  position: relative;
  width: 100%;
  min-width: var(--product-item-min-size);
  max-width: var(--product-item-max-size);
  overflow: hidden;
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
