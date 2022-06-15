import React from "react";
import "./Favorite.css";
import MyOffer from "../Offers/MyOffer";

const FavoriteResult = () => {
  return (
    <div className="Favorite-Section">
      <MyOffer whichOffer="userOffer" clicked="userOfferClicked" />
      <MyOffer whichOffer="favorite" clicked="favoriteClicked" />
    </div>
  );
};

export default FavoriteResult;
