import React, { useContext } from 'react';
// react toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React Hook Form
import { useForm } from 'react-hook-form';
// MUI
import {
  Button,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
// css
import classes from './OrderForm.module.css';
// context
import CartContext from '../../store/cart-context';
// ///////////

const OrderForm = () => {
  const cartCtx = useContext(CartContext);
  const notify = status => {
    if (status) {
      toast.success('سفارش شما ثبت شد :)', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        className: 'toast-styles',
      });
    } else {
      toast.error('سبد خرید شما خالی است', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        className: 'toast-styles',
      });
    }
  };
  // toastify
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmitHandler = function (formData) {
    if (cartCtx.items.length === 0) {
      notify(false);
    } else if (cartCtx.items.length > 0) {
      notify(true);
    }
    cartCtx.clearAll();
    reset({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      description: null,
      phone: '',
    });
  };

  const theme = createTheme({
    direction: 'rtl',
  });
  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <Grid
          container
          justifyContent={'center'}
          alignItems={'center'}
          spacing={2}
        >
          <Grid item xs={12} md={6}>
            <TextField
              id="standard-basic"
              label="نام"
              variant="filled"
              fullWidth
              type="text"
              sx={{
                '& label': {
                  right: '20px',
                  left: 'unset',
                  transformOrigin: 'right',
                  fontSize: '0.8rem',
                },
              }}
              {...register('firstName', {
                required: 'لطفا نام خود را وارد کنید',
                minLength: {
                  value: 3,
                  message: 'حداقل سه حرف باید باشد',
                },
                validate: value => {
                  if (isNaN(value.trim())) {
                  } else {
                    return 'باید حروف باشد';
                  }
                },
              })}
              helperText={
                errors.firstName &&
                // <Typography variant="subtitle2" color="error">
                errors.firstName.message
                // </Typography>
              }
            />
            {/* {errors.firstName && (
              <Typography variant="subtitle2" color="error">
                {errors.firstName.message}
              </Typography>
            )} */}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="standard-basic"
              label="نام خانوداگی"
              variant="filled"
              fullWidth
              type="text"
              sx={{
                '& label': {
                  right: '20px',
                  left: 'unset',
                  transformOrigin: 'right',
                  fontSize: '0.8rem',
                },
              }}
              {...register('lastName', {
                required: 'لطفا نام خانوادگی خود را وارد کنید',
                minLength: {
                  value: 3,
                  message: 'حداقل سه حرف باید باشد',
                },
                validate: value => {
                  if (isNaN(value.trim())) {
                  } else {
                    return 'باید حروف باشد';
                  }
                },
              })}
              helperText={
                errors.lastName &&
                // <Typography variant="subtitle2" color="error">
                errors.lastName.message
                // {/* </Typography> */}
              }
            />
            {/* {errors.lastName && (
              <Typography variant="subtitle2" color="error">
                {errors.lastName.message}
              </Typography>
            )} */}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="standard-basic"
              label="شماره تلفن"
              type="tel"
              variant="filled"
              fullWidth
              sx={{
                '& label': {
                  right: '20px',
                  left: 'unset',
                  transformOrigin: 'right',
                  fontSize: '0.8rem',
                },
              }}
              {...register('phone', {
                required: 'شماره خود را وارد کنید',
                minLength: {
                  value: 11,
                  message: 'شماره تلفن باید 11 رقم باشد',
                },
                maxLength: {
                  value: 11,
                  message: 'شماره تلفن باید حداکثر 11 رقمی  باشد',
                },
              })}
              helperText={
                errors.phone &&
                // <Typography variant="subtitle2" color="error">
                errors.phone.message
                // {/* </Typography> */}
              }
            />
            {/* {errors.phone && (
              <Typography variant="subtitle2" color="error">
                {errors.phone.message}
              </Typography>
            )} */}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="standard-basic"
              label="ایمیل "
              type="email"
              variant="filled"
              fullWidth
              sx={{
                '& label': {
                  left: 'unset',
                  right: '20px',
                  transformOrigin: 'right',
                  fontSize: '0.8rem',
                },
              }}
              {...register('email', {
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: 'ایمیل نا معتبر است',
                },
              })}
              helperText={
                errors.email &&
                // <Typography variant="subtitle2" color="error">
                errors.email.message
                /* </Typography> */
              }
            />

            {/* {errors.email && (
              <Typography variant="subtitle2" color="error">
                {errors.email.message}
              </Typography>
            )} */}
          </Grid>
          <Grid item xs={12}>
            {/* <ThemeProvider theme={theme}> */}
            <div dir="rtl">
              <TextField
                id="outlined-multiline-static"
                variant="filled"
                label="آدرس"
                multiline
                fullWidth
                sx={{
                  '& label': {
                    left: 'unset',
                    right: '20px',
                    transformOrigin: 'right',
                    fontSize: '0.8rem',
                    fontFamily: 'YekanP',
                    maxWidth: '100%',
                  },
                }}
                {...register('address', { required: true })}
                helperText={
                  errors.address &&
                  errors.address.type === 'required' &&
                  // <Typography variant="subtitle2" color={'error'}>
                  ' لطفا آدرس خود را وارد کنید'
                  /* </Typography> */
                }
              />
            </div>
            {/* </ThemeProvider> */}

            {/* {errors.address && errors.address.type === 'required' && (
              <Typography variant="subtitle2" color={'error'}>
                لطفا آدرس خود را وارد کنید
              </Typography>
            )} */}
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="توضیحات"
              variant="filled"
              multiline
              rows={2}
              fullWidth
              sx={{
                '& label': {
                  left: 'unset',
                  right: '20px',
                  transformOrigin: 'right',
                  fontSize: '0.8rem',
                  fontFamily: 'YekanP',
                  maxWidth: '100%',
                },
              }}
              {...register('description')}
            />
          </Grid>
        </Grid>
        <Button variant="contained" type="submit" sx={{ marginTop: '10px' }}>
          سفارش
        </Button>
      </form>

      <ToastContainer />
    </>
  );
};

export default OrderForm;
