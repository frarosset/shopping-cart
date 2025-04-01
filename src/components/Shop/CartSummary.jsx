import Heading from "../Generic/Heading.jsx";
import { HeadingLevelContextProvider } from "../../contexts/HeadingLevelContext.jsx";
import { getPriceStr } from "../../utils/priceUtils.js";

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
      <div className={className}>
        <header>
          <Heading>{`Summary (${cartItems} items)`}</Heading>
        </header>
        <table>
          <tbody>
            <tr>
              <th>Order Value</th>
              <td>{getPriceStr(cartValue)}</td>
            </tr>
            <tr>
              <th>Discount</th>
              <td>{getPriceStr(cartDiscountValue)}</td>
            </tr>
            <tr>
              <th>Shipping Fee</th>
              <td>{shippingFee ? getPriceStr(shippingFee) : "FREE"}</td>
            </tr>
            <tr>
              <th>TOTAL</th>
              <td>{getPriceStr(cartTotal)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </HeadingLevelContextProvider>
  );
}

export default CartSummary;
