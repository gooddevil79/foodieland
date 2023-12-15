const getAmountItem = function (id, list) {
  const item = list.find(food => food.id === id);
  return item.amount;
};
export default getAmountItem;
