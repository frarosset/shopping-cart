function getPriceStr(price, currency = "€") {
  const numOfDigits = Number.isInteger(price) ? 0 : 2;
  const priceStr = price.toFixed(numOfDigits);

  return `${priceStr} ${currency}`;
}

function toFixedNumber(num, digits) {
  const pow = Math.pow(10, digits);
  return Math.round(num * pow) / pow;
}

function getDiscountValue(price, discount) {
  return toFixedNumber((price * discount) / 100, 2);
}

function getDiscountedPrice(price, discount) {
  return price - getDiscountValue(price, discount);
}

function getProductInCartDiscountedValue(price, inCart, discountPercentage) {
  // Total value of a given item in the cart (with disocunt applied), taking into account the number of items
  return getDiscountedPrice(price, discountPercentage) * inCart;
}

function getCartValue(cart) {
  // Total value of the items in the cart (without disocunt applied)
  return cart.reduce((tot, { price, inCart }) => tot + price * inCart, 0);
}

function getCartDiscountValue(cart) {
  // Total discount value of the items in the cart
  return cart.reduce(
    (tot, { price, inCart, discountPercentage }) =>
      tot + getDiscountValue(price, discountPercentage) * inCart,
    0
  );
}

function getShippingFee(subtotal, baseShippingFee, freeShippingAt) {
  return subtotal && subtotal < freeShippingAt ? baseShippingFee : 0;
}

function getToAddForFreeShipping(subtotal, freeShippingAt) {
  return subtotal < freeShippingAt ? freeShippingAt - subtotal : 0;
}

function getCartSummary(cart, baseShippingFee, freeShippingAt) {
  const cartValue = getCartValue(cart);
  const cartDiscountValue = getCartDiscountValue(cart);

  const cartSubtotal = cartValue - cartDiscountValue;
  const shippingFee = getShippingFee(
    cartSubtotal,
    baseShippingFee,
    freeShippingAt
  );
  const cartTotal = cartSubtotal + shippingFee;

  const toAddForFreeShipping = getToAddForFreeShipping(
    cartSubtotal,
    freeShippingAt
  );

  return {
    cartValue,
    cartDiscountValue,
    cartSubtotal,
    shippingFee,
    cartTotal,
    toAddForFreeShipping,
  };
}

export {
  getPriceStr,
  getDiscountedPrice,
  getProductInCartDiscountedValue,
  getCartValue,
  getDiscountValue,
  getCartDiscountValue,
  getShippingFee,
  getCartSummary,
  getToAddForFreeShipping,
};
