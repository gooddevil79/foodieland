import React, { useContext } from 'react';
import { AppBar, Badge, Box, Grid } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { Link, NavLink, Outlet } from 'react-router-dom';
import classes from './RootLayOut.module.css';
// َassets

import shoppingCartIcon from '../assets/img/cart.png';
import burgurIcon from '../assets/img/burgur.png';
import CartContext from '../store/cart-context';
// import BreadCrumbs from '../components/breadCrumbs/BreadCrumbs';

import SearchModal from '../components/UI/searchModal';

import Footer from '../components/footer/Footer';
import SearchFoods from '../components/foods/SearchFoods';

// /////////////////////////

const RootLayOut = function () {
  const cartCtx = useContext(CartContext);
  const itemAmount = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  return (
    <div className="root-layout">
      <header>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            sx={{ position: 'fixed', left: '0px', top: '0px' }}
            className={classes.nav}
          >
            <Toolbar>
              <Grid
                container
                className={classes.menu}
                justifyContent={'center'}
                alignItems={'baseline'}
                sx={{
                  marginTop: '5px',
                  border: '2px solid',
                }}
              >
                <Grid item xs={6}>
                  <NavLink to="/shopping-cart" className={classes.navAction}>
                    <Badge color="error" badgeContent={itemAmount}>
                      <img src={shoppingCartIcon} alt="cart" />
                    </Badge>
                    <p>سبد خرید</p>
                  </NavLink>
                </Grid>
                <Grid item xs={6}>
                  <NavLink to="/" className={classes.navAction}>
                    <img src={burgurIcon} alt="cart" />
                    <p>رستوران</p>
                  </NavLink>
                </Grid>
              </Grid>
              <SearchFoods />
              <SearchModal />
            </Toolbar>
          </AppBar>
        </Box>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayOut;
