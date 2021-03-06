import React, {useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { authContext } from '../Contexts/AuthContext';
import Header from '../Header/Header';
import axios from 'axios';
import './Profile.css';
import { connect } from 'react-redux';
import { fetchCategorySearch, fetchUserOffer } from '../Action';
import FavoriteResult from '../Favorite/FavoriteResult';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const zoomAnimation = keyframes`${fadeIn}`;
const AnimDiv = styled.div`
  animation: 1s ${zoomAnimation};
`;


const Profile = ({ dispatch }) => {

  const { auth } = useContext(authContext);
  const [Profile, setProfile] = useState({});
  const [Offer, setOffer] = useState([]);
  const [Favorite, setFavorite] = useState([]);

  async function getUserData (){
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/auth',
      headers: {
        Authorization: `Bearer ${auth.data}`,
      },
    })
      .then((response) => response.data)
      .then((data) => setProfile(data.authData.user[0]));
    
      const urlOffer = `http://localhost:3000/api/annonces?user=${Profile.id}`
      const urlFavorite = `http://localhost:3000/api/users/${Profile.id}/favorite`
      await axios.get(urlOffer)
        .then(res => setOffer(res.data));
      axios.get(urlFavorite)
        .then(res => setFavorite(res.data));
  }

  const getFavorite = () => {
    const url = `http://localhost:3000/api/users/${Profile.id}/favorite`
    dispatch({type: 'FAV_CLICKED', payload: true})
    dispatch({type: 'USER_OFFER_CLICKED', payload: false})
    axios.get(url)
      .then(res => {dispatch(fetchCategorySearch(res.data))})
  }

  const getUserOffer = () => {
    const url = `http://localhost:3000/api/annonces?user=${Profile.id}`
    dispatch({type: 'USER_OFFER_CLICKED', payload: true})
    dispatch({type: 'FAV_CLICKED', payload: false})
    axios.get(url)
      .then(res => {dispatch(fetchUserOffer(res.data))});
  }

  useEffect(() => {
    getUserData();
  }, [Profile.id]);

  const condition = Favorite.length !== 0 && Favorite.length !== 66

  return(
    <>
      <Header />
      <section className="Profile-Section">
      <AnimDiv className="Profile-Info-Container">
        <div className="Profile-Data-Container">
          <h2>{Profile.firstname} {Profile.lastname}</h2>
          <p><strong>Email</strong> : {Profile.email}</p>
          <p><strong>Adresse</strong> : {Profile.address}, {Profile.cp}, {Profile.city}, {Profile.region}</p>
          <button className="ButtonOffer ProfileBtn" disabled>Modifier</button>
        </div>
        <div className="Profile-Annonces-Container">
          <div className="OfferNb">
            <h2>Annonces</h2>
            <h2>{Offer.length}</h2>
          </div>
          <p> Vous avez {Offer.length} annonces actives sur lebonrond</p>
          {Offer.length !== 0 && 
            <button className="ButtonOffer OfferBtn" onClick={getUserOffer}>Consulter</button>
          }
        </div>
        <div className="Profile-Favoris-Container">
          <div className="OfferNb">
            <h2>Favoris</h2>
            {Favorite.length === 66 ?
            <h2>0</h2> :
            <h2>{Favorite.length}</h2>
            }
          </div>
          <p> Vous avez {Favorite.length === 66 ? 0 : Favorite.length} annonces favorites sur lebonrond</p>
            {condition && 
              <button className="ButtonOffer FavoriteBtn " onClick={getFavorite}>Consulter</button>
            }
        </div>
        <div className="Profile-Params-Container">
        <div className="OfferParams">
            <h2>Paramètre</h2>
            <span className="fas fa-cog"/>
          </div>
          <p> Vous pouvez modifier les paramètres de confidentialité</p>
            <button className="ButtonOffer ParamsBtn" disabled>Modifier</button>
        </div>
      </AnimDiv>
        <FavoriteResult />
      </section>
    </>
  );
};

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(Profile);