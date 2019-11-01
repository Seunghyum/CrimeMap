import React, { Component } from "React"
import GuageBar from "./GuageBar"

interface Props {
  infoWindowRef: React.RefObject<HTMLInputElement>
  selectedLocation: {
    setProperty(name: string, value: boolean): void;
    property_NAME: string | null;
  }
  infowindow: any
}
interface State {
  property_NAME: String | null
  maxCount: number
  sigungus: {
    region_name: string;
    region_code: string;
    type: number;
    count: number;
  }[]
}

export default class LocationWindowInfo extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      property_NAME: null,
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
    }
    this.setFocusLocation = this.setFocusLocation.bind(this)
  }

  setFocusLocation() {
    console.log("clicked setFocusLocation")
  }

  componentDidMount() {
    const DOMinfoWindowCancelBtn = document.getElementById(
      "infoWindowCancelBtn"
    ) as HTMLElement | null
    if (DOMinfoWindowCancelBtn) {
      console.log("====DOMinfoWindowCancelBtn======")
      DOMinfoWindowCancelBtn.addEventListener("click", () => {
        this.props.infowindow.close()
        this.props.selectedLocation.setProperty("focus", false)
      })
    }

    const DOMguageBarWrapper: void | HTMLCollection = document.getElementsByClassName(
      "guage-bar-wrapper"
    )
    if (DOMguageBarWrapper && DOMguageBarWrapper.length > 0) {
      console.log("====DOMguageBarWrapper======")
      for (let i = 0; i < DOMguageBarWrapper.length; i += 1) {
        DOMguageBarWrapper[i].addEventListener("click", () => {
          this.setFocusLocation()
        })
      }
    }
  }

  render() {
    const { infoWindowRef, selectedLocation } = this.props
    const { maxCount, sigungus } = this.state
    return (
      <div ref={infoWindowRef}>
        <div className="card shadow infoWindow">
          <div className="card-header py-3">
            <h6 className="d-inline-block m-0 font-weight-bold text-primary">
              {selectedLocation ? selectedLocation.property_NAME : ""}
            </h6>
            <button id="infoWindowCancelBtn" type="button" className="close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="card-body list">
            {sigungus.map((s: {}, idx: number) => {
              return (
                <a className="guage-bar-wrapper" key={idx}>
                  <GuageBar data={s} maxCount={maxCount} />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
