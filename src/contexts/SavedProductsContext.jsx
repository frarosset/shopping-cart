import { createContext, useReducer } from "react";
import savedProductsReducer from "../reducers/savedProductsReducer.jsx";

// Sample state:
// {
//   productList: {
//     0: { id: 0,  inCart: 4, inWishlist: true, /* other properties */ },
//     1: { id: 1, inCart: 0, inWishlist: true, /* other properties */ },
//     2: { id: 2,  inCart: 1, inWishlist: false, /* other properties */ },
//     3: { id: 3, , inCart: 0, inWishlist: false, /* other properties */ },
//   },
//   wishlist: [0, 1], // list of ids
//   cart: [0, 2], // list of ids
//   cartItems: 5, // number of items in the cart
// };

// dispatch actions:
// - addToWishlist (product)
// - removeFromWishlist(product)
// - toggleWishlist (product)
// - addToCart (product)
// - addMultipleToCart(product, count)
// - setMultipleToCart (product, count)
// - pushFromCart (product)
// - removeFromCart (product)

const initialState = {
  productList: {},
  wishlist: [],
  cart: [],
  cartItems: 0,
};

const SavedProductsContext = createContext(initialState);

function SavedProductsContextProvider({ children }) {
  const [state, dispatch] = useReducer(savedProductsReducer, initialState);

  const isInWishlist = (id) =>
    state.productList[id] != null && state.productList[id].inWishlist;

  const isInCart = (id) =>
    state.productList[id] != null && state.productList[id].inCart;

  const wishlist = state.wishlist.map((id) => state.productList[id]);
  const cart = state.cart.map((id) => state.productList[id]);

  const cartItems = state.cartItems; // items in cart

  const savedProductContext = {
    isInWishlist,
    isInCart,
    wishlist,
    cart,
    cartItems,
    dispatch,
  };

  return (
    <SavedProductsContext.Provider value={savedProductContext}>
      {children}
    </SavedProductsContext.Provider>
  );
}

export default SavedProductsContext;
export { SavedProductsContextProvider };
