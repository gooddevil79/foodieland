import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import FoodDetail from '../components/foods/FoodDetail';

const FoodDetailPage = () => {
  const params = useParams();
  const foodId = params.foodId;
  return (
    <div>
      <FoodDetail foodId={foodId} />
    </div>
  );
};

export default FoodDetailPage;
