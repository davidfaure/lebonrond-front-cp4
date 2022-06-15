/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { authContext } from "../Contexts/AuthContext";
import defaultImage from "../img/default-image.png";
import styled, { keyframes } from "styled-components";
import { zoomIn } from "react-animations";
import { fetchCategoryById } from "../../utils/api";

const zoomAnimation = keyframes`${zoomIn}`;
const AnimDiv = styled.div`
  animation: 1.5s ${zoomAnimation};
`;

const SearchDetail = ({
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
  const [category, setCategory] = useState([]);
  const [unlike, setUnlike] = useState("fa fa-heart unlike");
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function getCategory() {
      const categoryName = await fetchCategoryById(index);
      setCategory(categoryName);
    }
    getCategory();
  }, []);

  const Likeit = () => {
    if (auth.user.id) {
      const url = `http://localhost:3000/api/favorite`;
      const favoriteData = {
        users_id: auth.user.id,
        annonces_id: index,
      };
      axios
        .post(url, favoriteData)
        .then((res) => res.data)
        .catch();
      setUnlike("fa fa-heart like");
    } else {
      setShow(true);
    }
  };

  useEffect(() => {
    if (auth.user) {
      const url = `http://localhost:3000/api/users/${auth.user.id}/favorite`;
      axios.get(url).then((response) => {
        if (
          response.data !==
          "Les annonces favorites de l'utilisateur n'ont pas pu etre trouvées"
        ) {
          const usersFavorites = response.data;
          const isFavorite = usersFavorites.find(
            (favorites) => favorites.annonces_id === Number(index)
          );
          if (isFavorite) {
            setUnlike("fa fa-heart like");
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  return (
    <>
      <AnimDiv className="Search-Offer-Detail">
        <div className="Search-Offer-Img">
          <Link to={`/offer/${index}`} style={{ textDecoration: "none" }}>
            <img src={photos === "" ? defaultImage : photos} alt={name} />
          </Link>
        </div>
        <div className="Search-Offer-Info">
          <div className="Search-Title-Like">
            <h2>{name}</h2>
            <div className="heart-div-search" onClick={Likeit}>
              <span className={unlike} />
            </div>
          </div>
          <div>
            <p className="Search-Offer-Price">{prix} €</p>
            <div className="ReSearch-Offer-GeneralInfo">
              <p>{category}</p>
              <p>{etat}</p>
              <p>
                {cp}, {city}
              </p>
            </div>
          </div>
        </div>
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
};

export default SearchDetail;
