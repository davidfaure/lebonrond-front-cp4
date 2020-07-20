import React, {useState, useEffect} from 'react';
import { Card } from 'react-bootstrap';
import './Offers.css';

const OffersItem = ({
  category_id,
  city,
  cp,
  name,
  photos,
  prix,
}) => {

  return(
    <div className="OfferItem">
      <Card  border="warning" style={{ width: '18rem' }}>
      {/* <div className="Offer-Img">
        <Card.Img variant="top" src={photos}/>
      </div> */}
          <Card.Body>
          <div style={{ backgroundImage: `${photos}`}} />
            <Card.Title>{name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{prix} €</Card.Subtitle>
            <Card.Text>{category_id}</Card.Text>
            <Card.Text>{city} {cp}</Card.Text>
            <button variant="primary">Go somewhere</button>
          </Card.Body>
      </Card>
      {/* <div className="Offer-Img">
        <img src={photos} alt={name}/>
      </div>
      <div className="Offer-Info">
      <h2>{name}</h2>
      <p>{prix} €</p>
        <p>{category_id}</p>
        <p>{city} {cp}</p>
        <p></p>
      </div> */}
    </div>
  );
};

export default OffersItem;