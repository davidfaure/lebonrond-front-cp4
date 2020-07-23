import React from 'react';
import './HomePage.css';
import Header from '../Header/Header';
import OffersList from '../Offers/OffersList';
import Search from '../Search/Search';
import SearchResult from '../Search/SearchResult';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const zoomAnimation = keyframes`${fadeIn}`;
const AnimDiv = styled.div`
  animation: 1s ${zoomAnimation};
`;


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
        <AnimDiv className="Container-LastOffer">
          <div className="LastOffer">
            <h1>Les dernières annonces</h1>
          </div>
          <OffersList />
        </AnimDiv>
      </section>
    </>
  );
};

export default HomePage;