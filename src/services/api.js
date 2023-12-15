import axios from 'axios';
const BASE_URL = 'https://gooddevil79.github.io/data/db.json';
export const getFoods = async function () {
  const response = await axios.get(`${BASE_URL}`);
  return response.data.foods;
};
export const addToFav = function (foods, id) {
  const item = foods.find(food => food.id === id);
  const favArr = JSON.parse(localStorage.getItem('favoriteItems'));
  if (favArr) {
    const existingItem = favArr.find(food => food.id === id);

    if (existingItem) {
      const filteredFavArr = favArr.filter(food => food.id !== existingItem.id);
      localStorage.setItem('favoriteItems', JSON.stringify(filteredFavArr));
    } else {
      favArr.push(item);
      localStorage.setItem('favoriteItems', JSON.stringify(favArr));
    }
  } else {
    localStorage.setItem('favoriteItems', JSON.stringify([item]));
  }
};
export const addToCart = async function (cart, newItem) {};
