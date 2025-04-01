import Heading from "../Generic/Heading.jsx";

function CartMain({ className = "" }) {
  return (
    <main className={className}>
      <header>
        <Heading>Cart</Heading>
      </header>
    </main>
  );
}

export default CartMain;
