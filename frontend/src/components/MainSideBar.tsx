// import naver from "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=l98mpxcbdb";
import * as React from "react";
interface Props {
  // currentTab: string
}

class MainSideBar extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div>
        <ul
          className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          <a
            className="sidebar-brand d-flex align-items-center justify-content-center"
            href="index.html"
          >
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink" />
            </div>
            <div className="sidebar-brand-text mx-3">
              SB Admin <sup>2</sup>
            </div>
          </a>

          <hr className="sidebar-divider my-0" />

          <li className="nav-item active">
            <a className="nav-link" href="index.html">
              <i className="fas fa-fw fa-tachometer-alt" />
              <span>Dashboard</span>
            </a>
          </li>

          <hr className="sidebar-divider d-none d-md-block" />

          <div className="text-center d-none d-md-inline">
            <button className="rounded-circle border-0" id="sidebarToggle" />
          </div>
        </ul>
      </div>
    );
  }
}

export default MainSideBar;
