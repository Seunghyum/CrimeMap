import * as React from "react";
import MainSideBar from "./components/MainSideBar";
import NaverMap from "./components/NaverMap";
import "./style/sb-admin-2.min.css";

export const App = () => (
  <div id="wrapper">
    <MainSideBar />
    <NaverMap />
  </div>
);
