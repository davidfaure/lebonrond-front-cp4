import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import SearchDetail from "./SearchDetail";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import { appContext } from "../Contexts/appContext";

const zoomAnimation = keyframes`${fadeIn}`;
const AnimDiv = styled.div`
  animation: 1s ${zoomAnimation};
`;

const SearchResult = () => {
  const [category, setCategory] = useState([]);

  const { appData } = useContext(appContext);

  console.log(appData, "APP DATA");

  useEffect(() => {
    getCategory();
  }, [appData]);

  const getCategory = () => {
    const url = "http://localhost:3000/api/categories/";
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => setCategory(data))
      .catch();
  };

  // console.log(searchKeyword);
  const nameCategory = category
    .filter((element) => element.id === Number(appData.searchKeyword.category))
    .map((element) => element.name)[0];

  return (
    <section
      className={appData.searchClicked ? "ResultSearch" : "ResultSearch Hidden"}
    >
      <AnimDiv className="Container-ResultSearch">
        <h1>Resultats de votre recherche </h1>
        {appData.search.length !== 0 ? (
          <>
            <p>
              Titre : <span>{appData.searchKeyword.name}</span>
              <br />
              Catégorie :{" "}
              {nameCategory ? (
                <span>{nameCategory}</span>
              ) : (
                <span>Toutes les catégories</span>
              )}
              <br /> Region:{" "}
              {appData.searchKeyword.region ? (
                <span>{appData.searchKeyword.region}</span>
              ) : (
                <span>Toutes les regions </span>
              )}
            </p>
            <div className="ResultSearch">
              {appData.search.map((offers) => (
                <SearchDetail
                  key={offers.id}
                  index={offers.id}
                  category_id={offers.category_id}
                  city={offers.city}
                  cp={offers.cp}
                  name={offers.name}
                  photos={offers.photos}
                  prix={offers.prix}
                  etat={offers.etat}
                />
              ))}
            </div>
          </>
        ) : (
          <p>
            {" "}
            Oups, il n'y a aucunes annonces avec cette region et/ou cette
            catégorie{" "}
          </p>
        )}
      </AnimDiv>
    </section>
  );
};

SearchResult.propTypes = {
  appData: PropTypes.shape({
    search: PropTypes.arrayOf(PropTypes.object),
    searchKeyword: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default SearchResult;
