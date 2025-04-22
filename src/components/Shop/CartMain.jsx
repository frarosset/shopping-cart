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
          <StyledCartInfo>
            <StyledCartShippingFeeInfo {...cartSummaryData} />
            <StyledCartProductList productDataList={cart} />
            <StyledCartSummary {...{ ...cartSummaryData, cartItems }} />
            <StyledCheckoutButton aria-label="Checkout">
              <CashRegisterIcon />
              Checkout
            </StyledCheckoutButton>
          </StyledCartInfo>
        ) : (
          <>
            <MessageWithImageBelow imageUrl="/images/vector/empty-cart.jpg">
              Your cart is empty!
              <StyledLink to="/shop">Go shopping now!</StyledLink>
            </MessageWithImageBelow>
            <StyledCartShippingFeeInfo {...cartSummaryData} />
          </>
        ))}
    </StyledMain>
  );
}

const StyledLink = styled(Link)`
  font-weight: bold;
`;

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
  padding-left: var(--page-padding-lr);
  padding-right: var(--page-padding-lr);
`;

const StyledCartInfo = styled.div`
  width: 100%;

  display: grid;
  gap: var(--page-gap);
  align-items: start;
  justify-items: center;

  grid-template-columns: 1fr;
  grid-template-areas:
    "CartShippingFeeInfo"
    "CartProductList"
    "CartSummary"
    "CheckoutButton";

  @media screen and (min-width: 960px) {
    justify-items: start;
    grid-template-columns: 1fr var(--cart-summary-max-width);
    grid-template-rows: auto auto 1fr;
    grid-template-areas:
      "CartProductList CartShippingFeeInfo"
      "CartProductList CartSummary"
      "CartProductList CheckoutButton";
  }
`;

const StyledCartShippingFeeInfo = styled(CartShippingFeeInfo)`
  grid-area: CartShippingFeeInfo;
  height: 3lh;
  p {
    background-color: var(--col-light-grey);
    padding: var(--base-padding);
    border-radius: var(--base-radius);
  }
`;

const StyledCartProductList = styled(CartProductList)`
  grid-area: CartProductList;
`;

const StyledCartSummary = styled(CartSummary)`
  grid-area: CartSummary;

  background-color: var(--col-white);
  padding: var(--base-padding);
  border-radius: var(--base-radius);
`;

const StyledCheckoutButton = styled.button`
  grid-area: CheckoutButton;

  display: flex;
  gap: var(--small-gap);
  align-items: center;
  justify-content: center;

  background-color: var(--col-highlight);
  color: var(--col-txt-alt);

  width: var(--cart-summary-max-width);
  max-width: 100%;

  *:has(> svg) {
    width: 1lh;
    height: 1lh;
  }
`;

export default CartMain;
