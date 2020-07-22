import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const authContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ loading: true, data: null });
  // we will use loading later
  const setAuthData = (data) => {
    setAuth({ data });
  };
  // a function that will help us to add the user data in the auth;

  useEffect(() => {
    setAuth({
      loading: false,
      data: JSON.parse(window.localStorage.getItem('authData')),
    });
  }, []);
  // 2. if object with key 'authData' exists in localStorage, we are putting its value in auth.data and we set loading to false.
  // This function will be executed every time component is mounted (every time the user refresh the page);

  useEffect(() => {
    window.localStorage.setItem('authData', JSON.stringify(auth.data));
  }, [auth.data]);

  return (
    <authContext.Provider value={{ auth, setAuthData }}>
      {children}
    </authContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AuthProvider;
