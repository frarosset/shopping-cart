import Heading from "../Generic/Heading.jsx";
import { useContext } from "react";
import SavedProductsContext from "../../contexts/SavedProductsContext.jsx";
import MessageWithImageBelow from "../Generic/MessageWithImageBelow.jsx";
import { Link } from "react-router-dom";

function CartMain({ className = "" }) {
  const { cart } = useContext(SavedProductsContext);

  return (
    <main className={className}>
      <header>
        <Heading>Cart</Heading>
      </header>

      {cart &&
        (cart.length > 0 ? (
          "SHOW CART (TODO)"
        ) : (
          <MessageWithImageBelow imageUrl="/images/vector/empty-cart.jpg">
            Your cart is empty!
            <Link to="/shop">Go shopping now!</Link>
          </MessageWithImageBelow>
        ))}
    </main>
  );
}

export default CartMain;
