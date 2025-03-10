import data from "../../assets/data.json";

function Header() {
  return (
    <header>
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

export default Header;
