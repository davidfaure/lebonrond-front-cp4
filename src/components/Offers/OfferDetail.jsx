/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import axios from "axios";
import "./Offers.css";
import { authContext } from "../Contexts/AuthContext";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

const zoomAnimation = keyframes`${fadeIn}`;
const AnimDiv = styled.div`
  animation: 1.5s ${zoomAnimation};
`;

const OfferDetail = ({ match }) => {
  const { auth } = useContext(authContext);
  const { id } = match.params;
  const [offer, SetOffer] = useState({});
  const [user, setUser] = useState([]);
  const [unlike, setUnlike] = useState("far fa-heart unlike");
  const [category, setCategory] = useState([]);
  const [show, setShow] = useState(false);
  const [userProfile, setUserProfile] = useState({
    firstname: "",
    lastname: "",
    id: "",
  });

  const getOffer = () => {
    const url = `http://localhost:3000/api/annonces/${id}`;
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        SetOffer(data);
      })
      .catch();
  };

  useEffect(() => {
    getOffer();
  }, []);

  console.log(offer, "offer: ");
  // const getUser = () => {
  //   const url = "http://localhost:3000/api/users/";
  //   axios
  //     .get(url)
  //     .then((response) => response.data)
  //     .then((data) => setUser(data))
  //     .catch();
  // };

  // const getCategory = () => {
  //   const url = "http://localhost:3000/api/categories/";
  //   axios
  //     .get(url)
  //     .then((response) => response.data)
  //     .then((data) => setCategory(data))
  //     .catch();
  // };

  // const getUserData = () => {
  //   axios({
  //     method: "post",
  //     url: "http://localhost:3000/api/auth",
  //     headers: {
  //       Authorization: `Bearer ${auth.token}`,
  //     },
  //   })
  //     .then((response) => response.data)
  //     .then((data) => setUserProfile(data.authData));
  // };

  // const CategoryOffer = category
  //   .filter((element) => element.id === offer.category_id)
  //   .map((element) => element.name)[0];
  // const CategoryUserFirstName = user
  //   .filter((element) => element.id === offer.users_id)
  //   .map((element) => element.firstname)[0];
  // const CategoryUserLastName = user
  //   .filter((element) => element.id === offer.users_id)
  //   .map((element) => element.lastname)[0];

  const Likeit = () => {
    if (auth.user) {
      const url = `http://localhost:3000/api/favorite`;
      const favoriteData = {
        users_id: auth.user.id,
        annonces_id: id,
      };
      axios
        .post(url, favoriteData)
        .then((res) => res.data)
        .catch();
      setUnlike("far fa-heart like");
    } else {
      setShow(true);
    }
  };

  return (
    <>
      <Header />
      <section className="OfferDetail">
        <AnimDiv className="Container-OfferDetail">
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
            <hr />
          </div>
          <div className="OfferDetail-User">
            <h2>Vendu par :</h2>
            <h3>
              {offer.firstname} {offer.lastname}
            </h3>
            <div className="OfferButton">
              <button className="ButtonOffer Action" type="button">
                Faire une offre
              </button>
              <button className="ButtonOffer OfferBtn" type="button">
                Contacter le vendeur
              </button>
            </div>
            <hr />
          </div>
          <h2>Critères</h2>
          <div className="OfferCritere">
            <div className="OfferCatEtat">
              <span className="fas fa-clipboard-list" />
              <p>
                Catégorie : <br />
                {offer.category_name}
              </p>
            </div>
            <div className="OfferCatEtat">
              <span className="fas fa-clipboard-list" />
              <p>
                État : <br />
                {offer.etat}
              </p>
            </div>
          </div>
          <div>
            <hr />
          </div>
          <div>
            <h2>Description</h2>
            <p>{offer.description}</p>
            <hr />
          </div>
          <div>
            <h2>Localisation</h2>
            <div className="OfferLocalisation">
              <span className="fas fa-map-marker-alt" />
              <p>
                {offer.address}, {offer.cp}, {offer.city}
                <br />
                {offer.region}
              </p>
            </div>
          </div>
          <div>{/* <Map /> */}</div>
        </AnimDiv>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Lebonrond</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Vous devez vous connecter pour ajouter une annonce à vos favoris
          </Modal.Body>
          <Modal.Footer>
            <Link to="/login">
              <Button
                variant="primary"
                className="OfferConBtn"
                onClick={() => setShow(false)}
              >
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
};

export default OfferDetail;
