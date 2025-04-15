import Heading from "../Generic/Heading.jsx";
import styled from "styled-components";
import { useContext } from "react";
import SavedProductsContext from "../../contexts/SavedProductsContext.jsx";
import MessageWithImageBelow from "../Generic/MessageWithImageBelow.jsx";
import CartSummary from "./CartSummary.jsx";
import CashRegisterIcon from "../Icons/CashRegisterIcon.jsx";
import { Link } from "react-router-dom";
import data from "../../assets/data.json";
import { getCartSummary } from "../../utils/priceUtils.js";
import CartShippingFeeInfo from "./CartShippingFeeInfo.jsx";
import CartProductList from "./CartProductList.jsx";

const baseShippingFee = data.baseShippingFee;
const freeShippingAt = data.freeShippingAt;

function CartMain({ className = "" }) {
  const { cart, cartItems } = useContext(SavedProductsContext);

  const cartSummaryData = getCartSummary(cart, baseShippingFee, freeShippingAt);

  return (
    <StyledMain className={className}>
      <StyledHeader>
        <Heading>Cart</Heading>
      </StyledHeader>

      {cart &&
        (cart.length > 0 ? (
          <>
            <CartShippingFeeInfo {...cartSummaryData} />
            <CartProductList productDataList={cart} />
            <CartSummary {...{ ...cartSummaryData, cartItems }} />
            <button aria-label="Checkout">
              <CashRegisterIcon />
              Checkout
            </button>
          </>
        ) : (
          <MessageWithImageBelow imageUrl="/images/vector/empty-cart.jpg">
            Your cart is empty!
            <Link to="/shop">Go shopping now!</Link>
            <CartShippingFeeInfo {...cartSummaryData} />
          </MessageWithImageBelow>
        ))}
    </StyledMain>
  );
}

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 var(--page-padding-lr);
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: var(--page-gap);
  align-items: center;
  padding: var(--page-outlet-padding);
`;

export default CartMain;
