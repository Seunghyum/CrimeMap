import React, { Component } from "React";
import GuageBar from "./GuageBar";

interface Props {
  infoWindowRef: React.RefObject<HTMLInputElement>;
  selectedLocation: {
    setProperty(name:string, value:boolean):void;
    property_SIDO_NM: string | null;
  };
  infowindow: any;
}
interface State {
  property_SIDO_NM: String | null;
  maxCount: number;
  sigungus: {
    region_name: string;
    region_code: string;
    type: number;
    count: number;
  }[];
}

export default class LocationWindowInfo extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      property_SIDO_NM: null,
      maxCount: 10,
      sigungus: [
        {
          region_name: "수원시",
          region_code: "3461",
          type: 0,
          count: 1
        },
        {
          region_name: "성남시",
          region_code: "3461",
          type: 0,
          count: 2
        },
        {
          region_name: "강남구",
          region_code: "3461",
          type: 0,
          count: 3
        },
        {
          region_name: "강서구",
          region_code: "3461",
          type: 0,
          count: 4
        },
        {
          region_name: "수원시",
          region_code: "3461",
          type: 0,
          count: 5
        },
        {
          region_name: "성남시",
          region_code: "3461",
          type: 0,
          count: 6
        },
        {
          region_name: "강남구",
          region_code: "3461",
          type: 0,
          count: 7
        },
        {
          region_name: "강서구",
          region_code: "3461",
          type: 0,
          count: 8
        },
        {
          region_name: "수원시",
          region_code: "3461",
          type: 0,
          count: 9
        },
        {
          region_name: "성남시",
          region_code: "3461",
          type: 0,
          count: 10
        }
      ]
    };
    this.setCloseInfoWindow = this.setCloseInfoWindow.bind(this);
  }

  setCloseInfoWindow() {
    if (this.props.infowindow) this.props.infowindow.close();
  }

  componentDidMount() {
    const dom = document.getElementById(
      "infoWindowCancelBtn"
    ) as HTMLElement | null;
    if (dom) {
      dom.addEventListener("click", () => {
        this.props.infowindow.close();
        this.props.selectedLocation.setProperty("focus", false);
      });
    }
  }

  render() {
    return (
      <div ref={this.props.infoWindowRef}>
        <div className="card shadow infoWindow">
          <div className="card-header py-3">
            <h6 className="d-inline-block m-0 font-weight-bold text-primary">
              {this.props.selectedLocation
                ? this.props.selectedLocation.property_SIDO_NM
                : ""}
            </h6>
            <button id="infoWindowCancelBtn" type="button" className="close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="card-body list">
            {this.state.sigungus.map((s: {}, idx: number) => {
              return (
                <GuageBar data={s} maxCount={this.state.maxCount} key={idx} />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
