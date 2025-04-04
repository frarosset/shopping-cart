import { getPriceStr } from "../../utils/priceUtils.js";

function CartShippingFeeInfo({ toAddForFreeShipping, className = "" }) {
  const freeShipping = <em>FREE shipping</em>;

  return (
    <div className={className}>
      {toAddForFreeShipping > 0 ? (
        <>
          Add at least {<em>{getPriceStr(toAddForFreeShipping)}</em>} to your
          cart to get {freeShipping}
        </>
      ) : (
        <>You are eligible for {freeShipping}</>
      )}
    </div>
  );
}

export default CartShippingFeeInfo;
