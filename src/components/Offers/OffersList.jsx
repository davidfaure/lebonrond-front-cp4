import React, {useState, useEffect} from 'react';
import axios from 'axios';
import OffersItem from './OffersItem';

const OffersList = () => {

  const [OffersList, SetOffersList] = useState([]);

  const getOffersList = () => {
    const url = 'http://localhost:3000/api/annonces/'
    axios.get(url)
    .then((response) => response.data)
    .then((data) => SetOffersList(data))
    .catch();
  }

  useEffect(() => {
    getOffersList();
  }, [])

  console.log(OffersList)

  return(
    <div className="Offer">
      {
        OffersList.map(offers => (
          <OffersItem 
            key={offers.id}
            category_id={offers.category_id}
            city={offers.city}
            cp={offers.cp}
            name={offers.name}
            photos={offers.photos}
            prix={offers.prix}
          />
        ))
      }
    </div>
  );
};

export default OffersList;