import data from "../../assets/data.json";
import styled from "styled-components";

function Header({ className = "page-header" }) {
  return (
    <header className={className}>
      <h1>{data.shopName}</h1>
      <nav>nav (TODO)</nav>
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

  & > nav {
    border-left: 1px solid var(--header-col);
    padding-left: var(--header-gap);
    margin-right: auto;
  }
`;

export default StyledHeader; // export the styled component
