export function formatPrice(price) {
  if (price === null || price === undefined) return '';
  return `Rs. ${price.toLocaleString('en-IN')}`;
}

export function formatPriceCompact(price) {
  if (price === null || price === undefined) return '';
  if (price >= 100000) return `Rs. ${(price / 100000).toFixed(1)}L`;
  if (price >= 1000) return `Rs. ${(price / 1000).toFixed(1)}K`;
  return `Rs. ${price}`;
}
