import { Grid, Paper } from '@mui/material';
import React from 'react';
import FavoriteItem from './FavoriteItem';

const FavoriteList = props => {
  const favArr = JSON.parse(localStorage.getItem('favoriteItems'));
  return (
    <>
      <h3>علاقه مندی ها :</h3>
      {favArr ? (
        <div>
          <Grid container spacing={1}>
            {favArr.map(food => {
              return <FavoriteItem food={food} />;
            })}
          </Grid>
        </div>
      ) : (
        <p>موردی یافت نشد</p>
      )}
    </>
  );
};

export default FavoriteList;
