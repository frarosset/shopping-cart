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
//   cartItems: 5,
// };
//
// Below, action.product, is an object which contains the product info:
//
//   {title: "Laptop", /* other properties */}
//
// ACTION TYPES
// - "addToWishlist" is used to add a product to the wishlist.
//   action.product is required
//

function savedProductsReducer(state, action) {
  switch (action.type) {
    case "addToWishlist": {
      const copiedState = structuredClone(state);

      const id = action.product.id;
      const product = copiedState.productList[id];

      if (product == null) {
        // product not saved
        const copiedProduct = structuredClone(action.product);

        copiedProduct.inWishlist = true;
        copiedProduct.inCart = 0;

        copiedState.productList[id] = copiedProduct;
        copiedState.wishlist.push(id);
      } else if (!product.inWishlist) {
        // product saved, but not in wishlist yet
        product.inWishlist = true;

        copiedState.wishlist.push(id);
      }

      return copiedState;
    }
  }
}

export default savedProductsReducer;
