import React, { useContext } from "react";
import PropTypes from "prop-types";
import FavoriteDetail from "./FavoriteDetail";
import "./Favorite.css";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import { appContext } from "../Contexts/appContext";

const zoomAnimation = keyframes`${fadeIn}`;
const AnimDiv = styled.div`
  animation: 1s ${zoomAnimation};
`;

const FavoriteResult = () => {
  const { appData } = useContext(appContext);

  return (
    <div className="Favorite-Section">
      <section
        className={
          appData.favoriteClicked ? "ResultSearch" : "ResultSearch Hidden"
        }
      >
        <AnimDiv className="Container-FavoriteSearch">
          <h1>Vos annonces favorites :</h1>
          <div className="FavoriteSearch">
            {appData.favorite.map((offers) => (
              <FavoriteDetail
                key={offers.id}
                index={offers.id}
                category_id={offers.category_id}
                city={offers.city}
                cp={offers.cp}
                name={offers.name}
                photos={offers.photos}
                prix={offers.prix}
                etat={offers.etat}
              />
            ))}
          </div>
        </AnimDiv>
      </section>
      <section
        className={
          appData.userOfferClicked ? "ResultSearch" : "ResultSearch Hidden"
        }
      >
        <AnimDiv className="Container-User-Offer-Search">
          <h1>Vos annonces sur lebonrond :</h1>
          <div className="User-Offer-Search">
            {appData.userOffer.map((offers) => (
              <FavoriteDetail
                key={offers.id}
                index={offers.id}
                category_id={offers.category_id}
                city={offers.city}
                cp={offers.cp}
                name={offers.name}
                photos={offers.photos}
                prix={offers.prix}
                etat={offers.etat}
              />
            ))}
          </div>
        </AnimDiv>
      </section>
    </div>
  );
};

FavoriteResult.propTypes = {
  appData: PropTypes.shape({
    userFavorite: PropTypes.arrayOf(PropTypes.object),
    favoriteClicked: PropTypes.bool,
    userOffer: PropTypes.arrayOf(PropTypes.object),
    userOfferClicked: PropTypes.bool,
  }).isRequired,
};

export default FavoriteResult;
