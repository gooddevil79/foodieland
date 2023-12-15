import React, { useContext } from 'react';
import FoodsContext from '../store/foods-context';
import { useParams } from 'react-router-dom';
import FoodItem from '../components/foods/FoodItem';
import { Box, CircularProgress, Container, Grid } from '@mui/material';

const SearchedContent = () => {
  const foodCtx = useContext(FoodsContext);
  const params = useParams();
  //   filter foods based segment in url
  const filteredFoods = foodCtx.foods.filter(food => {
    return food.foodName.includes(params.searchWord);
  });
  if (filteredFoods.length === 0) {
    return <p>غذایی یافت نشد</p>;
  }
  return (
    <Container sx={{ paddingTop: '30px' }}>
      <p>نتایج:</p>
      <Grid container justifyContent={'center'}>
        {filteredFoods.length === 0 ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress color="warning" />
          </Box>
        ) : (
          filteredFoods.map(food => {
            return (
              <Grid item key={food.id} xs={12} md={4}>
                <FoodItem
                  id={food.id}
                  isFavorite={food.favorite}
                  foodName={food.foodName}
                  ingredients={food.ingredients}
                  image={food.image}
                  price={food.price}
                />
              </Grid>
            );
          })
        )}
      </Grid>
    </Container>
  );
};

export default SearchedContent;
