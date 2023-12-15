// Router
import { useNavigate } from 'react-router-dom';
// MUI
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useContext } from 'react';
// assets
import toomanSVG from '../../assets/img/tooman.svg';
// importing context
import FoodsContext from '../../store/foods-context';
// CSS
import classes from './Favorite.module.css';
// /
// react confirm modal

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { addToFav } from '../../services/api';
import { priceFormatingToLocale } from '../../helper/priceToLocal';

const FavoriteItem = ({ food }) => {
  const onRemoveHandler = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Paper elevation={4} sx={{ width: '290px', padding: '10px' }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'IranSans',
                fontSize: '20px',
                fontWeight: '900',
              }}
            >
              حذف از لیست
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: 'IranSans' }}>
              آیا مایل به حذف هستید؟
            </Typography>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Button onClick={onClose} color="warning" variant="contained">
                انصراف
              </Button>
              <Button
                onClick={() => {
                  addToFav(foodsCtx.foods, food.id);
                  foodsCtx.addToFav(food.id);
                  onClose();
                }}
                color="error"
                variant="contained"
              >
                بله
              </Button>
            </Box>
          </Paper>
        );
      },
    });
  };

  const foodsCtx = useContext(FoodsContext);
  const navigate = useNavigate();
  // const onRemoveHandler = function () {};
  const onAddToCartHandler = function () {
    // navigate to user to details page
    navigate('/resturante/' + food.id);
  };
  return (
    <Grid key={food.id} item xs={12} md={4}>
      <Paper elevation={3} className={classes.FavoriteItem}>
        <div className={classes.FavoriteItemImage}>
          <img src={food.image} alt="food image" />
        </div>
        <div className={classes.FavoriteItemText}>
          <h3>{food.foodName}</h3>
          <h2>
            {priceFormatingToLocale(food.price)}

            <img src={toomanSVG} alt="تومان" />
          </h2>
        </div>
        <div className={classes.favoriteItemAction}>
          <Button color="error" variant="outlined" onClick={onRemoveHandler}>
            <DeleteIcon />
            حذف
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={onAddToCartHandler}
          >
            <AddShoppingCartIcon />
            افزودن به سبد
          </Button>
        </div>
      </Paper>
    </Grid>
  );
};

export default FavoriteItem;
