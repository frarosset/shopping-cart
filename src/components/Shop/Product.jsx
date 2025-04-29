import {
  Title,
  Description,
  ImagesCarousel,
  PurchaseInfo,
  Details,
  PriceContainer,
  RatingContainer,
  DiscountPercentage,
  AvailabilityStatus,
  WishlistButton,
  AddMultipleToCart,
  StyledRowContainer,
} from "./StyledProductInfo.jsx";
import CategoryItem from "./CategoryItem.jsx";
import { HeadingLevelContextProvider } from "../../contexts/HeadingLevelContext.jsx";
import data from "../../assets/data.json";

function Product({ productData, className = "" }) {
  return (
    <HeadingLevelContextProvider>
      <div className={className}>
        <ImagesCarousel {...productData} />
        <CategoryItem {...productData} />
        <StyledRowContainer>
          <AvailabilityStatus
            product={productData}
            ignoreStatusList={[data.availability.inStock]}
          />
          <DiscountPercentage {...productData} />
        </StyledRowContainer>
        <Title {...productData} />
        <WishlistButton product={productData} />
        <Description {...productData} />
        <PriceContainer {...productData} />
        <AddMultipleToCart product={productData} />
        <RatingContainer {...productData} />
        <PurchaseInfo product={productData} />
        <Details {...productData} />
      </div>
    </HeadingLevelContextProvider>
  );
}

export default Product;
