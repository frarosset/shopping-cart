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
import styled from "styled-components";

function Product({ productData, className = "" }) {
  return (
    <HeadingLevelContextProvider>
      <StyledProduct className={className}>
        <StyledLinksContainer>
          <SectionFromCategoryItem {...productData} />
          <span> / </span>
          <CategoryItem {...productData} />
        </StyledLinksContainer>
        <StyledProductImageAndInfoContainer>
          <ImagesCarousel {...productData} />
          <StyledProductInfoContainer>
            <StyledRowContainer>
              <AvailabilityStatus
                product={productData}
                ignoreStatusList={[data.availability.inStock]}
              />
              <DiscountPercentage {...productData} />
            </StyledRowContainer>
            <div>
              <StyledRowContainerSpaceBetween>
                <RatingContainer {...productData} />
                <WishlistButton product={productData} />
              </StyledRowContainerSpaceBetween>
              <StyledTitle {...productData} />
              <Description {...productData} />
            </div>
            <StyledPriceContainer {...productData} />
            <AddMultipleToCart product={productData} />

            <PurchaseInfo product={productData} />
            <Details {...productData} />
          </StyledProductInfoContainer>
        </StyledProductImageAndInfoContainer>
        <StyledReviewListContainer>
          <ReviewList {...productData} />
        </StyledReviewListContainer>
      </StyledProduct>
    </HeadingLevelContextProvider>
  );
}

const StyledProduct = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--product-main-gap);
  align-items: center;
  width: 100%;
`;

const StyledLinksContainer = styled.div`
  text-align: center;

  & > *:first-child {
    text-transform: uppercase;
    color: var(--col-highlight);
  }
`;

const StyledProductImageAndInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--product-main-gap);
  width: 100%;

  @media screen and (min-width: 960px) {
    flex-direction: row;
    align-items: flex-start;
    padding-left: var(--page-padding-lr);
    gap: 0;
  }
`;

const StyledProductInfoContainer = styled.div`
  padding: 0 var(--page-padding-lr);
  max-width: var(--product-item-max-width);

  display: flex;
  flex-direction: column;
  gap: 1lh;
`;

const StyledTitle = styled(Title)`
  font-size: var(--heading-2-size);
`;

const StyledPriceContainer = styled(PriceContainer)`
  * {
    font-size: var(--heading-2-size);
  }
`;

const StyledRowContainerSpaceBetween = styled(StyledRowContainer)`
  justify-content: space-between;
  align-items: flex-start;
`;

const StyledReviewListContainer = styled.div`
  padding: 0 var(--page-padding-lr);
  max-width: var(--product-item-max-width);
  width: 100%;
`;

export default Product;
