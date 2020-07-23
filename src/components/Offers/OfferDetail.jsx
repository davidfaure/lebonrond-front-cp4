import React, {useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';
import './Offers.css';
import { authContext } from '../Contexts/AuthContext';


const OfferDetail = ({ match }) => {
  const { auth } = useContext(authContext);
  const { id } = match.params;
  const [offer, SetOffer] = useState({});
  const [user, setUser] = useState([]);
  const [unlike, setUnlike] = useState('far fa-heart unlike')
  const [category, setCategory] = useState([]);
  const [show, setShow] = useState(false);
  const [userProfile, setUserProfile] = useState({
    firstname: '',
    lastname: '',
    id:'',
  });

  const getOffer = () => {
    const url = `http://localhost:3000/api/annonces/${id}`
    axios.get(url)
    .then((response) => response.data)
    .then((data) => SetOffer(data))
    .catch();
  }

  const getUser = () => {
    const url = 'http://localhost:3000/api/users/'
    axios.get(url)
    .then((response) => response.data)
    .then((data) => setUser(data))
    .catch();
  }

  const getCategory = () => {
    const url = 'http://localhost:3000/api/categories/'
    axios.get(url)
    .then((response) => response.data)
    .then((data) => setCategory(data))
    .catch();
  }

  const CategoryOffer = category.filter(element => element.id === offer.category_id).map(element => element.name)[0];
  const CategoryUserFirstName = user.filter(element => element.id === offer.users_id).map(element => element.firstname)[0];
  const CategoryUserLastName = user.filter(element => element.id === offer.users_id).map(element => element.lastname)[0];

  useEffect(() => {
    getUserData();
    getOffer();
    getUser();
    getCategory();
  }, []);

  const Likeit = () => {
    if (userProfile.id) {
      console.log('TES CO FRERE')
      const url = `http://localhost:3000/api/favorite`;
      const favoriteData = {
        "users_id": userProfile.id,
        "annonces_id": id,
      }
      axios.post(url, favoriteData)
        .then(res => console.log(res))
        .catch();
      setUnlike('far fa-heart like')      
    } else {
      setShow(true);
    }
  }

  const getUserData =() => {
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

  return(
    <>
    <Header />
    <section className="OfferDetail">
      <div className="Container-OfferDetail">
        <div className="OfferDetail-Photo">
          <img src={offer.photos} alt={offer.photos} />
        </div>
        <div className="OfferDetail-Title">
          <div className="Offer-Like">
            <h1>{offer.name}</h1>
            <div className="heart-div" onClick={Likeit}>
              <span className={unlike} />
            </div>
          </div>
          <h3 className="prix">{offer.prix} €</h3>
        <hr/>
        </div>
        <div className="OfferDetail-User">
        <h2>Vendu par :</h2>
          <h3>{CategoryUserFirstName} {CategoryUserLastName}</h3>
          <div className="OfferButton">
          <button className="ButtonOffer Action" type="button">
              Faire une offre
          </button>
          <button className="ButtonOffer OfferBtn" type="button">
              Contacter le vendeur
          </button>
          </div>
        <hr/>
        </div>
          <h2>Critères</h2>
        <div className="OfferCritere">
          <div className="OfferCatEtat">
            <span className="fas fa-clipboard-list"/>
            <p>Catégorie : <br/>{CategoryOffer}</p>
          </div>
          <div className="OfferCatEtat">
            <span className="fas fa-clipboard-list"/>
            <p>État : <br/>{offer.etat}</p>
          </div>
        </div>
        <div>
          <hr/>
        </div>
        <div>
          <h2>Description</h2>
          <p>{offer.description}</p>
        <hr/>
        </div>
        <div>
          <h2>Localisation</h2>
          <div className="OfferLocalisation">
            <span className="fas fa-map-marker-alt"/>
          <p>{offer.address}, {offer.cp}, {offer.city}<br/>{offer.region}</p>
          </div>
        </div>
        <div>
          {/* <Map /> */}
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
    </section>
    </>
  );
};

OfferDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
}

export default OfferDetail;