/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { authContext } from "../Contexts/AuthContext";
import axios from "axios";
import "./Profile.css";
import { fetchCategorySearch, fetchUserOffer } from "../Action";
import FavoriteResult from "../Favorite/FavoriteResult";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import { appContext } from "../Contexts/appContext";
import ProfileCard from "./ProfileCard";
import { fetchUserFavorites, fetchUserOffers } from "../../utils/api";

const zoomAnimation = keyframes`${fadeIn}`;
const AnimDiv = styled.div`
  animation: 1s ${zoomAnimation};
`;

const Profile = () => {
  const { auth, setUserData } = useContext(authContext);
  const { dispatch, appData } = useContext(appContext);
  const [Profile, setProfile] = useState({});

  const getUserData = () => {
    axios({
      method: "post",
      url: "http://localhost:3000/api/auth",
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((response) => response.data)
      .then((data) => {
        setProfile(data.authData);
        setUserData(data.authData);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (Profile.id) {
      const fetchProfileData = async () => {
        const offers = await fetchUserOffers(Profile.id);
        const favorites = await fetchUserFavorites(Profile.id);
        dispatch(fetchUserOffer(offers));
        if (favorites) {
          dispatch(fetchCategorySearch(favorites));
        }
      };
      fetchProfileData();
    }
  }, [Profile]);

  const getFavorite = () => {
    dispatch({ type: "FAV_CLICKED", payload: true });
    dispatch({ type: "USER_OFFER_CLICKED", payload: false });
  };

  const getUserOffer = () => {
    dispatch({ type: "USER_OFFER_CLICKED", payload: true });
    dispatch({ type: "FAV_CLICKED", payload: false });
  };

  return (
    <section className="Profile-Section">
      <AnimDiv className="Profile-Info-Container">
        <ProfileCard
          Profile={Profile}
          color="Yellow"
          buttonCSS="ProfileBtn"
          buttonLabel="Modifier"
          disabled
        />
        <ProfileCard
          cardTitle="Annonces"
          color="Blue"
          cardNumber={appData.userOffer.length}
          cardText={`Vous avez ${appData.userOffer.length} annonces actives sur lebonrond`}
          buttonCSS="OfferBtn"
          buttonLabel="Consulter"
          buttonFunction={getUserOffer}
        />
        <ProfileCard
          cardTitle="Favoris"
          color="Green"
          cardNumber={appData.favorite.length}
          cardText={`Vous avez ${appData.favorite.length} annonces favorites sur lebonrond`}
          buttonCSS="FavoriteBtn"
          buttonLabel="Consulter"
          buttonFunction={getFavorite}
        />
        <ProfileCard
          cardTitle="Paramètre"
          color="Red"
          cardText="Vous pouvez modifier les paramètres de confidentialité"
          buttonCSS="ParamsBtn"
          buttonLabel="Modifier"
          settings
          disabled
        />
        {/* <div className="Profile-Data-Container">
          <h2>
            {Profile.firstname} {Profile.lastname}
          </h2>
          <p>
            <strong>Email</strong> : {Profile.email}
          </p>
          <p>
            <strong>Adresse</strong> : {Profile.address}, {Profile.cp},{" "}
            {Profile.city}, {Profile.region}
          </p>
          <button className="ButtonOffer ProfileBtn" disabled>
            Modifier
          </button>
        </div>
        <div className="Profile-Annonces-Container">
          <div className="OfferNb">
            <h2>Annonces</h2>
            <h2>{Offer.length}</h2>
          </div>
          <p> Vous avez {Offer.length} annonces actives sur lebonrond</p>
          {Offer.length !== 0 && (
            <button className="ButtonOffer OfferBtn" onClick={getUserOffer}>
              Consulter
            </button>
          )}
        </div>
        <div className="Profile-Favoris-Container">
          <div className="OfferNb">
            <h2>Favoris</h2>
            <h2>{Favorite.length}</h2>
          </div>
          <p>
            {" "}
            Vous avez {Favorite.length} annonces
            favorites sur lebonrond
          </p>
          {Favorite.length !== 0 && (
            <button className="ButtonOffer FavoriteBtn " onClick={getFavorite}>
              Consulter
            </button>
          )}
        </div>
        <div className="Profile-Params-Container">
          <div className="OfferParams">
            <h2>Paramètre</h2>
            <span className="fas fa-cog" />
          </div>
          <p> Vous pouvez modifier les paramètres de confidentialité</p>
          <button className="ButtonOffer ParamsBtn" disabled>
            Modifier
          </button>
        </div> */}
      </AnimDiv>
      <FavoriteResult />
    </section>
  );
};

Profile.propTypes = {
  dispatch: PropTypes.func,
};

Profile.defaultProps = {
  dispatch: undefined,
};

export default Profile;
