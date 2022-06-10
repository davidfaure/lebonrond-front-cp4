import PropTypes from "prop-types";
import React, { createContext, useReducer } from "react";
import { appReducer, initialState } from "../Reducer/appReducer";

export const appContext = createContext();

export const AppProvider = ({ children }) => {
  const [appData, dispatch] = useReducer(appReducer, initialState);

  return (
    <appContext.Provider value={{ appData, dispatch }}>
      {children}
    </appContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
