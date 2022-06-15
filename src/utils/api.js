import axios from "axios";
const BASE_URL = "http://localhost:3000/api/";

// récupére le nom de la catégorie
export const fetchCategoryById = (id) => {
  const url = `${BASE_URL}/categories/${id}`;
  return axios
    .get(url)
    .then((response) => response.data)
    .then((data) => {
      return data.name;
    })
    .catch();
};

// récupère les favoris et mets dans le context

export const fetchUserFavorites = (id) => {
  const url = `${BASE_URL}/users/${id}/favorite`;
  return axios
    .get(url)
    .then((res) => {
      return res.data;
    })
    .catch();
};

export const fetchUserOffers = (id) => {
  const url = `${BASE_URL}/annonces?user=${id}`;
  return axios
    .get(url)
    .then((res) => {
      return res.data;
    })
    .catch();
};
