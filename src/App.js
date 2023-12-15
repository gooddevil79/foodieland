import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import './App.css';
import RootLayOut from './layout/RootLayOut';
// import Home from './pages/Home';
import Resturante from './pages/Resturante';
import ShoppingCart from './pages/ShoppingCart';
import NotFound from './pages/NotFound';
// import FoodsContextProvider from './store/FoodsContextProvider';
// import CartContextProvider from './store/CartContextProvider';
import FoodDetailPage from './pages/FoodDetailPage';
// import SearchFoods from './components/foods/SearchFoods';
import SearchedContent from './pages/SearchedContent';
import { useEffect, useState } from 'react';
// import FoodsContext from './store/foods-context';
// import axios from 'axios';
// import CartContext from './store/cart-context';
import { Box, CircularProgress } from '@mui/material';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayOut />}>
      <Route index element={<Resturante />} />
      <Route path="/shopping-cart" element={<ShoppingCart />} />
      <Route path="/resturante/:foodId" element={<FoodDetailPage />} />
      <Route path="/search/:searchWord" element={<SearchedContent />} />
      <Route path="/*" element={<NotFound />} />
    </Route>
  )
);
function App() {
  const [loading, setLoading] = useState(true);

  // created a dummy loading to handle slow connection waitings
  useEffect(() => {
    const loadingPhase = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(loadingPhase);
      // will remove after 1 sec.
    };
  }, [loading]);
  useEffect(() => {
    document.title = 'FoodiLand';
  }, []);
  return (
    <div className="App">
      {loading ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress color="warning" sx={{ margin: '10px auto' }} />
        </Box>
      ) : (
        <RouterProvider router={router} />
      )}
    </div>
  );
}

export default App;
