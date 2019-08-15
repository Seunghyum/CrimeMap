import React, { Component } from "React";
import noUiSlider from "noUiSlider";
import "noUiSlider/distribute/nouislider.min.css";
import { CRIME_TYPE } from "../../model";

interface Props {
  filterCtlRef: any;
}
interface State {
  year: {
    start: number;
    end: number;
  };
  crimeType: string;
}

export default class FilterCard extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      year: {
        start: 11,
        end: 17
      },
      crimeType: "계"
    };

    this.handleCrimeTypeSelectionChange = this.handleCrimeTypeSelectionChange.bind(
      this
    );
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

    // yearRangeSlider.on('change', (values, handle, unencoded, tap, positions) => {
    yearRangeSlider.on("change", (...args) => {
      const unencoded = args[2];

      this.setState({
        year: {
          start: unencoded[0],
          end: unencoded[0]
        }
      });
    });
  }

  handleCrimeTypeSelectionChange(event: any) {
    this.setState({crimeType: event.target.value});
  }

  render() {
    return (
      <div
        ref={this.props.filterCtlRef}
        id="filterCard"
        className="card shadow mb-4"
      >
        <a
          href="#collapseCardExample"
          className="d-block card-header py-3"
          data-toggle="collapse"
          role="button"
          aria-expanded="true"
          aria-controls="collapseCardExample"
        >
          <h6 className="m-0 font-weight-bold text-primary">필터</h6>
        </a>
        <div className="collapse show" id="collapseCardExample">
          <div className="card-body mr-2 ml-2">
            <label className="col-form-label mb-1">연도</label>
            <div id="rangeSlider" className="mb-5" />

            <hr />
            <div className="form-group row">
              <label
                htmlFor="crimeType"
                className="col-sm-4 col-form-label pr-0"
              >
                범죄유형
              </label>
              <select
                onChange={this.handleCrimeTypeSelectionChange}
                className="form-control custom-select-sm col-sm-8 pr-0 pl-0"
                id="crimeType"
              >
                <option value="계">전체</option>
                {CRIME_TYPE.map(ct => (
                  <option key={ct}>{ct}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
