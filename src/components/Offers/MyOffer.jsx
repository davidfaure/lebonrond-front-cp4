import React, { useContext } from "react";
import PropTypes from "prop-types";
import FavoriteDetail from "../Favorite/FavoriteDetail";
import "../Favorite/Favorite.css";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import { appContext } from "../Contexts/appContext";

const zoomAnimation = keyframes`${fadeIn}`;
const AnimDiv = styled.div`
  animation: 1s ${zoomAnimation};
`;

const MyOffer = ({ whichOffer, clicked }) => {
  const { appData } = useContext(appContext);

  const title = whichOffer === "userOffer" ? "sur le bonrond :" : "favorites :";

  return (
    <section
      className={appData[clicked] ? "ResultSearch" : "ResultSearch Hidden"}
    >
      <AnimDiv className="Container-FavoriteSearch">
        <h1>Vos annonces {title}</h1>
        <div className="FavoriteSearch">
          {appData[whichOffer].map((offers) => (
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
  );
};

MyOffer.propTypes = {
  appData: PropTypes.shape({
    userFavorite: PropTypes.arrayOf(PropTypes.object),
    favoriteClicked: PropTypes.bool,
    userOffer: PropTypes.arrayOf(PropTypes.object),
    userOfferClicked: PropTypes.bool,
  }),
  whichOffer: PropTypes.string.isRequired,
};

MyOffer.defaultProps = {
  appData: undefined,
};

export default MyOffer;
