import React, { useState, useReducer } from 'react';
import { Form, Modal, Col, Row, Button } from 'react-bootstrap';
import './Login.css';
import '../../App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const zoomAnimation = keyframes`${fadeIn}`;
const AnimDiv = styled.div`
  animation: 2s ${zoomAnimation};
`;


const SignUp = () => {
  const [show, setShow] = useState(false);
  const [successShow, setSuccessShow] = useState(false)
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      address: "",
      cp: "",
      region: "",
      city: "",
      phone: null,
    }
  )

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ [name]: value });
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      const url = 'http://localhost:3000/api/users/'
      if (userInput.firstname === '' ||
      userInput.lastname === '' || 
      userInput.email === '' || 
      userInput.password === ''
      ) {
        setShow(true);
      } else {
        axios.post(url, userInput)
          .then((res) => res.data)
          .then(() => setSuccessShow(true))
      }
  }

  return(
    <section className="Container-Login">
      <AnimDiv className="SignupForm">
        <div className="Nav-logo">
          <Link to='/' style={{ textDecoration: 'none' }}>
          <h1 className="Text-Logo">lebonrond</h1>
          </Link>
        </div>
        <h2 className="text-center font-weight-bold">Créer un compte</h2>
        <Form onSubmit={handleSubmit}>
        <Row>
        <Col>
          <Form.Group controlId="firstname">
              <Form.Label className="LoginLabels">Prénom <span className="Required">*</span></Form.Label>
              <Form.Control
                name="firstname"
                type="text"
                placeholder="Entrez votre prénom"
                value={userInput.firstname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="lastname">
              <Form.Label className="LoginLabels">Nom <span className="Required">*</span></Form.Label>
              <Form.Control
                name="lastname"
                type="text"
                placeholder="Entrez votre nom"
                value={userInput.lastname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label className="LoginLabels">Adresse email <span className="Required">*</span></Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Entrez votre email"
                value={userInput.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label className="LoginLabels">Mot de passe <span className="Required">*</span></Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Entrez votre mot de passe"
                value={userInput.password}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="address">
            <Form.Label className="LoginLabels">Adresse</Form.Label>
            <Form.Control
              name="address"
              type="text"
              placeholder="Entrez votre adresse"
              value={userInput.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="cp">
            <Form.Label className="LoginLabels">Code Postal</Form.Label>
            <Form.Control
              name="cp"
              type="number"
              placeholder="Entrez votre code postal"
              value={userInput.cp}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label className="LoginLabels">Ville</Form.Label>
            <Form.Control
              name="city"
              type="text"
              placeholder="Entrez votre ville"
              value={userInput.city}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="region">
            <Form.Label className="LoginLabels">Région</Form.Label>
            <Form.Control
              as="select"
              name="region"
              onChange={handleChange}
              value={userInput.region}
            >
            <option>--- Choisr une région </option>
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
          <Form.Group>
            <Form.Label className="Required">* champs requis</Form.Label>
          </Form.Group>
          <div className="text-center signupButton">
            <button
              className="ButtonAction Action"
              type="submit"
            >Créer mon compte</button>
          </div>
        </Form>
      </AnimDiv>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Lebonrond</Modal.Title>
        </Modal.Header>
        <Modal.Body className="Required">Veuillez remplir les champs requis *</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShow(false)}>
            Réessayer
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={successShow} onHide={() => setSuccessShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Lebonrond</Modal.Title>
        </Modal.Header>
        <Modal.Body>Votre compte a été crée avec succès</Modal.Body>
        <Modal.Footer>
        <Link to='/login'>
          <Button className="ButtonAction Action" onClick={() => setSuccessShow(false)}>
            Me connecter
          </Button>
        </Link>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default SignUp;