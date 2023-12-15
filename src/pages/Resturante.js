import React, { useContext, useState } from 'react';
// context
import FoodsContext from '../store/foods-context';
// components mui
import { TabContext, TabList } from '@mui/lab';
import {
  Box,
  CircularProgress,
  Container,
  Dialog,
  Grid,
  Tab,
  Tabs,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
// components
import FoodItem from '../components/foods/FoodItem';
// importing assets
import PersianImg from './../assets/img/aash.png';
import KebabImg from './../assets/img/kabab.png';
import SaladImg from './../assets/img/salad.png';
import InternationalImg from './../assets/img/sooshi.png';
import FastFoodImg from './../assets/img/pitza.png';
import SeaFoodImg from './../assets/img/ghezmahi.jpg';
import sodaImg from './../assets/img/drinks.png';

const Resturante = () => {
  const foodCtx = useContext(FoodsContext);
  const [value, setValue] = useState('persian');
  // const [filteredFoods, setFilteredFoods] = useState([]);
  const handleChange = function (e, newValue) {
    setValue(newValue);
  };
  let tabContent = foodCtx.foods.map(item => {
    if (item.category === value) {
      return (
        <Grid
          item
          container
          justifyContent="center"
          key={item.id}
          xs={12}
          sm={6}
          md={4}
        >
          <FoodItem
            id={item.id}
            isFavorite={item.favorite}
            foodName={item.foodName}
            ingredients={item.ingredients}
            image={item.image}
            price={item.price}
          />
        </Grid>
      );
    }
  });

  return (
    <div>
      <Container>
        {foodCtx?.foods.length === 0 ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress color="warning" sx={{ margin: '10px auto' }} />
          </Box>
        ) : (
          <>
            {/* // <TabContext value={value}> */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                borderBottom: 1,
                borderColor: 'divider',
                mt: 5,
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Food category"
                variant="scrollable"
                centered
                scrollButtons="false"
                allowScrollButtonsMobile={true}
                TabScrollButtonProps={{
                  direction: 'rtl',
                }}
                sx={{
                  direction: 'rtl',
                  mx: 'auto',
                  '& button': { color: 'crimson', fontFamily: 'YekanP' },
                  '& .MuiTab-root.Mui-selected': {
                    color: 'crimson',
                  },
                  overflow: 'scrollY',
                }}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: 'crimson',
                  },
                }}
              >
                <Tab
                  label="ایرانی"
                  value="persian"
                  icon={<Avatar alt="test avatar" src={PersianImg} />}
                  disableRipple
                />
                <Tab
                  label="فست فود"
                  value="fastfood"
                  icon={<Avatar alt="test avatar" src={FastFoodImg} />}
                  disableRipple
                />
                <Tab
                  label="کباب"
                  value="kebab"
                  icon={<Avatar alt="test avatar" src={KebabImg} />}
                  disableRipple
                />
                <Tab
                  label="سالاد"
                  value="salad"
                  icon={<Avatar alt="test avatar" src={SaladImg} />}
                  disableRipple
                />
                <Tab
                  label="دریایی"
                  value="seafood"
                  icon={<Avatar alt="test avatar" src={SeaFoodImg} />}
                  disableRipple
                />
                <Tab
                  label="بین المللی"
                  value="international"
                  icon={<Avatar alt="test avatar" src={InternationalImg} />}
                  disableRipple
                />
                <Tab
                  label="نوشیدنی"
                  value="drinks"
                  icon={<Avatar alt="test avatar" src={sodaImg} />}
                  disableRipple
                />
              </Tabs>
            </Box>

            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ mt: '10px' }}
            >
              {tabContent}
            </Grid>
            {/* </TabContext> */}
          </>
        )}
      </Container>
    </div>
  );
};

export default Resturante;
