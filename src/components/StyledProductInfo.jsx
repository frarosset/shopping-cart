import styled from "styled-components";
import { getDiscountedPrice, getPriceStr } from "../utils/priceUtils.js";
import data from "../assets/data.json";

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
)``;

// StyledProductInfo.jsx
const StyledRowContainer = styled.div`
  display: flex;
  gap: var(--small-gap);
`;

const StyledPrice = styled.span`
  font-family: var(--product-price-font);
  font-size: var(--product-price-size);

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

export { PriceContainer };
