import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import './Offers.css';
import { Link } from 'react-router-dom';
import defaultImage from '../img/default-image.png';
import styled, { keyframes } from 'styled-components';
import { ZoomIn } from 'react-animations';

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
  etat
}) => {

  const [category, setCategory] = useState([]);

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

  const CategoryOffer = category.filter(element => element.id === category_id).map(element => element.name)[0];

  return(
    <div className="OfferItem">
      <AnimDiv style={{ width: '18rem', height: '35rem' }}>
      <div className="Offer-Img">
        <Card.Img variant="top" src={photos === '' ? defaultImage : photos}/>
      </div>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Subtitle className="Offer-price">{prix} €</Card.Subtitle>
            <Card.Text>{CategoryOffer}</Card.Text>
            <Card.Text>{etat}<br/>{city} {cp}</Card.Text>
            <div className="Offer-btn">
              <Link to={`/offer/${index}`}>
              <button className="ButtonAction Action">Plus d'infos</button>
              </Link>
            </div>
          </Card.Body>
      </AnimDiv>
    </div>
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
}

export default OffersItem;