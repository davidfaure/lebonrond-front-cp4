import React from 'react';
import { Form, Modal } from 'react-bootstrap';
import './Login.css';
import '../App.css';

const Login = () => {
  return(
    <section>
      <div className="LoginForm">
        <div className="Nav-logo">
          {/* <img src={tricky} className="Img-logo" alt="Tricky" /> */}
          <h1 className="Text-Logo">lebonrond</h1>
        </div>
        <h2 className="text-center font-weight-bold">Connectez-vous</h2>
        {/* <Form onSubmit={handleSubmit}> */}
        <Form>
          <Form.Group controlId="email">
            <Form.Label className="LoginLabels">Adresse email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Entrez votre email"
              // value={userInput.email}
              // onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label className="LoginLabels">Mot de passe</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Entrez votre mot de passe"
              // value={userInput.password}
              // onChange={handleChange}
            />
          </Form.Group>
          <div className="text-center">
            <button
              className="ButtonAction Action"
              type="button"
            >Se Connecter</button>
          </div>
        </Form>
        <p className="text-center mt-4 LoginLabels">
          Mot de passe perdu ?{' '}
          <a href="mailto:support@yopmail.com">Contactez-nous</a>
        </p>
      </div>
    </section>
  );
};

export default Login;