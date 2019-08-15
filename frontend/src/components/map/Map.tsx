// import naver from "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=l98mpxcbdb";
import React, { Component } from "React";
// import ReactDOM from "react-dom";
// @ts-ignore
import reactAsyncScript from "react-async-script";
// @ts-ignore
import sido_2009Json from "../../../sido_2009.json";
import FilterCard from "./FilterCard";
import LocationInfoWindow from "./LocationInfoWindow";
import { MapClientId } from "../../config/index";

const URL: string = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${MapClientId}`;

const NaverMapLoad = reactAsyncScript(URL, {
  callbackName: null,
  globalName: "naver"
})(() => <div id="map" />);

interface ObjectLiteral {
  strokeColor: string;
  strokeWeight: number;
  strokeOpacity: number;
}

interface Props {}
interface State {
  naver: any | null;
  map: any | null;
  center: {} | null;
  zoom: number;
  selectedLocation: any | null;
  infowindow: any;
  feature: {} | null;
}

export default class NaverMap extends Component<Props, State> {
  private infoWindowRef: React.RefObject<HTMLInputElement>;
  private filterCtlRef: React.RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);

    this.state = {
      naver: null,
      map: null,
      center: null,
      zoom: 2,
      selectedLocation: null,
      infowindow: null,
      feature: null
    };

    this.infoWindowRef = React.createRef();
    this.filterCtlRef = React.createRef();
    this.setHomeBtnCtl = this.setHomeBtnCtl.bind(this);
    this.naverMapscriptOnLoad = this.naverMapscriptOnLoad.bind(this);
    this.setMapDetail = this.setMapDetail.bind(this);
  }

  setHomeBtnCtl(naver: any, map: any, center: any, zoom: number) {
    const homeBtn = '<a class="map-ctr-btn"><i class="fas fa-home"></i></a>';
    const homeBtnCtr = new naver.maps.CustomControl(homeBtn, {
      position: naver.maps.Position.TOP_LEFT
    });

    homeBtnCtr.setMap(map);

    naver.maps.Event.addDOMListener(homeBtnCtr.getElement(), "click", () => {
      map.morph(center, zoom);
    });
  }

  setMapDetail(map: any) {
    map.data.setStyle((feature: any) => {
      const styleOptions: ObjectLiteral = {
        strokeColor: "gray",
        strokeWeight: 0.5,
        strokeOpacity: 1
      };

      if (feature.getProperty("focus")) {
        styleOptions.strokeColor = "orange";
        styleOptions.strokeWeight = 1;
        styleOptions.strokeOpacity = 0.7;
      }

      return styleOptions;
    });

    map.data.addListener("click", ({ feature }: any) => {
      if (this.state.selectedLocation) {
        feature.setProperty("focus", false);
        map.data.revertStyle();
      }

      this.setState({ selectedLocation: feature });

      if (feature.getProperty("focus") !== true) {
        feature.setProperty("focus", true);
      } else {
        feature.setProperty("focus", false);
      }
    });

    map.data.addListener("mouseover", ({ feature }: any) => {
      map.data.overrideStyle(feature, {
        strokeWeight: 4,
        strokeOpacity: 0.7
      });
    });

    map.data.addListener("mouseout", ({ feature }: any) => {
      map.data.revertStyle();
    });
  }

  setFilterCtl(naver: any, map: any) {
    map.controls[naver.maps.Position.TOP_RIGHT].push(this.filterCtlRef.current);
  }

  setInfoWindow(naver: any, map: any) {
    const infowindow = new naver.maps.InfoWindow({
      content: this.infoWindowRef.current,
      zIndex: 9999
    });
    this.setState({ infowindow });

    map.data.addListener("click", ({ coord }: any) => {
      infowindow.open(map, coord);
    });
  }

  naverMapscriptOnLoad() {
    const naver = (window as any).naver;
    const center = new naver.maps.LatLng(36.0095704, 127.705399);
    const zoom = this.state.zoom;
    const map = new naver.maps.Map("map", {
      center,
      zoom,
      logoControl: false,
      mapDataControl: false,
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_LEFT
      },
      minZoom: zoom,
      maxZoom: 7
    });

    sido_2009Json.forEach((geojson: any) => {
      map.data.addGeoJson(geojson);
    });

    this.setState(
      {
        naver,
        center,
        map
      },
      () => {
        this.setHomeBtnCtl(naver, map, center, zoom);
        this.setMapDetail(map);
        this.setFilterCtl(naver, map);
        this.setInfoWindow(naver, map);
      }
    );
  }

  render() {
    return (
      <div>
        <NaverMapLoad asyncScriptOnLoad={this.naverMapscriptOnLoad} />
        <FilterCard filterCtlRef={this.filterCtlRef} />
        <LocationInfoWindow
          infoWindowRef={this.infoWindowRef}
          selectedLocation={this.state.selectedLocation}
          infowindow={this.state.infowindow}
        />
      </div>
    );
  }
}
