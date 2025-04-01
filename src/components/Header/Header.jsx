import data from "../../assets/data.json";
import { useContext } from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import Heading from "../Generic/Heading.jsx";

import UserCircleIcon from "../Icons/UserCircleIcon.jsx";
import HeartIcon from "../Icons/HeartIcon.jsx";
import SearchIcon from "../Icons/SearchIcon.jsx";
import CartIconWithText from "../Icons/CartIconWithText.jsx";
import SavedProductsContext from "../../contexts/SavedProductsContext.jsx";

function Header({ className = "" }) {
  const { cartItems } = useContext(SavedProductsContext);

  return (
    <StyledHeader className={`${className}`}>
      <StyledShopNameHeading>
        <NavLink to="/">
          <StyledShopIcon>{data.shopShortName}</StyledShopIcon>
          <StyledShopName>{data.shopName}</StyledShopName>
        </NavLink>
      </StyledShopNameHeading>
      <StyledNav>
        <StyledNavLink to="/shop">Shop</StyledNavLink>
      </StyledNav>
      <StyledButtonContainer>
        <Link aria-label="search" to="/search">
          <SearchIcon />
        </Link>
        <button aria-label="profile">
          <UserCircleIcon />
        </button>
        <Link aria-label="wishlist" to="/wishlist">
          <HeartIcon />
        </Link>
        <Link aria-label="cart" to="/cart">
          <CartIconWithText cartItems={cartItems} />
        </Link>
      </StyledButtonContainer>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  gap: var(--header-gap);
  padding: var(--header-padding);
  color: var(--header-col);

  background: var(--header-background);
  position: sticky;
  top: 0;
  z-index: 2;
`;

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  border-left: 1px solid var(--header-col);
  padding-left: var(--header-gap);
  margin-right: auto;
  gap: var(--header-gap);
`;

const StyledShopIcon = styled.span`
  min-width: 1lh;
`;

const StyledShopName = styled.span``;

const StyledShopNameHeading = styled(Heading)`
  font-size: var(--header-shop-name-fontsize);
  font-family: var(--header-shop-name-font);

  a {
    display: flex;
    gap: var(--small-gap);
    align-items: center;
  }

  & ${StyledShopName} {
    display: none;
  }

  @media screen and (min-width: 550px) {
    & ${StyledShopIcon} {
      display: none;
    }

    & ${StyledShopName} {
      display: inline;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  &.active {
    text-shadow: 0px 0px 0px var(--header-col), 0px 0px 0px var(--header-col),
      0px 0px 0px var(--header-col), 0px 0px 0px var(--header-col),
      0px 0px 0px var(--header-col), 0px 0px 0px var(--header-col);
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;

  a,
  button {
    font-size: var(--header-buttons-fontsize);
    padding: var(--header-buttons-padding);
  }
`;

export default Header; // export the styled component
