import React, {useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import './Favorite.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import defaultImage from '../img/default-image.png';

const FavoriteDetail = ({
  index,
  category_id,
  city,
  cp,
  name,
  photos,
  prix,
  etat,
  userOfferClicked,
  dispatch
}) => {
  const [category, setCategory] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    const url = 'http://localhost:3000/api/categories/'
    axios.get(url)
    .then((response) => response.data)
    .then((data) => setCategory(data))
    .catch();
  }

  const deleteOffer = () => {
    setShow(false);
    const url = `http://localhost:3000/api/annonces/${index}`
    axios.delete(url)
      .then((response) => console.log(response))
      .then(() => window.location.reload());
  }

  const CategoryOffer = category.filter(element => element.id === category_id).map(element => element.name)[0];

  return(
    <>
    <div className="Search-Offer-Detail">
    <div className="Search-Offer-Img">
    <Link to={`/offer/${index}`} style={{ textDecoration: 'none' }}>
        <img src={photos === '' ? defaultImage : photos} alt={name} />
    </Link>
    </div>
    <div className="Search-Offer-Info">
        <h2>{name}</h2>
      <div>
        <p className="Search-Offer-Price">{prix} €</p>
        <div className="Search-Offer-GeneralInfo">
          <div>
            <p>{CategoryOffer}</p>
            <p>{etat}</p>
            <p>{cp}, {city}</p>
          </div>
          {userOfferClicked && 
          <div className="Modif-Btn">
            <button className="ButtonOffer OfferBtn">Modifier</button>
            <button className="ButtonOffer ParamsBtn" onClick={() => setShow(true)}>Supprimer</button>
          </div>}
        </div>
      </div>
    </div>
  </div>
  <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Lebonrond</Modal.Title>
      </Modal.Header>
      <Modal.Body>Êtes-vous sur de vouloir supprimer l'annonce {name} ?</Modal.Body>
      <Modal.Footer>
          <Button variant="danger" className="OfferConBtn" onClick={deleteOffer}>
            Supprimer
          </Button>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Retour
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  );
};

const mapStateToProps = (state) => ({
  favoriteClicked: state.fetchResult.favoriteClicked,
  userOfferClicked: state.fetchResult.userOfferClicked,
})

export default connect(mapStateToProps)(FavoriteDetail);