import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {observer} from 'mobx-react';
import RootStore from "./stores";

const Store = new RootStore();

import TopNavigation from "./components/TopNavigation";
import Map from "./components/map/Map";
import NotFound from "./components/NotFound";
import LoadingOverlay from "./components/LoadingOverlay"

import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/application.scss';

@observer
export class App extends Component {
  render() {
    return (
        <Router>
          <div id="wrapper">
            <TopNavigation />
            <div id="content-wrapper" className="d-flex flex-column">
              {/* <Store.mapContext.Provider value={Store.mapStore.isLoading}> */}
                <LoadingOverlay isLoading={Store.mapStore.isLoading} />
              {/* </Store.mapContext.Provider> */}
              <Switch>
                <Route exact={true} path="/" component={Map} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
    );
  }
}
