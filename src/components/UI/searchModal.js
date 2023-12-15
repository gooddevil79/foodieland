import React, { useRef, useState } from 'react';
import classes from './searchModal.module.css';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { Box, Button, IconButton, Paper, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchModal = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef();
  const onChangeInputHandler = function (e) {
    console.log(e.target.value);
    setInputValue(e.target.value);
  };
  const onSearchHandler = function () {
    // e.preventDefault();
    const searchedInput = inputRef.current.value;
    console.log(searchedInput);
    navigate('/search/' + searchedInput);
    // setInputValue('');
    inputRef.current.value = '';
  };
  const onOpenSearchModal = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Paper elevation={4} sx={{ maxWidth: '290px', padding: '10px' }}>
            <Box className={classes.searchForm}>
              <input ref={inputRef} placeholder="چی مِخورری؟" />
              <Button
                type="button"
                color="error"
                variant="contained"
                sx={{
                  fontFamily: 'IranSans',
                }}
                onClick={() => {
                  onSearchHandler();
                  onClose();
                }}
              >
                جست و جو
              </Button>
            </Box>
          </Paper>
        );
      },
    });
  };
  return (
    <IconButton
      aria-label="delete"
      type="submit"
      size="medium"
      sx={{ color: 'crimson' }}
      className={classes.searchMobile}
      onClick={onOpenSearchModal}
    >
      <SearchIcon />
    </IconButton>
  );
};

export default SearchModal;
