import React, { useContext } from 'react';
// context
import CartContext from '../../store/cart-context';
// css
import classes from './ShoppingCart.module.css';
// mui
import { Add, DeleteForever, Remove } from '@mui/icons-material';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// assets
import toomanSVG from '../../assets/img/tooman.svg';
import { priceFormatingToLocale } from '../../helper/priceToLocal';
// ///////////////

const ShoppingCartItem = props => {
  const cartCtx = useContext(CartContext);
  const onAddHandler = function () {
    cartCtx.addToCart(props.item);
  };
  const onRemoveHandler = function () {
    cartCtx.removeFromCart(props.item.id, 'cart');
  };
  const price = props.item.price;
  return (
    <Box key={props.item.id} sx={{ direction: 'rtl' }}>
      <Paper className={classes.shoppingCartItem} elevation={5}>
        <div className={classes.shoppingCartItemImage}>
          <img src={props.item.image} alt="food" />
        </div>
        <div className={classes.shoppingCartItemText}>
          <h2>{props.item.foodName}</h2>
          <h3 className={classes.shoppingCartItemPrice}>
            {priceFormatingToLocale(price)}

            <img src={toomanSVG} alt="تومان" />
          </h3>
        </div>
        <div className={classes.shoppingCartItemAction}>
          <Paper
            sx={{ borderRadius: '100px' }}
            onClick={onAddHandler}
            elevation={3}
          >
            <IconButton color="error" aria-label="add to shopping cart">
              <Add />
            </IconButton>
          </Paper>
          <Typography variant="h5" sx={{ fontFamily: 'YekanP', width: '20px' }}>
            {`  ${props.item.amount}`}
          </Typography>
          <Paper
            sx={{ borderRadius: '100px' }}
            onClick={onRemoveHandler}
            elevation={3}
          >
            <IconButton
              color="error"
              aria-label="remove from shopping cart"
              onCLick={onRemoveHandler}
            >
              {props.item.amount > 1 && <Remove />}
              {props.item.amount == 1 && <DeleteForever />}
            </IconButton>
          </Paper>
        </div>
      </Paper>
    </Box>
  );
};

export default ShoppingCartItem;
