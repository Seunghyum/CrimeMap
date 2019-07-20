// import naver from "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=l98mpxcbdb";
import React, { Component } from "react";
import { Link } from "react-router-dom";

interface Props {
  // currentTab: string
}

class MainSideBar extends Component<Props> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <ul
        className="navbar-nav bg-gradient-light sidebar sidebar-light accordion"
        id="accordionSidebar"
      >
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <img src="https://img.icons8.com/ios/30/000000/evidence-filled.png"></img>
          </div>
          <div className="sidebar-brand-text mx-3">
            범죄 데이터 시각화 Crime Map
          </div>
        </a>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item">
          <Link className="nav-link" to="/">
            <i className="fas fa-map-marked-alt" />
            <span>지도시각화</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/intro">
            <i className="far fa-question-circle" />
            <span>이 프로젝트는?</span>
          </Link>
        </li>

        <hr className="sidebar-divider d-none d-md-block" />
      </ul>
    );
  }
}

export default MainSideBar;
