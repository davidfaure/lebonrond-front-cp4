import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SearchDetail = ({
  index,
  category_id,
  city,
  cp,
  name,
  photos,
  prix,
  etat
}) => {

  const [category, setCategory] = useState([]);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    const url = 'http://localhost:3000/api/categories/'
    axios.get(url)
    .then((response) => response.data)
    .then((data) => setCategory(data))
    .catch();
  }

  const CategoryOffer = category.filter(element => element.id === category_id).map(element => element.name)[0];

  return(
    <div className="Search-Offer-Detail">
      <div className="Search-Offer-Img">
      <Link to={`/offer/${index}`} style={{ textDecoration: 'none' }}>
          <img src={photos} alt={name} />
      </Link>
      </div>
      <div className="Search-Offer-Info">
        <h2>{name}</h2>
        <div>
          <p className="Search-Offer-Price">{prix} €</p>
          <div className="Search-Offer-GeneralInfo">
            <p>{CategoryOffer}</p>
            <p>{etat}</p>
            <p>{cp}, {city}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDetail;