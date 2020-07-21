import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login';
import HomePage from './components/HomePage/Homepage';
import OfferDetail from './components/Offers/OfferDetail';
import AddOffer from './components/Offers/AddOffer';
import SignUp from './components/Login/SignUp';
import AuthProvider from './components/contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function App() {
  return (
    <>
    <AuthProvider>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/offer/:id" component={OfferDetail} />
        <Route path='/login' component={Login} />
        <PrivateRoute path='/add-offer' component={AddOffer} />
        <Route path='/signup' component={SignUp} />
      </Switch>
    </AuthProvider>
    </>
  );
}

export default App;