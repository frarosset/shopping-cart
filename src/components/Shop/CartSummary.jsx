import Heading from "../Generic/Heading.jsx";
import { HeadingLevelContextProvider } from "../../contexts/HeadingLevelContext.jsx";
import { getPriceStr } from "../../utils/priceUtils.js";
import styled from "styled-components";

function CartSummary({
  cartItems,
  cartValue,
  cartDiscountValue,
  shippingFee,
  cartTotal,
  className = "",
}) {
  return (
    <HeadingLevelContextProvider>
      <StyledCartSummary className={className}>
        <header>
          <Heading>{`Summary (${cartItems} item${
            cartItems > 1 ? "s" : ""
          })`}</Heading>
        </header>
        <StyledTable>
          <tbody>
            <StyledTr>
              <StyledTh>Order Value</StyledTh>
              <StyledTd>{getPriceStr(cartValue)}</StyledTd>
            </StyledTr>
            <StyledTr>
              <StyledTh>Discount</StyledTh>
              <StyledTd $highlight={true}>
                {cartDiscountValue ? getPriceStr(-cartDiscountValue) : "-"}
              </StyledTd>
            </StyledTr>
            <StyledTr>
              <StyledTh>Shipping Fee</StyledTh>
              <StyledTd>
                {shippingFee ? getPriceStr(shippingFee) : "FREE"}
              </StyledTd>
            </StyledTr>
            <StyledTr>
              <StyledTh>TOTAL</StyledTh>
              <StyledTd>{getPriceStr(cartTotal)}</StyledTd>
            </StyledTr>
          </tbody>
        </StyledTable>
      </StyledCartSummary>
    </HeadingLevelContextProvider>
  );
}

const StyledCartSummary = styled.div`
  width: 100%;
  max-width: var(--cart-summary-max-width);
`;

const StyledTable = styled.table`
  width: 100%;
`;

const StyledTr = styled.tr`
  &:first-child > *,
  &:last-child > * {
    padding-top: var(--cart-summary-gap);
  }

  &:last-child > * {
    font-weight: bold;
    font-size: var(--cart-total-price-size);
  }
`;

const StyledTh = styled.th`
  text-align: left;
  font-weight: normal;
  padding-right: var(--small-gap);
`;

const StyledTd = styled.td`
  font-family: var(--cart-price-font);
  text-align: right;
  font-weight: bold;

  ${({ $highlight }) => $highlight && "color: var(--cart-price-highlight-col)"}
`;

export default CartSummary;
