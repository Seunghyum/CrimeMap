import React, { Component } from "react";

interface Props {
  maxCount: number;
  data: any;
}
interface State {}
export default class GuageBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.setColorClass = this.setColorClass.bind(this);
  }

  setColorClass(per: number) {
    if (per < 20) return "success";
    if (per < 40) return "info";
    if (per < 60) return "primary";
    if (per < 80) return "warning";
    return "danger";
  }

  render() {
    const { data, maxCount } = this.props;
    return (
      <div className="row">
        <div className="col-sm-3">
          <h4 className="small font-weight-bold mb-0">{data.region_name}</h4>
        </div>
        <div className="col-sm-7">
          <div className="progress">
            <div
              className={`progress-bar bg-${this.setColorClass(
                (data.count / maxCount) * 100
              )}`}
              role="progressbar"
              style={{
                width: `${(data.count / maxCount) * 100}%`
              }}
              aria-valuenow={(data.count / maxCount) * 100}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
        <div className="col-sm-2">
          <h4 className="small font-weight-bold">
            <span className="float-right">
              {Math.round((data.count / maxCount) * 100 * 100) / 100}%
            </span>
          </h4>
        </div>
      </div>
    );
  }
}
