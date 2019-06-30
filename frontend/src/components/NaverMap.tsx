// import naver from "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=l98mpxcbdb";
import React, { Component } from "react";
import reactAsyncScript from "react-async-script";

const ClientId: string = "l98mpxcbdb";
const URL: string = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${ClientId}`;

const NaverMapLoad = reactAsyncScript(URL, {
  callbackName: null,
  globalName: "naver"
})(() => <div id="map" />);

interface Props {}
class NaverMap extends Component<Props> {
  constructor(props: any) {
    super(props);
  }

  scriptOnLoad() {
    const naver = window.naver;
    const center = new naver.maps.LatLng(36.0095704, 127.705399);
    const zoom = 2;
    const map = new naver.maps.Map("map", {
      center,
      zoom
    });
  }

  render() {
    return <NaverMapLoad asyncScriptOnLoad={this.scriptOnLoad} />;
  }
}
export default NaverMap;
