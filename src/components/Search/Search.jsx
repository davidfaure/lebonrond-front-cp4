import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Col, Row, Button, Modal } from 'react-bootstrap';
import './Search.css';
import { connect } from 'react-redux';
import fetchResult from '../Action';

const Search = ({ dispatch }) => {

  const [category, setCategory] = useState([]);
  const [show, setShow] = useState(false);
  const [region, setRegion] = useState('');
  const [category_id, setCategory_id] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!region && !category_id) {
      setShow(true);
    } else {
      dispatch({type: 'SEARCH_CLICKED', payload: true})
      const url = `http://localhost:3000/api/annonces/double?category=${category_id}&region=${region}`
      axios.get(url)
        .then(res => {dispatch(fetchResult(res.data))}) 
    }
  }

  const getCategory = () => {
    const url = 'http://localhost:3000/api/categories/'
    axios.get(url)
    .then((response) => response.data)
    .then((data) => setCategory(data))
    .catch();
  }

  useEffect(() => {
    getCategory();
  }, [])

  return(
    <>
      <div className="Form-Search">
        <h2>Effectuer une recherche</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="name">
              <Form.Control
                name="category_id"
                as="select"
                onChange={e => setCategory_id(e.target.value)}
              >
              <option>--- Choisir une catégorie ---</option>
              {
                category.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              }
              </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="region">
                <Form.Control
                  as="select"
                  name="region"
                  onChange={e => setRegion(e.target.value)}
                >
                  <option>--- Choisir une région ---</option>
                  <option value="Nouvelle-Aquitaine">Nouvelle-Aquitaine</option>
                  <option value="Occitanie">Occitanie</option>
                  <option value="Ile-de-France">Ile-de-France</option>
                  <option value="Provences-Alpes-Côte d'Azur">Provences-Alpes-Côte d'Azur</option>
                  <option value="Auvergne-Rhône-Alpes">Auvergne-Rhône-Alpes</option>
                  <option value="Bourgogne-France-Comté">Bourgogne-France-Comté</option>
                  <option value="Grand-Est">Grand-Est</option>
                  <option value="Hauts-de-France">Hauts-de-France</option>
                  <option value="Normandie">Normandie</option>
                  <option value="Bretagne">Bretagne</option>
                  <option value="Pays de la Loire">Pays de la Loire</option>
                  <option value="Centre-Val de Loire">Centre-Val de Loire</option>
                  <option value="Corse">Corse</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        <div className="Search-Btn">
          <button className="ButtonAction OfferBtn">Rechercher</button>
        </div>
        </Form>
      </div>
      <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Lebonrond</Modal.Title>
          </Modal.Header>
          <Modal.Body>Veuillez choisir une catégorie ou une région</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setShow(false)}>
              Réessayer
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  );
};

export default connect()(Search)