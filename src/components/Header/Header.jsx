import data from "../../assets/data.json";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Header({ className = "page-header" }) {
  return (
    <header className={className} data-testid="page-header">
      <h1>
        <NavLink to="/">{data.shopName}</NavLink>
      </h1>
      <nav>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      <div>
        <button aria-label="search">Search</button>
        <button aria-label="profile">Profile</button>
        <button aria-label="watchlist">Watchlist</button>
        <button aria-label="cart">Cart</button>
      </div>
    </header>
  );
}

const StyledHeader = styled(Header)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  gap: var(--header-gap);
  padding: var(--header-padding);
  color: var(--header-col);

  & > h1 {
    font-size: var(--header-h1-fontsize);
    font-family: var(--header-h1-font);
  }

  & a {
    color: var(--header-col);
  }

  & > nav {
    display: flex;
    flex-direction: row;
    border-left: 1px solid var(--header-col);
    padding-left: var(--header-gap);
    margin-right: auto;
    gap: var(--header-gap);
  }

  & > nav .active {
    text-shadow: 0px 0px 0px var(--header-col), 0px 0px 0px var(--header-col),
      0px 0px 0px var(--header-col), 0px 0px 0px var(--header-col),
      0px 0px 0px var(--header-col), 0px 0px 0px var(--header-col);
  }
`;

export default StyledHeader; // export the styled component
