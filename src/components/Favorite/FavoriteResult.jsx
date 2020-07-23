import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FavoriteDetail from './FavoriteDetail';
import './Favorite.css';

const FavoriteResult = ({ userFavorite, favoriteClicked, userOffer, userOfferClicked }) => {

  return(
    <div className="Favorite-Section">
    <section className={favoriteClicked ? "ResultSearch" : "ResultSearch Hidden"}>
        <div className="Container-FavoriteSearch">
          <h1>Vos annonces favorites :</h1>
          <div className="FavoriteSearch">
          {userFavorite.map((offers) => (
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
              ))
              }
          </div>
        </div>
    </section>
    <section className={userOfferClicked ? "ResultSearch" : "ResultSearch Hidden"}>
        <div className="Container-User-Offer-Search">
          <h1>Vos annonces sur lebonrond :</h1>
          <div className="User-Offer-Search">
          {userOffer.map((offers) => (
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
              ))
              }
          </div>
        </div>
    </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userFavorite: state.fetchResult.favorite,
  favoriteClicked: state.fetchResult.favoriteClicked,
  userOffer: state.fetchResult.userOffer,
  userOfferClicked: state.fetchResult.userOfferClicked,
})

FavoriteResult.propTypes = {
  userFavorite: PropTypes.arrayOf(PropTypes.object).isRequired, 
  favoriteClicked: PropTypes.bool.isRequired, 
  userOffer: PropTypes.arrayOf(PropTypes.object).isRequired, 
  userOfferClicked: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps)(FavoriteResult);