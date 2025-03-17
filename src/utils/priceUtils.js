function getPriceStr(price, currency = "€") {
  const numOfDigits = Number.isInteger(price) ? 0 : 2;
  const priceStr = price.toFixed(numOfDigits);

  return `${priceStr} ${currency}`;
}

function getDiscountedPrice(price, discount) {
  return price * (1 - discount / 100);
}

export { getPriceStr, getDiscountedPrice };
