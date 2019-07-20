import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MainSideBar from "./components/MainSideBar";
import NaverMap from "./components/map/NaverMap";
import Intro from "./components/Intro";
import NotFound from "./components/NotFound";
import "./style/sb-admin-2.min.css";
import "./style/custom.scss";

export class App extends Component {
  render() {
    return (
      <Router>
        <div id="wrapper">
          <MainSideBar />
          <div id="content-wrapper" className="d-flex flex-column">
            <Switch>
              <Route exact path="/" component={NaverMap} />
              <Route path="/intro" component={Intro} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
