import React from 'react';
import './HomePage.css';
import Header from '../Header';
import OffersList from '../../Offers/OffersList';

const HomePage = () => {
  return(
    <>
      <Header />
      <section>
      <div className="curved">
      <div className="Container-LastOffer">
        <h1>Les dernières annonces</h1>
          <OffersList />
      </div>
      </div>
      </section>
    </>
  );
};

export default HomePage;