import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import SearchDetail from './SearchDetail';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const zoomAnimation = keyframes`${fadeIn}`;
const AnimDiv = styled.div`
  animation: 1s ${zoomAnimation};
`;

const SearchResult = ({ search }) => {

  const [category, setCategory] = useState([]);

  useEffect(() => {
    getCategory();
  }, [search]);

  const getCategory = () => {
    const url = 'http://localhost:3000/api/categories/'
    axios.get(url)
    .then((response) => response.data)
    .then((data) => setCategory(data))
    .catch();
  }

  return(
    <section className={search.searchClicked ? "ResultSearch" : "ResultSearch Hidden"}>
      <AnimDiv className="Container-ResultSearch">
        <h1>Resultats de votre recherche </h1>
        {
          search.search.length !== 0 ? (
            <>
            <p>Catégorie : <span>{category.filter(element => element.id === search.search[0].category_id).map(element => element.name)[0]}</span> <br/> Region: <span>{search.search[0].region}</span></p>
            <div className="ResultSearch">
              {search.search.map((offers) => (
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
              ))
              }
            </div>   
            </>        
          ) : (
            <p> Oups, il n'y a aucunes annonces avec cette region et/ou cette catégorie </p>
          )
        }
      </AnimDiv>
    </section>
  );
};

const mapStateToProps = (state) => ({
  search : state.fetchResult,
})

SearchResult.propTypes = {
  search: PropTypes.shape({
    search: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
}

export default connect(mapStateToProps)(SearchResult);