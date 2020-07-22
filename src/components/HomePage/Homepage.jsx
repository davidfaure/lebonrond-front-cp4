import React from 'react';
import './HomePage.css';
import Header from '../Header/Header';
import OffersList from '../Offers/OffersList';

const HomePage = () => {
  return(
    <>
      <Header />
      <section>
      <div className="curved">
      <div className="LastOffer">
        <h1>Les dernières annonces</h1>
      </div>
      </div>
      <div className="Container-LastOffer">
          <OffersList />
      </div>
      </section>
    </>
  );
};

export default HomePage;