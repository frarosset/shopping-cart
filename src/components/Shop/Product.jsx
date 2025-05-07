import {
  Title,
  Description,
  ImagesCarousel,
  PurchaseInfo,
  Details,
  ReviewList,
  PriceContainer,
  RatingContainer,
  DiscountPercentage,
  AvailabilityStatus,
  WishlistButton,
  AddMultipleToCart,
  StyledRowContainer,
} from "./StyledProductInfo.jsx";
import SectionFromCategoryItem from "./SectionFromCategoryItem.jsx";
import CategoryItem from "./CategoryItem.jsx";
import { HeadingLevelContextProvider } from "../../contexts/HeadingLevelContext.jsx";
import data from "../../assets/data.json";

function Product({ productData, className = "" }) {
  return (
    <HeadingLevelContextProvider>
      <div className={className}>
        <div>
          <SectionFromCategoryItem {...productData} />
          <span> / </span>
          <CategoryItem {...productData} />
        </div>
        <ImagesCarousel {...productData} />
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
        <ReviewList {...productData} />
      </div>
    </HeadingLevelContextProvider>
  );
}

export default Product;
