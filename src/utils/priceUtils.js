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

export { getPriceStr, getDiscountedPrice, getCartValue, getDiscountValue };
