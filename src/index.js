import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Signup from "./Components/Signup/Signup";
import Signin from "./Components/Signin/Signin";
import "./Components/Resources/Fonts/Mulish/mulish-variable.ttf";
import "./index.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import Visitors from "./Components/Visitors/Visitors";
import Users from "./Components/Users/Users";
import Request from "./Components/Requests/Request";
import UserDashboard from "./Components/UserDashboard/UserDashboard";

ReactDOM.render(
  <Router>
    <Route exact path="/signup">
      <Signup />
    </Route>
    <Route exact path="/">
      <Signin />
    </Route>
    <Route exact path="/visitors">
      <Visitors/>
    </Route>
    <Route exact path="/users">
      <Users/>
    </Route>
    <Route exact path="/request">
      <Request/>
    </Route>
    <Route exact path='/userdashboard'>
      <UserDashboard/>
    </Route>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
