import {
  Title,
  Description,
  PriceContainer,
  RatingContainer,
  DiscountPercentage,
  AvailabilityStatus,
  WishlistButton,
  StyledRowContainer,
} from "./StyledProductInfo.jsx";
import CategoryItem from "./CategoryItem.jsx";
import { HeadingLevelContextProvider } from "../../contexts/HeadingLevelContext.jsx";

function Product({ productData, className = "" }) {
  return (
    <HeadingLevelContextProvider>
      <div className={className}>
        <CategoryItem {...productData} />
        <StyledRowContainer>
          <AvailabilityStatus product={productData} />
          <DiscountPercentage {...productData} />
        </StyledRowContainer>

        <Title {...productData} />
        <WishlistButton product={productData} />
        <Description {...productData} />
        <PriceContainer {...productData} />
        <RatingContainer {...productData} />
      </div>
    </HeadingLevelContextProvider>
  );
}

export default Product;
