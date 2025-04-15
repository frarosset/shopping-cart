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
} from "./StyledProductInfo.jsx";
import { HeadingLevelContextProvider } from "../../contexts/HeadingLevelContext.jsx";

const CartProductItem = styled(({ productData, className = "" }) => {
  return (
    <HeadingLevelContextProvider>
      <div className={className}>
        <Link to={`/shop/p/${productData.id}`}>
          <Thumbnail {...productData} />
        </Link>
        <div>
          <Title {...productData} nRows={2} />
          <span>
            <PriceContainer {...productData} />
          </span>
          <StyledRowContainer>
            <EditItemsInCart product={productData} />
            <WishlistButton product={productData} />
            <RemoveFromCartButton product={productData} />
          </StyledRowContainer>
        </div>
      </div>
    </HeadingLevelContextProvider>
  );
})``;

export default CartProductItem;
