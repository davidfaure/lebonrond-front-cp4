import React, { useReducer, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Modal, Col, Button } from "react-bootstrap";
import Header from "../Header/Header";
import { authContext } from "../Contexts/AuthContext";
import defaultImage from "../img/default-image.png";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

const zoomAnimation = keyframes`${fadeIn}`;
const AnimDiv = styled.div`
  animation: 2s ${zoomAnimation};
`;

const AddOffer = () => {
  const { auth } = useContext(authContext);
  const [show, setShow] = useState(false);
  const [successShow, setSuccessShow] = useState(false);
  const [category, setCategory] = useState([]);
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      description: "",
      etat: "",
      photos: "",
      prix: "",
      address: "",
      cp: "",
      region: "",
      city: "",
      category_id: "",
      users_id: "",
    }
  );

  const getUserInfo = () => {
    axios({
      method: "post",
      url: "http://localhost:3000/api/auth",
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((response) => response.data)
      .then((data) =>
        setUserInput({
          ...userInput,
          users_id: data.authData.id,
          address: data.authData.address,
          cp: data.authData.cp,
          region: data.authData.region,
          city: data.authData.city,
        })
      );
  };

  useEffect(() => {
    getCategory();
    getUserInfo();
  }, [getUserInfo]);

  const getCategory = () => {
    const url = "http://localhost:3000/api/categories/";
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => setCategory(data))
      .catch();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = "http://localhost:3000/api/annonces";
    if (
      userInput.name === "" ||
      userInput.description === "" ||
      userInput.etat === "" ||
      userInput.photos === "" ||
      userInput.prix === "" ||
      userInput.address === "" ||
      userInput.cp === "" ||
      userInput.region === "" ||
      userInput.city === "" ||
      userInput.category_id === "" ||
      userInput.users_id === ""
    ) {
      setShow(true);
    }
    axios.post(url, userInput).then((res) => res.data && setSuccessShow(true));
  };

  const [opacForm1, SetOpacForm1] = useState("Opac-Form1-true");
  const [opacForm2, SetOpacForm2] = useState("Opac-Form1-true");
  const [opacForm3, SetOpacForm3] = useState("Opac-Form1-true");
  const [hideButton1, SetHideButton1] = useState("ContinueButton");
  const [hideButton2, SetHideButton2] = useState("ContinueButton");
  const [hideButton3, SetHideButton3] = useState("ContinueButton");
  const Opacity1 = () => {
    SetOpacForm1("Opac-Form1-false");
    SetHideButton1("ContinueButton-Hidden");
  };

  const Opacity2 = () => {
    SetOpacForm2("Opac-Form1-false");
    SetHideButton2("ContinueButton-Hidden");
  };

  const Opacity3 = () => {
    SetOpacForm3("Opac-Form1-false");
    SetHideButton3("ContinueButton-Hidden");
  };

  return (
    <>
      <Header />
      <section className="AddOffer-Container">
        <AnimDiv className="AddOfferForm">
          <h1>Déposer une annonce</h1>
          <Form onSubmit={handleSubmit}>
            <Col>
              <div>
                <h2 className="H2-first">Ajoutons l'essentiel :</h2>
                <Form.Group controlId="name">
                  <Form.Label className="LoginLabels">
                    Titre de l'annonce
                  </Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="Entrez votre titre"
                    value={userInput.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="category_id">
                  <Form.Label className="LoginLabels">Catégorie</Form.Label>
                  <Form.Control
                    name="category_id"
                    as="select"
                    onChange={handleChange}
                  >
                    <option>--- Choisir une catégorie ---</option>
                    {category.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <div className={hideButton1}>
                  <button
                    className="ButtonAction OfferBtn"
                    onClick={Opacity1}
                    type="button"
                    disabled={!userInput.name}
                  >
                    Continuer
                  </button>
                </div>
              </div>
              <div className={opacForm1}>
                <h2>Définissons votre offre :</h2>
                <Form.Group controlId="etat">
                  <Form.Label className="LoginLabels">État</Form.Label>
                  <Form.Control
                    name="etat"
                    as="select"
                    value={userInput.etat}
                    onChange={handleChange}
                  >
                    <option>--- État du produit ---</option>
                    <option value="État neuf">État neuf</option>
                    <option value="Très bon état">Très bon état</option>
                    <option value="Bon état">Bon état</option>
                    <option value="État satisfaisant">État satisfaisant</option>
                    <option value="Pour pièces">Pour pièces</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="prix">
                  <Form.Label className="LoginLabels">Prix</Form.Label>
                  <Form.Control
                    name="prix"
                    type="number"
                    placeholder="Entrez un prix"
                    value={userInput.prix}
                    onChange={handleChange}
                  />
                </Form.Group>
                <div className={hideButton2}>
                  <button
                    className="ButtonAction OfferBtn"
                    onClick={Opacity2}
                    type="button"
                    disabled={!userInput.prix}
                  >
                    Continuer
                  </button>
                </div>
              </div>
              <div className={opacForm2}>
                <h2>Allons plus loin :</h2>
                <div className="Avatar">
                  {userInput.photos ? (
                    <img src={userInput.photos} alt="avatar" />
                  ) : (
                    <img src={defaultImage} alt="avatar" />
                  )}
                </div>
                <Form.Group controlId="photos">
                  <Form.Label className="LoginLabels">Photo</Form.Label>
                  <Form.Control
                    name="photos"
                    type="text"
                    placeholder="Entrez une url"
                    value={userInput.photos}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label className="LoginLabels">Description</Form.Label>
                  <Form.Control
                    name="description"
                    as="textarea"
                    rows="8"
                    placeholder="Entrez votre description"
                    value={userInput.description}
                    onChange={handleChange}
                  />
                </Form.Group>
                <div className={hideButton3}>
                  <button
                    className="ButtonAction OfferBtn"
                    onClick={Opacity3}
                    type="button"
                    disabled={!userInput.description}
                  >
                    Continuer
                  </button>
                </div>
              </div>
              <div className={opacForm3}>
                <h2>Localisons le tout :</h2>
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
                    <option>--- Choisr une région ---</option>
                    <option value="Nouvelle-Aquitaine">
                      Nouvelle-Aquitaine
                    </option>
                    <option value="Occitanie">Occitanie</option>
                    <option value="Ile-de-France">Ile-de-France</option>
                    <option value="Provences-Alpes-Côte d'Azur">
                      Provences-Alpes-Côte d'Azur
                    </option>
                    <option value="Auvergne-Rhône-Alpes">
                      Auvergne-Rhône-Alpes
                    </option>
                    <option value="Bourgogne-France-Comté">
                      Bourgogne-France-Comté
                    </option>
                    <option value="Grand-Est">Grand-Est</option>
                    <option value="Hauts-de-France">Hauts-de-France</option>
                    <option value="Normandie">Normandie</option>
                    <option value="Bretagne">Bretagne</option>
                    <option value="Pays de la Loire">Pays de la Loire</option>
                    <option value="Centre-Val de Loire">
                      Centre-Val de Loire
                    </option>
                    <option value="Corse">Corse</option>
                  </Form.Control>
                </Form.Group>
                <div className="text-center signupButton">
                  <button className="ButtonAction Action" type="submit">
                    Ajouter
                  </button>
                </div>
              </div>
            </Col>
          </Form>
        </AnimDiv>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Lebonrond</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Veuillez remplir tous les champs s'il vous plait
          </Modal.Body>
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
          <Modal.Body>Votre annonce a bien été ajoutée</Modal.Body>
          <Modal.Footer>
            <Link to="/">
              <Button
                className="ButtonAction Action"
                onClick={() => setSuccessShow(false)}
              >
                Valider
              </Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </section>
    </>
  );
};

export default AddOffer;
