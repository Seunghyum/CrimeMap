import React, { Component } from "React";
import noUiSlider from "noUiSlider";
import "noUiSlider/distribute/nouislider.min.css";
import { CRIME_TYPE } from "../../model";

interface Props {}
interface State {
  nav:string | null;
  year: {
    start: number;
    end: number;
  };
  crimeType: string;
}

export default class FilterCtlNav extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      nav: null,
      year: {
        start: 11,
        end: 17
      },
      crimeType: "전체"
    };

    this.handleCrimeTypeSelectionChange = this.handleCrimeTypeSelectionChange.bind(this);
    this.onChangeFilterDropdown = this.onChangeFilterDropdown.bind(this);
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

  handleCrimeTypeSelectionChange(ct: string) {
    this.setState({crimeType: ct, nav: null});
  }

  onChangeFilterDropdown(nav:string | null){
    this.setState({nav})
  }

  render() {
    return (
      <div
        id="filterCtl"
        className="container pt-2 pb-2"
      >
        <div className="row">
          <div className="col-md-12">
            <ul className='menu-horizontal'>
              <li className="filter-nav">
                <div className={`dropdown ${this.state.nav === 'year' ? 'dropdown--active' : ''}`} tabIndex={3} onBlur={ () => this.onChangeFilterDropdown(null) }>
                  <span 
                    className="dropdown__trigger align-middle" 
                    onClick={() => this.onChangeFilterDropdown("year")}
                  >
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

              <li className="filter-nav crime-type-wrapper">
                <div className={`dropdown ${this.state.nav === 'crime-type' ? 'dropdown--active' : ''}`} tabIndex={0} onBlur={ () => this.onChangeFilterDropdown(null) }>
                  <span 
                    className="dropdown__trigger align-middle" 
                    onClick={() => this.onChangeFilterDropdown("crime-type")}
                  >
                    범죄유형 : {this.state.crimeType}
                    <i className="fas fa-angle-down ml-1" />
                  </span>
                  <div className="dropdown__container">
                    <div className="crime-type-filter dropdown__content">
                      <div  className="item" onClick={() => this.handleCrimeTypeSelectionChange("전체")}>
                        <a>전체</a>
                      </div>
                      {
                        CRIME_TYPE.map(ct => (
                          <div className="item" key={ct} onClick={() => this.handleCrimeTypeSelectionChange(ct)}>
                            <a>
                              {ct}
                            </a>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            
          </div>
        </div>
      </div>
    );
  }
}
