import React, { Component } from "React"
import YearFilter from "./filters/YearFilter"
import CrimeTypeFilter from "./filters/CrimeTypeFilter"
// @ts-ignore
import onClickOutside from "react-onclickoutside"

interface Props {}
interface State {
  nav: string | null
  year: {
    start: number;
    end: number;
  }
  crimeType: string
}

class FilterCtlNav extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      nav: null,
      year: {
        start: 11,
        end: 17
      },
      crimeType: "전체"
    }
    this.handleCrimeTypeSelectionChange = this.handleCrimeTypeSelectionChange.bind(
      this
    )
    this.onChangeFilterDropdown = this.onChangeFilterDropdown.bind(this)
  }

  handleCrimeTypeSelectionChange(ct: string) {
    this.setState({ crimeType: ct, nav: null })
  }

  onChangeFilterDropdown(nav: string | null) {
    this.setState({ nav })
  }

  handleClickOutside() {
    this.onChangeFilterDropdown(null)
  }

  render() {
    const { nav } = this.state
    return (
      <ul className="menu-horizontal">
        <YearFilter
          nav={nav}
          onBlur={() => this.onChangeFilterDropdown(null)}
          onChangeFilterDropdown={() => this.onChangeFilterDropdown("year")}
        />
        <CrimeTypeFilter
          nav={nav}
          onBlur={() => this.onChangeFilterDropdown(null)}
          onChangeFilterDropdown={() => {
            this.onChangeFilterDropdown("crime-type")
          }}
        />
      </ul>
    )
  }
}

export default onClickOutside(FilterCtlNav)
