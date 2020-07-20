import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import HomePage from './components/Header/HomePage/Homepage';
import OfferDetail from './components/Offers/OfferDetail';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/offer/:id" component={OfferDetail} />
      </Switch>
      {/* <Login /> */}

    </>
  );
}

export default App;
