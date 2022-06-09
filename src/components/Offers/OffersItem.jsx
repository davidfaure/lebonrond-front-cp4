import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { authContext } from "../Contexts/AuthContext";
import axios from "axios";
import { Card, Modal, Button } from "react-bootstrap";
import "./Offers.css";
import { Link } from "react-router-dom";
import defaultImage from "../img/default-image.png";
import styled, { keyframes } from "styled-components";
import { ZoomIn } from "react-animations";

const zoomAnimation = keyframes`${ZoomIn}`;
const AnimDiv = styled.div`
  animation: 1.5s ${zoomAnimation};
`;

const OffersItem = ({
  index,
  category_id,
  city,
  cp,
  name,
  photos,
  prix,
  etat,
}) => {
  const { auth } = useContext(authContext);
  const [category, setCategory] = useState();
  const [show, setShow] = useState(false);
  const [unlike, setUnlike] = useState("far fa-heart unlike");
  const [userProfile, setUserProfile] = useState({
    firstname: "",
    lastname: "",
    id: "",
  });

  const getUserData = () => {
    axios({
      method: "post",
      url: "http://localhost:3000/api/auth",
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((response) => response.data)
      .then((data) => setUserProfile(data.authData));
  };

  useEffect(() => {
    const url = `http://localhost:3000/api/categories/${category_id}`;
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        setCategory(data.name);
      })
      .catch();
    // getUserData();
  }, [category_id]);

  const Likeit = () => {
    if (userProfile.id) {
      const url = `http://localhost:3000/api/favorite`;
      const favoriteData = {
        users_id: userProfile.id,
        annonces_id: index,
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
      <div className="OfferItem">
        <AnimDiv style={{ width: "18rem", height: "35rem" }}>
          <div className="Offer-Img">
            <Card.Img
              variant="top"
              src={photos === "" ? defaultImage : photos}
            />
            <div className="heart-div-offer" onClick={Likeit}>
              <span className={unlike} />
            </div>
          </div>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Subtitle className="Offer-price">{prix} €</Card.Subtitle>
            <Card.Text>{category}</Card.Text>
            <Card.Text>
              {etat}
              <br />
              {city} {cp}
            </Card.Text>
            <div className="Offer-btn">
              <Link to={`/offer/${index}`}>
                <button className="ButtonAction Action">Plus d'infos</button>
              </Link>
            </div>
          </Card.Body>
        </AnimDiv>
      </div>
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
    </>
  );
};

OffersItem.propTypes = {
  index: PropTypes.number.isRequired,
  category_id: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  cp: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  photos: PropTypes.string.isRequired,
  prix: PropTypes.number.isRequired,
  etat: PropTypes.string.isRequired,
};

export default OffersItem;
