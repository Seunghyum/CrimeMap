// import naver from "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=l98mpxcbdb";
import * as React from "react";

interface Props {}

const CENTER: [number, number] = [37.3595704, 127.105399];

class NaverMap extends React.Component<Props> {
  render() {
    return (
      <div>
        <h1>네이버지도 자리</h1>
      </div>
    );
  }
}

export default NaverMap;
