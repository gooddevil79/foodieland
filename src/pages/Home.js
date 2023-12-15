// components
import React, { useContext } from 'react';
import FoodsContext from '../store/foods-context';
import { Container, Grid, Typography } from '@mui/material';

import FoodItem from '../components/foods/FoodItem';

// main code
const Home = () => {
  // getting foods list items from context
  const foodsCtx = useContext(FoodsContext);
  return (
    <div>
      <Container>
        <Typography variant="h4" textAlign={'right'}>
          دسته بندی ها
        </Typography>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={5}
          marginTop={5}
        >
          {foodsCtx.foods.map(item => {
            return (
              <Grid item key={item.id}>
                <FoodItem
                  id={item.id}
                  price={item.price}
                  isFavorite={item.favorite}
                  foodName={item.foodName}
                  ingredients={item.ingredients}
                  image={item.image}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
