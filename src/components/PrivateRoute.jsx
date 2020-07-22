import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { authContext } from './contexts/AuthContext';
import '../App.css';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = useContext(authContext);
  const { loading } = auth;

  if (loading) {
    return (
      <Route
        {...rest}
        render={() => {
          return (
            <section className="LoginBkg">
              <div className="LoginForm">
                <div className="Nav-logo">
                  {/* <img src={tricky} className="Img-logo" alt="Tricky" /> */}
                </div>
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            </section>
          );
        }}
      />
    );
  }

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        auth.data ? <Component {...routeProps} /> : <Redirect to="/" />
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;