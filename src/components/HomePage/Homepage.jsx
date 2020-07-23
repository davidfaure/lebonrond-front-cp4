import React from 'react';
import './HomePage.css';
import Header from '../Header/Header';
import OffersList from '../Offers/OffersList';
import Search from '../Search/Search';
import SearchResult from '../Search/SearchResult';

const HomePage = () => {
  return(
    <>
      <Header />
      <section>
        <div className="curved">
          <Search />
        </div>
        <div>
          <SearchResult />
        </div>
        <div className="Container-LastOffer">
          <div className="LastOffer">
            <h1>Les dernières annonces</h1>
          </div>
          <OffersList />
        </div>
      </section>
    </>
  );
};

export default HomePage;