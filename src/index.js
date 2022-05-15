import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Amplify from "aws-amplify";
import awsmobile from "./aws-exports";

import store from "./store";
import Signup from "./Components/Signup/Signup";
import Signin from "./Components/Signin/Signin";
import Dashboard from "./Components/Dashboard/Dashboard";
import Request from "./Components/Requests/Request";
import ConfirmSignup from "./Components/ConfirmSignup/ConfirmSignup";
import AddOrganization from "./Components/AddOrganization/AddOrganization";
import Profile from "./Components/Profile/Profile";

import "./Components/Resources/Fonts/Mulish/mulish-variable.ttf";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

Amplify.configure(awsmobile);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route
        exact
        path="/signup"
        render={(props) => <Signup {...props} />}
      ></Route>

      <Route exact path="/">
        <Signin />
      </Route>
      <Route exact path="/visitors">
        <Dashboard />
      </Route>
      <Route exact path="/users">
        <Dashboard />
      </Route>
      <Route exact path="/request">
        <Request />
      </Route>
      <Route exact path="/verify">
        <ConfirmSignup />
      </Route>
      <Route exact path="/addorganization">
        <AddOrganization />
      </Route>
      <Route exact path="/profile">
        <Profile></Profile>
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// subscribeUser()
