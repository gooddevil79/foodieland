import React, { useContext, useState } from 'react';
// mui
import { Box, Container, Grid, Paper, Tab } from '@mui/material';
// context
import CartContext from '../store/cart-context';
import ShoppingCartItem from '../components/cart/ShoppingCartItem';
import FoodsContext from '../store/foods-context';
// css
import classes from './ShoppingCart.module.css';
import FavoriteList from '../components/cart/FavoriteList';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import OrderForm from '../components/cart/OrderForm';
// assets
import toomanSVG from '../assets/img/tooman.svg';

//////////////////////////

const ShoppingCart = props => {
  const [value, setValue] = React.useState('order');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const cartCtx = useContext(CartContext);
  const foodsCtx = useContext(FoodsContext);
  let content = <p>سبد خرید شما خالی میباشد</p>;
  if (cartCtx.items.length > 0) {
    content = cartCtx.items.map(item => {
      return <ShoppingCartItem item={item} key={item.id} />;
    });
  }
  const totalAmount = cartCtx.totalAmount.toLocaleString();
  return (
    <div>
      <Container
        sx={{
          maxWidth: '1450px !important',
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 5 }}>
            <TabList
              onChange={handleChange}
              aria-label="Food category"
              sx={{
                mx: 'auto',
                '& button': { color: 'crimson', fontFamily: 'YekanP' },
                '& .MuiTab-root.Mui-selected': {
                  color: 'crimson',
                },
              }}
              TabIndicatorProps={{
                style: {
                  backgroundColor: 'crimson',
                },
              }}
            >
              <Tab label="سفارش" value="order" disableRipple />
              <Tab label="لیست علاقه مندی" value="favorites" disableRipple />
            </TabList>
          </Box>

          <TabPanel value={'order'} index={0}>
            <Grid
              container
              spacing={2}
              justifyContent={'center'}
              alignItems={'stretch'}
            >
              <Grid item xs={12} md={6}>
                <Paper sx={{ width: '100%' }}>
                  <h3>سبد خرید شما:</h3>
                  <div>
                    <Box className={classes.ShoppingCartContainer}>
                      {content}
                    </Box>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ width: '100%', height: '100%' }}>
                  <h3> ثبت سفارش :</h3>
                  <div className={classes.ShoppingCartDetials}>
                    <div>
                      <p>
                        {`قیمت کالاها (${cartCtx.items.length}) : ${totalAmount}`}
                      </p>
                    </div>
                    <div className={classes.ShoppingCartDetialsSumPrice}>
                      <p>جمع سبد خرید :{totalAmount}</p>
                      <img src={toomanSVG} alt="tooman" />
                    </div>
                  </div>
                  <div className={classes.ShoppingCartOrderForm}>
                    <OrderForm />
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={'favorites'} index={1}>
            <FavoriteList foods={foodsCtx.foods} />
          </TabPanel>
        </TabContext>
      </Container>
    </div>
  );
};

export default ShoppingCart;
