import React, {useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { authContext } from '../Contexts/AuthContext';
import defaultImage from '../img/default-image.png';

const SearchDetail = ({
  index,
  category_id,
  city,
  cp,
  name,
  photos,
  prix,
  etat
}) => {
  const { auth } = useContext(authContext);
  const [category, setCategory] = useState([]);
  const [unlike, setUnlike] = useState('far fa-heart unlike');
  const [show, setShow] = useState(false);
  const [userProfile, setUserProfile] = useState({
    firstname: '',
    lastname: '',
    id:'',
  });

  useEffect(() => {
    getUserData();
    getCategory();
  }, []);

  const getCategory = () => {
    const url = 'http://localhost:3000/api/categories/'
    axios.get(url)
    .then((response) => response.data)
    .then((data) => setCategory(data))
    .catch();
  }

  const getUserData = () => {
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/auth',
      headers: {
        Authorization: `Bearer ${auth.data}`,
      },
    })
      .then((response) => response.data)
      .then((data) => setUserProfile(data.authData.user[0]));
  };

  const Likeit = () => {
    if (userProfile.id) {
      console.log('TES CO FRERE')
      const url = `http://localhost:3000/api/favorite`;
      const favoriteData = {
        "users_id": userProfile.id,
        "annonces_id": index,
      }
      axios.post(url, favoriteData)
        .then(res => console.log(res))
        .catch();
      setUnlike('far fa-heart like')      
    } else {
      setShow(true);
    }
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
        <div className="Search-Title-Like">
          <h2>{name}</h2>
          <div className="heart-div-search" onClick={Likeit} >
            <span className={unlike}/>
          </div>
        </div>
        <div>
          <p className="Search-Offer-Price">{prix} €</p>
          <div className="ReSearch-Offer-GeneralInfo">
            <p>{CategoryOffer}</p>
            <p>{etat}</p>
            <p>{cp}, {city}</p>
          </div>
        </div>
      </div>
    </div>
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Lebonrond</Modal.Title>
      </Modal.Header>
      <Modal.Body>Vous devez vous connecter pour ajouter une annonce à vos favoris</Modal.Body>
      <Modal.Footer>
        <Link to='/login'>
          <Button variant="primary" className="OfferConBtn"onClick={() => setShow(false)}>
            Se connecter
          </Button>
        </Link>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Retour
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  );
};

SearchDetail.propTypes = {
  index: PropTypes.number.isRequired,
  category_id: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  cp: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  photos: PropTypes.string.isRequired,
  prix: PropTypes.number.isRequired,
  etat: PropTypes.string.isRequired,
}

export default SearchDetail;