export const priceFormatingToLocale = function (price) {
  const formattedPrice = price.toLocaleString('fa');
  return formattedPrice;
};
