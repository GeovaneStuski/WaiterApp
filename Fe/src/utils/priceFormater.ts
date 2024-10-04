export function priceFormater(price: number) {
  return Number.isInteger(price)
    ? `R$ ${price},00`
    : `R$ ${String(price?.toFixed(2)).replace('.', ',')}`;
}
