import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const authContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ loading: true, token: null, user: null });
  const setAuthData = (data) => {
    setAuth({ ...auth, loading: false, token: data });
  };

  const setUserData = (userData) => {
    setAuth({ ...auth, loading: false, user: userData });
  };

  const resetState = () => {
    setAuth({ loading: true, token: null, user: null });
  };

  useEffect(() => {
    setAuth({
      loading: false,
      token: JSON.parse(window.localStorage.getItem("token")),
      user: JSON.parse(window.localStorage.getItem("user")),
    });
  }, []);

  useEffect(() => {
    window.localStorage.setItem("token", JSON.stringify(auth.token));
  }, [auth.token]);

  useEffect(() => {
    window.localStorage.setItem("user", JSON.stringify(auth.user));
  }, [auth.user]);

  return (
    <authContext.Provider
      value={{ auth, setAuthData, setUserData, resetState }}
    >
      {children}
    </authContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AuthProvider;
