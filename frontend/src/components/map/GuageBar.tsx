import React, { Component } from "react";

interface Props {
  maxCount: number;
  data: {};
}
interface State {}
export default class GuageBar extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.setColorClass = this.setColorClass.bind(this);
  }

  setColorClass(per: number) {
    if (per < 20) return "success";
    else if (per < 40) return "info";
    else if (per < 60) return "primary";
    else if (per < 80) return "warning";
    else return "danger";
  }

  render() {
    console.log(this.props);
    return (
      <div className="row">
        <div className="col-sm-3">
          <h4 className="small font-weight-bold">
            {this.props.data.region_name}
          </h4>
        </div>
        <div className="col-sm-7">
          <div className="progress mb-4">
            <div
              className={`progress-bar bg-${this.setColorClass(
                (this.props.data.count / this.props.maxCount) * 100
              )}`}
              role="progressbar"
              style={{
                width: `${(this.props.data.count / this.props.maxCount) * 100}%`
              }}
              aria-valuenow={
                (this.props.data.count / this.props.maxCount) * 100
              }
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
        <div className="col-sm-2">
          <h4 className="small font-weight-bold">
            <span className="float-right">
              {Math.round(
                (this.props.data.count / this.props.maxCount) * 100 * 100
              ) / 100}
              %
            </span>
          </h4>
        </div>
      </div>
    );
  }
}
