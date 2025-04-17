import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Thumbnail,
  Title,
  PriceContainer,
  WishlistButton,
  RemoveFromCartButton,
  EditItemsInCart,
  StyledRowContainer,
  InCartProductDicountedValue,
} from "./StyledProductInfo.jsx";
import { HeadingLevelContextProvider } from "../../contexts/HeadingLevelContext.jsx";

const CartProductItem = styled(({ productData, className = "" }) => {
  return (
    <HeadingLevelContextProvider>
      <StyledCartProductItem className={className}>
        <Link to={`/shop/p/${productData.id}`}>
          <Thumbnail {...productData} />
        </Link>
        <StyledCartProductItemInfo>
          <Title {...productData} nRows={1} />
          <InCartProductDicountedValue {...productData} />
          <StyledPriceContainer {...productData} />
          <CustomStyledRowContainer>
            <EditItemsInCart product={productData} />
            <StyledRowContainer>
              <WishlistButton product={productData} minimized={true} />
              <RemoveFromCartButton product={productData} minimized={true} />
            </StyledRowContainer>
          </CustomStyledRowContainer>
        </StyledCartProductItemInfo>
      </StyledCartProductItem>
    </HeadingLevelContextProvider>
  );
})``;

const StyledCartProductItem = styled.div`
  display: grid;
  grid-template-columns: var(--cart-product-item-thumbnail-size) 1fr;

  max-width: var(--cart-product-item-max-width);
  width: 100%;
  gap: var(--mid-gap);
`;

const StyledCartProductItemInfo = styled.div`
  display: grid;
  align-content: space-between;
  gap: var(--small-gap);
`;

const StyledPriceContainer = styled(PriceContainer)`
  && * {
    font-size: var(--smaller-fontsize);
    font-weight: normal;
  }
`;

const CustomStyledRowContainer = styled(StyledRowContainer)`
  display: flex;
  justify-content: space-between;
`;

export default CartProductItem;
