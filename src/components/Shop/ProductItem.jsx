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

function ProductItem({ productData, className = "" }) {
  const hLevel = 3;

  return (
    <div className={`product-item ${className}`} data-testid="product-item">
      <StyledHighlightTags>
        <DiscountPercentage {...productData} />
        <AvailabilityStatus
          {...productData}
          ignoreStatusList={[data.availability.inStock]}
        />
      </StyledHighlightTags>
      <Link to={`/shop/p/${productData.id}`}>
        <Thumbnail {...productData} />
        <Title {...productData} hLevel={hLevel} nRows={2} />
      </Link>
      <RatingContainer {...productData} />
      <PriceContainer {...productData} />
    </div>
  );
}

const StyledHighlightTags = styled(StyledRowContainer)`
  position: absolute;
  top: var(--small-padding);
  left: var(--small-padding);
`;

const StyledProductItem = styled(ProductItem)`
  position: relative;
`;

export default StyledProductItem;
