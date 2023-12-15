import { getFoods } from '../services/api';
import FoodsContext from './foods-context';
import { useState, useEffect, useReducer } from 'react';
// const DUMMY_DATA = [
//
// ];
const foodsReducer = function (state, action) {
  if (action.type === 'FETCH_FOODS') {
    const fetchedFoods = action.foods;
    return { foods: fetchedFoods };
  }
  if (action.type === 'ADD_TO_FAV') {
    let updatedFood;
    let updatedFoods;
    // getting certain item index
    const favoriteItemIndex = state.foods.findIndex(
      item => item.id === action.id
    );
    // getting item itself and overwirte it with shallow copy
    const favoriteItem = state.foods[favoriteItemIndex];
    updatedFood = {
      ...favoriteItem,
      favorite: !favoriteItem.favorite,
    };
    updatedFoods = [...state.foods];
    updatedFoods[favoriteItemIndex] = updatedFood;
    return {
      foods: updatedFoods,
    };
  }
  return state;
};
const initialState = {
  foods: [],
};
const FoodsContextProvider = function (props) {
  // const [foods, setFoods] = useState([]);
  const [foodsState, dispatchFoodsState] = useReducer(
    foodsReducer,
    initialState
  );
  const addToFavoriteHandler = function (id) {
    dispatchFoodsState({ type: 'ADD_TO_FAV', id: id });
  };
  const fetchFoodsHandler = function (foods) {
    dispatchFoodsState({ type: 'FETCH_FOODS', foods: foods });
  };
  useEffect(() => {
    const fetchData = async function () {
      const data = await getFoods();
      // setFoods(data);
      fetchFoodsHandler(data);
    };
    fetchData();
  }, []);
  // making context value readable by using this object
  const contextValue = {
    foods: foodsState.foods,
    addToFav: addToFavoriteHandler,
    setFoods: fetchFoodsHandler,
  };
  return (
    <FoodsContext.Provider value={contextValue}>
      {props.children}
    </FoodsContext.Provider>
  );
};

export default FoodsContextProvider;
