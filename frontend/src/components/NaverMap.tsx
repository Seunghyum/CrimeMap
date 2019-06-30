// import naver from "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=l98mpxcbdb";
import React, { Component } from "react";
import reactAsyncScript from "react-async-script";
import sidoGeojson from "../../sido_2009.json";

const ClientId: string = "l98mpxcbdb";
const URL: string = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${ClientId}`;

const NaverMapLoad = reactAsyncScript(URL, {
  callbackName: null,
  globalName: "naver"
})(() => <div id="map" />);

interface ObjectLiteral {
  fillColor: string,
  fillOpacity: number,
  strokeColor: string,
  strokeWeight: number,
  strokeOpacity: number,
}

interface Props {}
class NaverMap extends Component<Props> {
  constructor(props: any) {
    super(props);
  }

  naverMapscriptOnLoad() {
    const naver = window.naver;
    const center = new naver.maps.LatLng(36.0095704, 127.705399);
    const zoom = 2;
    let map = new naver.maps.Map("map", {
      center,
      zoom
    });

    sidoGeojson.forEach(geojson => {
      map.data.addGeoJson(geojson);
    });

    map.data.setStyle((feature: any) => {
      let styleOptions: ObjectLiteral = {
        fillColor: "#9ecae1",
        fillOpacity: 0.0001,
        strokeColor: "#6baed6",
        strokeWeight: 2,
        strokeOpacity: 0.4
      };

      if (feature.getProperty("focus")) {
        styleOptions.fillOpacity = 0.6;
        styleOptions.fillColor = "#0f0";
        styleOptions.strokeColor = "#0f0";
        styleOptions.strokeWeight = 4;
        styleOptions.strokeOpacity = 1;
      }

      return styleOptions;
    });

    map.data.addListener("click", e => {
      const feature: any = e.feature;

      if (feature.getProperty("focus") !== true) {
        feature.setProperty("focus", true);
      } else {
        feature.setProperty("focus", false);
      }
    });

    map.data.addListener("mouseover", e => {
      const feature: any = e.feature;

      map.data.overrideStyle(feature, {
        fillOpacity: 0.6,
        strokeWeight: 4,
        strokeOpacity: 1
      });
    });

    map.data.addListener("mouseout", e => {
      map.data.revertStyle();
    });
  }

  render() {
    return <NaverMapLoad asyncScriptOnLoad={this.naverMapscriptOnLoad} />;
  }
}
export default NaverMap;
