import React, { useContext } from 'react';
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  CardMedia,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
// icons
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
// context
import FoodsContext from '../../store/foods-context';
import CartContext from '../../store/cart-context';
import { isInCart } from '../../helper/isInCartHelper';
import { Add, DeleteForever, Remove } from '@mui/icons-material';
import classes from './FoodItem.module.css';
import getAmountItem from '../../helper/getAmountItem-helper';
import { Link } from 'react-router-dom';
import toomanSvg from '../../assets/img/tooman.svg';
import { addToFav } from '../../services/api';
// ///////

const FoodItem = function (props) {
  const foodsCtx = useContext(FoodsContext);
  const cartCtx = useContext(CartContext);
  // check if current item is in favorite list or not
  const favoriteItems = JSON.parse(localStorage.getItem('favoriteItems'));
  // if it exist, then icon will change
  const itemExist = favoriteItems?.find(food => food.id === props.id);

  const likeHandler = function () {
    addToFav(foodsCtx.foods, props.id);
    foodsCtx.addToFav(props.id);
  };
  const onAddItemHandler = function () {
    const addedItem = {
      id: props.id,
      foodName: props.foodName,
      price: props.price,
      amount: 1,
      image: props.image,
    };
    cartCtx.addToCart(addedItem);
  };
  const onRemoveItemHandler = function () {
    cartCtx.removeFromCart(props.id);
  };

  const ingredientsText = props.ingredients.join('، ');
  const priceLocaleFormatted = props.price.toLocaleString('fa');
  return (
    <Paper sx={{ width: 360, overflow: 'hidden' }} elevation={4}>
      <CardActionArea>
        <Link to={`/resturante/${props.id}`} className={classes.foodItem}>
          <CardMedia
            component="img"
            height="140"
            image={props.image}
            alt="foodImage"
          />
          <Box sx={{ padding: '10px' }}>
            <div className={classes.foodItemHeader}>
              <Typography
                gutterBottom
                variant="h4"
                sx={{
                  textAlign: 'right',
                  fontFamily: 'YekanP',
                  color: 'crimson',
                  fontSize: '20px',
                  fontWeight: '900',
                }}
              >
                {props.foodName}
              </Typography>
              <div className={classes.foodItemPrice}>
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: 'right',
                    fontFamily: 'IranSans',
                    color: '#444',
                    fontSize: '25px',
                  }}
                >
                  {/* {props.price} */}
                  {priceLocaleFormatted}
                </Typography>

                <div>
                  <img src={toomanSvg} alt="تومان" />
                </div>
              </div>
            </div>
            <Typography
              variant="body2"
              color="InactiveCaptionText"
              className={classes.foodItemIngredients}
            >
              {ingredientsText}
            </Typography>
          </Box>
        </Link>
      </CardActionArea>

      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {!isInCart(cartCtx.items, props.id) ? (
          <Button
            size="large"
            sx={{
              ml: 'auto',
              fontSize: '16px',
              fontWeight: '700',
              width: '150px',
              color: 'crimson',
              fontFamily: 'IranSans',
              boxShadow: '0px 0px 1px 1px ',
              borderRadius: '50px',
            }}
            onClick={onAddItemHandler}
          >
            افزودن
          </Button>
        ) : (
          <Box className={classes.foodItemAction}>
            <Paper sx={{ borderRadius: '100px' }} onClick={onAddItemHandler}>
              <IconButton color="error" aria-label="add to shopping cart">
                <Add />
              </IconButton>
            </Paper>
            <h2>{getAmountItem(props.id, cartCtx.items)}</h2>
            <Paper sx={{ borderRadius: '100px' }} onClick={onRemoveItemHandler}>
              <IconButton color="error" aria-label="remove from shopping cart">
                {getAmountItem(props.id, cartCtx.items) > 1 && <Remove />}
                {getAmountItem(props.id, cartCtx.items) === 1 && (
                  <DeleteForever />
                )}
              </IconButton>
            </Paper>
          </Box>
        )}
        <Box>
          <IconButton
            size="large"
            sx={{ color: 'crimson' }}
            onClick={likeHandler}
          >
            {!itemExist ? <FavoriteBorderIcon /> : <FavoriteIcon />}
          </IconButton>
        </Box>
      </CardActions>
    </Paper>
  );
};

export default FoodItem;
