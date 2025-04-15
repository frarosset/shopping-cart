import { getPriceStr } from "../../utils/priceUtils.js";
import styled from "styled-components";

function CartShippingFeeInfo({ toAddForFreeShipping, className = "" }) {
  const freeShipping = <StyledEm>FREE shipping</StyledEm>;

  return (
    <div className={className}>
      {toAddForFreeShipping > 0 ? (
        <>
          Add at least{" "}
          {<StyledEm>{getPriceStr(toAddForFreeShipping)}</StyledEm>} to your
          cart to get {freeShipping}
        </>
      ) : (
        <>You are eligible for {freeShipping}</>
      )}
    </div>
  );
}

const StyledEm = styled.em`
  font-weight: bold;
  font-family: var(--product-price-font);
  text-transform: uppercase;
`;

export default CartShippingFeeInfo;
