import React, { Component } from "react";
import ReactLoading from "react-loading";

interface Props {
  isLoading: boolean;
}
interface State {}

class LoadingOverlay extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div
        className={
          `loading-overlay-wrapper ${this.props.isLoading ? "" : "d-none"}`
        }
      >
        <ReactLoading
          className="loading-overlay"
          type={"spin"}
          height={64}
          width={64}
        />
      </div>
    );
  }
}

export default LoadingOverlay;
