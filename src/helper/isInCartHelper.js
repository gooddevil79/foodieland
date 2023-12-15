export const isInCart = function (items, id) {
  const result = !!items.find(item => item.id === id);
  return result;
};
