import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/Homepage";
import OfferDetail from "./components/Offers/OfferDetail";
import AddOffer from "./components/Offers/AddOffer";
import SignUp from "./components/Login/SignUp";
import AuthProvider from "./components/Contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile/Profile";
import UpdateOffer from "./components/Offers/UpdateOffer";
import { AppProvider } from "./components/Contexts/appContext";
import Header from "./components/Header/Header";

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/offer/:id" component={OfferDetail} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute path="/add-offer" component={AddOffer} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/update-offer/:id" component={UpdateOffer} />
        </Switch>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
