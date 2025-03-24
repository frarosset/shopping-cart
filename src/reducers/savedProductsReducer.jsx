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

    case "removeFromWishlist": {
      const copiedState = structuredClone(state);

      const id = action.product.id;
      const product = copiedState.productList[id];

      if (product != null && product.inWishlist) {
        // product saved, in wishlist
        product.inWishlist = false;
        copiedState.wishlist = copiedState.wishlist.filter(
          (itmId) => itmId !== id
        );
      }

      return copiedState;
    }

    case "toggleWishlist": {
      const copiedState = structuredClone(state);

      const id = action.product.id;
      const product = copiedState.productList[id];

      if (product == null) {
        // product not saved ==> add
        const copiedProduct = structuredClone(action.product);

        copiedProduct.inWishlist = true;
        copiedProduct.inCart = 0;

        copiedState.productList[id] = copiedProduct;
        copiedState.wishlist.push(id);
      } else if (!product.inWishlist) {
        // product saved, but not in wishlist yet  ==> add
        product.inWishlist = true;

        copiedState.wishlist.push(id);
      } else {
        // product saved, in wishlist ==> remove
        product.inWishlist = false;
        copiedState.wishlist = copiedState.wishlist.filter(
          (itmId) => itmId !== id
        );
      }

      return copiedState;
    }

    case "addToCart": {
      const copiedState = structuredClone(state);

      const id = action.product.id;
      const product = copiedState.productList[id];

      if (product == null) {
        // product not state
        const copiedProduct = structuredClone(action.product);

        copiedProduct.inWishlist = false;
        copiedProduct.inCart = 1;

        copiedState.productList[id] = copiedProduct;
        copiedState.cart.push(id);
        copiedState.cartItems++;
      } else if (!product.inCart) {
        // product saved, but not in cart yet
        product.inCart = 1;

        copiedState.cart.push(id);
        copiedState.cartItems++;
      } else {
        // product saved and in cart yet
        product.inCart++;
        copiedState.cartItems++;
      }

      return copiedState;
    }

    case "addMultipleToCart": {
      const copiedState = structuredClone(state);

      const id = action.product.id;
      const product = copiedState.productList[id];

      if (product == null) {
        // product not saved
        const copiedProduct = structuredClone(action.product);

        copiedProduct.inWishlist = false;
        copiedProduct.inCart = action.count;

        copiedState.productList[id] = copiedProduct;
        copiedState.cart.push(id);
        copiedState.cartItems += action.count;
      } else if (!product.inCart) {
        // product saved, but not in cart yet
        product.inCart = action.count;

        copiedState.cart.push(id);
        copiedState.cartItems += action.count;
      } else {
        // product saved and in cart yet
        product.inCart += action.count;
        copiedState.cartItems += action.count;
      }

      return copiedState;
    }
  }
}

export default savedProductsReducer;
