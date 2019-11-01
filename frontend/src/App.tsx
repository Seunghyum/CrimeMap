<<<<<<< HEAD
import "bootstrap/dist/css/bootstrap.css"
import "./assets/styles/application.scss"
import { observer } from "mobx-react"
import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LoadingOverlay from "./components/LoadingOverlay"
import Map from "./components/map/Map"
import NotFound from "./components/NotFound"
import TopNavigation from "./components/TopNavigation"
import RootStore from "./stores"
=======
import 'bootstrap/dist/css/bootstrap.css'
import './assets/styles/application.scss'
import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoadingOverlay from './components/LoadingOverlay'
import Map from './components/map/Map'
import NotFound from './components/NotFound'
import TopNavigation from './components/TopNavigation'
import RootStore from './stores'
>>>>>>> e0221df5705f65eb0f1013d8d09330776ca029c6

const Store = new RootStore()
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
    )
  }
}
