function getPriceStr(price, currency = "€") {
  const numOfDigits = Number.isInteger(price) ? 0 : 2;
  const priceStr = price.toFixed(numOfDigits);

  return `${priceStr} ${currency}`;
}

function getDiscountValue(price, discount) {
  return (price * discount) / 100;
}

function getDiscountedPrice(price, discount) {
  return price * (1 - discount / 100);
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

  return {
    cartValue,
    cartDiscountValue,
    cartSubtotal,
    shippingFee,
    cartTotal,
  };
}

export {
  getPriceStr,
  getDiscountedPrice,
  getCartValue,
  getDiscountValue,
  getCartDiscountValue,
  getShippingFee,
  getCartSummary,
  getToAddForFreeShipping,
};
