import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import classes from './SearchFoods.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  color: 'red',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'crimson',
  '& input::placeholder': { color: 'crimson', fontFamily: 'IranSans' },
  direction: 'rtl',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    fontFamily: 'IranSans',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const SearchFoods = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const onSearchHandler = function (e) {
    e.preventDefault();
    navigate('/search/' + inputValue);
    setInputValue('');
  };
  const onChangeInputHandler = function (e) {
    setInputValue(e.target.value);
  };
  return (
    <>
      <Search className={classes.search}>
        <form onSubmit={onSearchHandler}>
          <IconButton
            aria-label="delete"
            type="submit"
            size="medium"
            sx={{ color: 'crimson' }}
          >
            <SearchIcon />
          </IconButton>
          <StyledInputBase
            placeholder="چی مِخورری؟"
            inputProps={{ 'aria-label': 'search' }}
            value={inputValue}
            onChange={onChangeInputHandler}
          />
        </form>
      </Search>
    </>
  );
};

export default SearchFoods;
