function getPriceStr(price, currency = "€") {
  const numOfDigits = Number.isInteger(price) ? 0 : 2;
  const priceStr = price.toFixed(numOfDigits);

  return `${priceStr} ${currency}`;
}

export { getPriceStr };
