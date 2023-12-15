import React from 'react';

const FoodsContext = React.createContext({
  foods: [],
  setFoods: () => {},
  addToFav: () => {},
});
export default FoodsContext;
