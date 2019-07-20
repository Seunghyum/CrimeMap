import React, { Component } from "React";

interface Props {
  infowindowRef: string;
  selectedLocation: Object;
  infowindow: any;
}
interface State {}

export default class LocationWindowInfo extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.setCloseInfoWindow = this.setCloseInfoWindow.bind(this);
  }

  setCloseInfoWindow() {
    if (this.props.infowindow) this.props.infowindow.close();
  }

  componentDidMount() {
    document.getElementById("infoWindowCancelBtn").addEventListener('click', () => {
      this.props.infowindow.close()
    });
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
            <button id='infoWindowCancelBtn' type="button" className="close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="card-body">
            {this.props.selectedLocation
              ? this.props.selectedLocation.property_SIDO_NM
              : ""}
          </div>
        </div>
      </div>
    );
  }
}
