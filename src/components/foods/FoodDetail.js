import React, { useContext } from 'react';
import FoodsContext from '../../store/foods-context';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import toomanSvg from '../../assets/img/tooman.svg';
import classes from './FoodDetail.module.css';
import { Add, DeleteForever, Remove } from '@mui/icons-material';
import { isInCart } from '../../helper/isInCartHelper';
import CartContext from '../../store/cart-context';
import getAmountItem from '../../helper/getAmountItem-helper';
import { priceFormatingToLocale } from '../../helper/priceToLocal';
const FoodDetail = props => {
  const { foodId } = props;
  const foodsCtx = useContext(FoodsContext);
  const selectedFood = foodsCtx.foods.find(food => {
    return food.id == foodId;
  });
  const cartCtx = useContext(CartContext);
  const onAddItemHandler = function () {
    const addedItem = {
      id: selectedFood.id,
      foodName: selectedFood.foodName,
      price: selectedFood.price,
      amount: 1,
      image: selectedFood.image,
    };
    cartCtx.addToCart(addedItem);
  };
  const onRemoveItemHandler = function () {
    cartCtx.removeFromCart(selectedFood.id);
  };
  return (
    <Container>
      <Box>
        <Grid
          container
          spacing={1}
          sx={{
            marginTop: '30px',
            height: '300px',
          }}
        >
          <Grid item xs={12} md={5}>
            <Paper elevation={2} className={classes.foodImage}>
              <img src={selectedFood.image} alt={selectedFood.foodName} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={7}>
            <Paper className={classes.foodTextDetils}>
              <Typography variant="h4">{selectedFood.foodName}</Typography>
              <Typography variant="body1">
                {selectedFood.ingredients.join('، ')}
              </Typography>
              <Paper
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {/* <Box>
                <IconButton
                  size="large"
                  sx={{ color: 'crimson' }}
                  // onClick={likeHandler}
                >
                  {!itemExist ? <FavoriteBorderIcon /> : <FavoriteIcon />}
                </IconButton>
              </Box> */}
              </Paper>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  justifyContent: 'space-between',
                  marginTop: '50px',
                }}
              >
                <div className={classes.actionCenterPice}>
                  <Typography variant="h5" sx={{ fontFamily: 'IranSans' }}>
                    {priceFormatingToLocale(selectedFood.price)}
                  </Typography>
                  <img src={toomanSvg} alt="تومان" />
                </div>

                {!isInCart(cartCtx.items, selectedFood.id) ? (
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
                    <Paper
                      sx={{ borderRadius: '100px' }}
                      onClick={onAddItemHandler}
                    >
                      <IconButton
                        color="error"
                        aria-label="add to shopping cart"
                      >
                        <Add />
                      </IconButton>
                    </Paper>
                    <h2>{getAmountItem(selectedFood.id, cartCtx.items)}</h2>
                    <Paper
                      sx={{ borderRadius: '100px' }}
                      onClick={onRemoveItemHandler}
                    >
                      <IconButton
                        color="error"
                        aria-label="remove from shopping cart"
                      >
                        {getAmountItem(selectedFood.id, cartCtx.items) > 1 && (
                          <Remove />
                        )}
                        {getAmountItem(selectedFood.id, cartCtx.items) ===
                          1 && <DeleteForever />}
                      </IconButton>
                    </Paper>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default FoodDetail;
