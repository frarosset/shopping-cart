import { getPriceStr } from "../../utils/priceUtils.js";
import styled from "styled-components";

function CartShippingFeeInfo({ toAddForFreeShipping, className = "" }) {
  const freeShipping = <StyledEm>FREE shipping</StyledEm>;

  return (
    <StyledCartShippingFeeInfo className={className}>
      {toAddForFreeShipping > 0 ? (
        <p>
          Add at least{" "}
          {<StyledEm>{getPriceStr(toAddForFreeShipping)}</StyledEm>} to your
          cart to get {freeShipping}
        </p>
      ) : (
        <p>You are eligible for {freeShipping}</p>
      )}
    </StyledCartShippingFeeInfo>
  );
}

const StyledCartShippingFeeInfo = styled.div`
  p {
    text-wrap: pretty;
  }
`;

const StyledEm = styled.em`
  font-weight: bold;
  font-family: var(--product-price-font);
  text-transform: uppercase;
`;

export default CartShippingFeeInfo;
