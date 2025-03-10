import data from "../../assets/data.json";

function Header() {
  return (
    <header>
      <h1>{data.shopName}</h1>
    </header>
  );
}

export default Header;
