import React, { Component } from "React";
import noUiSlider from "noUiSlider";
import "noUiSlider/distribute/nouislider.min.css";

interface Props {
  nav: string | null;
  onChangeFilterDropdown: any;
  onBlur: any;
}
interface State {
  year: {
    start: number;
    end: number;
  };
}

export default class YearFilter extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      year: {
        start: 11,
        end: 17
      }
    };
  }

  componentDidMount() {
    const slider = document.getElementById("rangeSlider") as HTMLElement;

    const yearRangeSlider = noUiSlider.create(slider, {
      start: [this.state.year.start, this.state.year.end],
      snap: true,
      connect: true,
      range: {
        min: 11,
        "16.5%": 12,
        "33%": 13,
        "49.5%": 14,
        "66%": 15,
        "82.5%": 16,
        max: 17
      },
      pips: {
        mode: "steps",
        density: 16
      }
    });

    yearRangeSlider.on("change", (...args) => {
      const unencoded = args[2];

      this.setState({
        year: {
          start: unencoded[0],
          end: unencoded[1]
        }
      });
    });
  }

  render() {
    return (
      <li className="filter-nav" onClick={this.props.onChangeFilterDropdown}>
        <div
          className={`dropdown ${
            this.props.nav === "year" ? "dropdown--active" : ""
          }`}
        >
          <span className="dropdown__trigger align-middle">
            연도 : 20{this.state.year.start} ~ 20{this.state.year.end}
            <i className="fas fa-angle-down ml-1" />
          </span>
          <div className="dropdown__container">
            <div className="year-filter dropdown__content">
              <div id="rangeSlider" className="mb-5" />
            </div>
          </div>
        </div>
      </li>
    );
  }
}
