import axios from "axios";
const BASE_URL = "http://localhost:3000/api/";

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
