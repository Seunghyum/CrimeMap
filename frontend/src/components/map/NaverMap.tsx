// import naver from "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=l98mpxcbdb";
import React, { Component, RefObject } from "React";
import reactAsyncScript from "react-async-script";
import sidoGeojson from "../../../sido_2009.json";
import FilterCard from "./FilterCard"
import LocationInfoWindow from "./LocationInfoWindow"

const ClientId: string = "l98mpxcbdb";
const URL: string = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${ClientId}`;

const NaverMapLoad = reactAsyncScript(URL, {
  callbackName: null,
  globalName: "naver"
})(() => <div id="map" />);

interface ObjectLiteral {
  strokeColor: string,
  strokeWeight: number,
  strokeOpacity: number,
}

interface Props {}
interface State {
  naver: any | null,
  map: any | null,
  center: {} | null,
  zoom: number,
  selectedLocation: any | null,
  infowindow: any
}

export default class NaverMap extends Component<Props, State> {
  private InfowindowRef: React.RefObject<HTMLInputElement>;
  constructor(props: any) {
    super(props);
    
    this.state = {
      naver: null,
      map: null,
      center: null,
      zoom: 2,
      selectedLocation: null
    }

    this.InfowindowRef = React.createRef();
    this.setHomeBtnCtl = this.setHomeBtnCtl.bind(this);
    this.naverMapscriptOnLoad = this.naverMapscriptOnLoad.bind(this);
    this.setMapDetail = this.setMapDetail.bind(this);
    
  }

  setHomeBtnCtl() {
    const naver = this.state.naver;
    const map = this.state.map;
    const center = this.state.center;
    const zoom = this.state.zoom;
    const homeBtn = '<a class="map-ctr-btn"><i class="fas fa-home"></i></a>'
    const homeBtnCtr = new naver.maps.CustomControl(homeBtn, {
      position: naver.maps.Position.TOP_LEFT
    });

    homeBtnCtr.setMap(map);

    naver.maps.Event.addDOMListener(homeBtnCtr.getElement(), 'click', () => {
      map.morph(center, zoom);
    });
  }

  setMapDetail() {
    const map = this.state.map;
    
    map.data.setStyle((feature: any) => {
      const styleOptions: ObjectLiteral = {
        strokeColor: "gray",
        strokeWeight: 0.5,
        strokeOpacity: 1
      };

      if (feature.getProperty("focus")) {
        styleOptions.strokeColor = "red";
        styleOptions.strokeWeight = 3;
        styleOptions.strokeOpacity = 0.7;
      }

      return styleOptions;
    });

    map.data.addListener("click", ({feature}:any) => {
      if(this.state.selectedLocation) {
        this.state.selectedLocation.setProperty("focus", false);
        map.data.revertStyle();
      }

      this.setState({ selectedLocation: feature })

      if (feature.getProperty("focus") !== true) feature.setProperty("focus", true);
      else feature.setProperty("focus", false);
    });

    map.data.addListener("mouseover",  ({feature}:any) => {
      map.data.overrideStyle(feature, {
        strokeWeight: 4,
        strokeOpacity: 0.7
      });
    });

    map.data.addListener("mouseout",  ({feature}:any) => {
      map.data.revertStyle();
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

    sidoGeojson.forEach((geojson:any) => {
      map.data.addGeoJson(geojson);
    });

    this.setState({
      naver, 
      center,
      map
    }, () => {
      this.setHomeBtnCtl()
      this.setMapDetail()

      const infowindow = new naver.maps.InfoWindow({
        content: this.InfowindowRef.current,
        zIndex: 1
      });
      this.setState({infowindow})
      
      map.data.addListener("click", ({coord}:any) => {
        if (!infowindow.getMap()) infowindow.open(map, coord);
        else infowindow.setPosition(coord)
      });
    })
  }

  render() {
    return (
      <div>
        <NaverMapLoad asyncScriptOnLoad={this.naverMapscriptOnLoad} />
        <FilterCard />
        <LocationInfoWindow outerDivRef={this.InfowindowRef} selectedLocation={this.state.selectedLocation} infowindow={this.infowindow} />
      </div>
    );
  }
}
