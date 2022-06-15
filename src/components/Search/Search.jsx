import React, { useState, useEffect, useReducer, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Form, Col, Row, Button, Modal } from "react-bootstrap";
import "./Search.css";
import fetchResult from "../Action";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import { appContext } from "../Contexts/appContext";
import { regionData } from "../../utils/region";

const zoomAnimation = keyframes`${fadeIn}`;
const AnimDiv = styled.div`
  animation: 1s ${zoomAnimation};
`;

const Search = () => {
  const [category, setCategory] = useState([]);
  const [show, setShow] = useState(false);
  const { dispatch } = useContext(appContext);

  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      region: "",
      category_id: "",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "KEYWORD_REGION", payload: userInput.region });
    dispatch({ type: "KEYWORD_CATEGORY", payload: userInput.category_id });
    dispatch({ type: "KEYWORD_NAME", payload: userInput.name });
    if (!userInput.region && !userInput.category_id && !userInput.name) {
      return setShow(true);
    }
    dispatch({ type: "SEARCH_CLICKED", payload: true });
    const url = `http://localhost:3000/api/annonces/?search=${userInput.name}&category=${userInput.category_id}&region=${userInput.region}`;
    axios.get(url).then((res) => {
      dispatch(fetchResult(res.data));
    });
  };

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

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <AnimDiv className="Form-Search">
        <h2>Effectuer une recherche</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="name">
                <Form.Control
                  name="category_id"
                  value={userInput.category_id}
                  as="select"
                  onChange={handleChange}
                >
                  <option value="">--- Choisir une catégorie ---</option>
                  {category.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="search">
                <Form.Control
                  name="name"
                  type="text"
                  value={userInput.name}
                  placeholder="Recherche par titre d'annonce"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="region">
                <Form.Control
                  as="select"
                  name="region"
                  value={userInput.region}
                  onChange={handleChange}
                >
                  {regionData.map((region) => (
                    <option value={region.value} key={region.id}>
                      {region.label}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <div className="Search-Btn">
            <button className="ButtonAction OfferBtn">Rechercher</button>
          </div>
        </Form>
      </AnimDiv>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Lebonrond</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Veuillez choisir une catégorie, une région ou saisir du texte dans la
          recherche.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShow(false)}>
            Réessayer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

Search.propTypes = {
  dispatch: PropTypes.func,
};

Search.defaultProps = {
  dispatch: undefined,
};

export default Search;
