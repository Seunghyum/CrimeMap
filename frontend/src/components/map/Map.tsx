import React, { Component } from "React";
// @ts-ignore
import reactAsyncScript from "react-async-script";
// @ts-ignore
import sido_2009Json from "../../../sido_2009.json";
// @ts-ignore
import sigungu_2015Json from "../../../sigungu_2015.json";
import FilterCtlNav from "./FilterCtlNav";
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
  mapType: string;
  sidoMap: any;
  sigunguMap: any;
}

export default class NaverMap extends Component<Props, State> {
  private infoWindowRef: React.RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);

    this.state = {
      naver: null,
      map: null,
      center: null,
      zoom: 2,
      selectedLocation: null,
      infowindow: null,
      feature: null,
      mapType: "sido",
      sidoMap: null,
      sigunguMap: null
    };

    this.infoWindowRef = React.createRef();
    this.setCustomCtrBtn = this.setCustomCtrBtn.bind(this);
    this.naverMapscriptOnLoad = this.naverMapscriptOnLoad.bind(this);
    this.setMapDetail = this.setMapDetail.bind(this);
    this.initSidoGeojson = this.initSidoGeojson.bind(this);
    this.initSigunguGeojson = this.initSigunguGeojson.bind(this);
    this.changeMapType = this.changeMapType.bind(this);
  }

  setCustomCtrBtn(naver: any, map: any, center: any, zoom: number) {
    // 초기 지역으로 지도 포커싱 변경
    const initFocus =
      '<a id="map-ctr-btn" data-toggle="tooltip" data-placement="bottom" title="홈 포커싱 지역으로 가기"><i class="fas fa-home"></i></a>';
    const initFocusCtr = new naver.maps.CustomControl(initFocus, {
      position: naver.maps.Position.TOP_LEFT
    });

    naver.maps.Event.addDOMListener(initFocusCtr.getElement(), "click", () => {
      map.morph(center, zoom);
    });

    initFocusCtr.setMap(map);
    // const mapInitFocusCtlBtnDom:any = document.querySelector('#map-ctr-btn')
    // if(mapInitFocusCtlBtnDom) mapInitFocusCtlBtnDom.tooltip('enable')

    // 시군구 지도 geojson 경계 변경 버튼
    const mapTypeChangeBtn =
      '<a id="map-type-ctr-btn" data-toggle="tooltip" data-placement="bottom" title="행정구역 자세히 보기(시군구)"><i class="fas fa-search-plus"></a>';
    const mapTypeChangeBtnCtr = new naver.maps.CustomControl(mapTypeChangeBtn, {
      position: naver.maps.Position.TOP_LEFT
    });

    naver.maps.Event.addDOMListener(
      mapTypeChangeBtnCtr.getElement(),
      "click",
      () => {
        const currentMapType = this.state.mapType;
        let changedMapType;
        if (currentMapType === "sido") {
          changedMapType = "sigungu";
        } else {
          changedMapType = "sido";
        }
        this.changeMapType(changedMapType);
        this.setState({ mapType: changedMapType });
        mapTypeChangeBtnCtr._element.childNodes[0].classList.toggle(
          "ctr-active"
        );
      }
    );

    map.controls[naver.maps.Position.TOP_LEFT].push(
      mapTypeChangeBtnCtr._element
    );
    // const mapTypeCtlBtnDom:<T> = document.querySelector('#map-type-ctr-btn').tooltip('enable');
    // if(mapTypeCtlBtnDom) mapTypeCtlBtnDom.tooltip('enable');
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

  initSidoGeojson(map: any) {
    return new Promise((resolve, reject) => {
      if (!this.state.sidoMap) this.setState({ sidoMap: sido_2009Json });
      resolve();
    }).then(() => {
      const { sidoMap, sigunguMap } = this.state;
      if (sigunguMap) {
        sigunguMap.forEach((geojson: any) => {
          map.data.removeGeoJson(geojson);
        });
      }
      console.log("sidoMap : ", sidoMap);
      sidoMap.forEach((geojson: any) => {
        map.data.addGeoJson(geojson);
      });
    });
  }

  initSigunguGeojson(map: any) {
    return new Promise((resolve, reject) => {
      if (!this.state.sigunguMap)
        this.setState({ sigunguMap: sigungu_2015Json });
      resolve();
    })
      .then(() => {
        const { sidoMap, sigunguMap } = this.state;
        if (sidoMap) {
          sidoMap.forEach((geojson: any) => {
            map.data.removeGeoJson(geojson);
          });
        }
        sigunguMap.forEach((geojson: any) => {
          map.data.addGeoJson(geojson);
        });
      })
      .catch(err => {
        console.log("err : ", err);
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

    this.initSidoGeojson(map);

    this.setState(
      {
        naver,
        center,
        map
      },
      () => {
        this.setCustomCtrBtn(naver, map, center, zoom);
        this.setMapDetail(map);
        this.setInfoWindow(naver, map);
      }
    );
  }

  changeMapType(type: string) {
    if (type === "sido") this.initSidoGeojson(this.state.map);
    else if (type === "sigungu") this.initSigunguGeojson(this.state.map);
  }

  render() {
    return (
      <div>
        <div id="filterCtl" className="container pt-2 pb-2">
          <div className="row">
            <div className="col-md-12">
              <FilterCtlNav />
            </div>
          </div>
        </div>
        <NaverMapLoad asyncScriptOnLoad={this.naverMapscriptOnLoad} />
        <LocationInfoWindow
          infoWindowRef={this.infoWindowRef}
          selectedLocation={this.state.selectedLocation}
          infowindow={this.state.infowindow}
        />
      </div>
    );
  }
}
