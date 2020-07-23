import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { authContext } from './Contexts/AuthContext';
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

export default PrivateRoute;