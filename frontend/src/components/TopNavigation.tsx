// import naver from "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=l98mpxcbdb";
import React, { Component } from "react";
import { Link } from "react-router-dom";

interface Props {}

class TopNavigation extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <nav className="bar bar--sm bar-1 hidden-xs" id="top-filter-nav">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-2 hidden-xs">
              <div className="bar__module">
                <Link className="type--bold" to="/">
                  범죄지도
                </Link>
              </div>
            </div>
            <div className="col-lg-9 col-md-12 text-right text-left-xs text-left-sm">
              <div className="bar__module">
                <ul className="menu-horizontal text-left">
                  <li>
                    <Link to="/">
                      <span>지도시각화</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/intro">
                      <span>이 프로젝트는?</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default TopNavigation;
