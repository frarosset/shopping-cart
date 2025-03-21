import data from "../../assets/data.json";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Heading from "../Generic/Heading.jsx";

function Header({ className = "" }) {
  return (
    <StyledHeader className={`${className}`}>
      <StyledShopNameHeading>
        <NavLink to="/">{data.shopName}</NavLink>
      </StyledShopNameHeading>
      <StyledNav>
        <StyledNavLink to="/shop">Shop</StyledNavLink>
      </StyledNav>
      <div>
        <button aria-label="search">Search</button>
        <button aria-label="profile">Profile</button>
        <button aria-label="watchlist">Watchlist</button>
        <button aria-label="cart">Cart</button>
      </div>
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

const StyledShopNameHeading = styled(Heading)`
  font-size: var(--header-shop-name-fontsize);
  font-family: var(--header-shop-name-font);
`;

const StyledNavLink = styled(NavLink)`
  &.active {
    text-shadow: 0px 0px 0px var(--header-col), 0px 0px 0px var(--header-col),
      0px 0px 0px var(--header-col), 0px 0px 0px var(--header-col),
      0px 0px 0px var(--header-col), 0px 0px 0px var(--header-col);
  }
`;

export default Header; // export the styled component
