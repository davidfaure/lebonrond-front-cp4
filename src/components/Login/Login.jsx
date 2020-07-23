import React, { useState, useReducer, useContext } from 'react';
import axios from 'axios';
import { Form, Modal, Button } from 'react-bootstrap';
import './Login.css';
import '../../App.css';
import { Link, Redirect } from 'react-router-dom';
import { authContext } from '../Contexts/AuthContext';

const Login = (props) => {
const { setAuthData, auth } = useContext(authContext);
const [show, setShow] = useState(false);
const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: "",
      password: "",
    }
  )

  const [error, setError] = useState("");

  console.log(" auth c'est : ", auth)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userInput.email === "" || userInput.password === "") {
      setShow(true)
      setError("Fields are required");
    } else {
      const url = 'http://localhost:3000/api/auth/login';
      axios
        .post(url, userInput)
        .then((res) => {
          setAuthData(res.data.token)
        })
        .then(() => props.history.push('/profile'))
    }
  }

  return(
    <>
    { auth.data ? <Redirect to='/add-offer' /> :
    <section className="Container-Login">
      <div className="LoginForm">
        <div className="Nav-logo">
          <Link to='/' style={{ textDecoration: 'none' }}>
          <h1 className="Text-Logo">lebonrond</h1>
          </Link>
        </div>
        <h2 className="text-center font-weight-bold">Connectez-vous</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label className="LoginLabels">Adresse email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Entrez votre email"
              value={userInput.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label className="LoginLabels">Mot de passe</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Entrez votre mot de passe"
              value={userInput.password}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="text-center">
            <button
              className="ButtonAction Action"
              type="submit"
            >Se Connecter</button>
          </div>
        </Form>
        {/* <p className="text-center mt-4 LoginLabels">
          Mot de passe perdu ?{' '}
          <a href="mailto:support@yopmail.com">Contactez-nous</a>
        </p> */}
        <p className="text-center mt-4 LoginLabels">
          Pas encore inscrit ?{' '}
          <Link to='/signup' style={{ textDecoration: 'none' }}>
            Créer un compte
          </Link>
        </p>
      </div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Lebonrond</Modal.Title>
        </Modal.Header>
        <Modal.Body>L'email et/ou le mot de passe sont incorrect</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShow(false)}>
            Réessayer
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
    }
    </>
  );
};

export default Login;