import React, {useState, useEffect} from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import './Offers.css';
import { getQueriesForElement } from '@testing-library/react';

const OfferDetail = ({ match }) => {
  const { id } = match.params;
  const [offer, SetOffer] = useState({});
  const [user, setUser] = useState([]);
  const [category, setCategory] = useState([]);

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
    getOffer();
    getUser();
    getCategory();
  }, [])

  console.log(offer)

  return(
    <>
    <Header />
    <section className="Container-OfferDetail">
      <div className="OfferDetail-Photo">
        <img src={offer.photos} alt={offer.photos} />
      </div>
      <div className="OfferDetail-Title">
        <h1>{offer.name}</h1>
        <p>{offer.prix}</p>
      </div>
      <hr/>
      <div className="OfferDetail-User">
      <h1>Vendu par :</h1>
        <h3>{CategoryUserFirstName} {CategoryUserLastName}</h3>
      </div>
      <hr/>
      <div>
        <h2>Critères</h2>
        <p>Catégorie : {CategoryOffer}</p>
        <p>État : {offer.etat}</p>
      </div>
      <hr/>
      <div>
        <h2>Description</h2>
        <p>{offer.description}</p>
      </div>
      <hr/>
      <div>
        <h2>Localisation</h2>
        <p>{offer.address}, {offer.cp}, {offer.city}<br/>{offer.region}</p>
      </div>

    </section>
    </>
  );
};

export default OfferDetail;