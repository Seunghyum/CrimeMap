import React, { Component } from "React";
import { CRIME_TYPE } from "../../../model";

interface Props {
  nav: string | null;
  onChangeFilterDropdown: any;
  onBlur: any;
}
interface State {
  crimeType: string;
}

export default class CrimeTypeFilter extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      crimeType: "전체"
    };

    this.handleCrimeTypeSelectionChange = this.handleCrimeTypeSelectionChange.bind(this);
  }

  handleCrimeTypeSelectionChange(ct: string) {
    this.setState({ crimeType: ct });
    this.props.onBlur()
  }

  render() {
    return (
      <li 
        className="filter-nav crime-type-wrapper"
        onClick={this.props.onChangeFilterDropdown}
      >
        <div
          className={`dropdown ${
            this.props.nav === "crime-type" ? "dropdown--active" : ""
          }`}
        >
          <span className="dropdown__trigger align-middle">
            범죄유형 : {this.state.crimeType}
            <i className="fas fa-angle-down ml-1" />
          </span>
          <div className="dropdown__container">
            <div className="crime-type-filter dropdown__content">
              <div
                className="item"
                onClick={() =>
                  this.handleCrimeTypeSelectionChange("전체")
                }
              >
                <a>전체</a>
              </div>
              {CRIME_TYPE.map(ct => (
                <div
                  className="item"
                  key={ct}
                  onClick={() =>
                    this.handleCrimeTypeSelectionChange(ct)
                  }
                >
                  <a>{ct}</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </li>
    );
  }
}