import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OfferCategoryList = () => {

  const [category, setCategory] = useState([]);

  useEffect(() => {
    const url = 'http://localhost:3000/api/categories/'
    axios.get(url)
    .then((response) => response.data)
    .then((data) => setCategory(data))
    .catch();
  },[])

  return (
    <>
    {
      category.map(category => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))
    }
    </>
  )
};

export default OfferCategoryList;