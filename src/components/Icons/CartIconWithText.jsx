import CartIcon from "./CartIcon.jsx";
import styled from "styled-components";

const maxDisplayed = 100;

function CartIconWithText({ cartItems = 0 }) {
  return (
    <StyledCartIconWithText>
      {cartItems > 0 && (
        <StyledCartItemsText>
          {cartItems < maxDisplayed ? cartItems : `${maxDisplayed - 1}+`}
        </StyledCartItemsText>
      )}
      <CartIcon />
    </StyledCartIconWithText>
  );
}

const StyledCartIconWithText = styled.span`
  position: relative;
`;

const StyledCartItemsText = styled.span`
  position: absolute;
  top: -60%;
  right: -75%;

  font-size: 50%;
  padding: 0.3em;

  min-width: 1.5em;
  width: min-content;
  height: 1.5em;
  border-radius: 0.75em;

  background-color: var(--col-highlight);
  color: var(--col-white);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default CartIconWithText;
