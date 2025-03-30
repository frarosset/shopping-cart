import Attribution from "./Attribution.jsx";
import CreditFooter from "./CreditFooter.jsx";
import data from "../../assets/data.json";

function Footer() {
  return (
    <footer>
      <p>{data.shopName}</p>
      <p>{data.slogan}</p>
      <Attribution />
      <CreditFooter />
    </footer>
  );
}

export default Footer;
