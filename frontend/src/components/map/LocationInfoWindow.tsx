import React, { Component } from "React";

interface Props {
    outerDivRef:string,
    selectedLocation:Object
    infowindow: any
}
interface State {}

export default  class LocationWindowInfo extends Component<Props, State> {
    constructor(props: any) {
        super(props);

        this.setCloseInfoWindow = this.setCloseInfoWindow.bind(this);
        // this.onClick = this.onClick.bind(this);
    }

    setCloseInfoWindow() {
        console.log("asdsadasd")
        if(this.props.infowindow) this.props.infowindow.close()
        console.log("this.props : ", this.props)
    }

    componentDidMount() {
        // this.setCloseInfoWindow = this.setCloseInfoWindow.bind(this);
        console.log("componentDidMount")
    }
    // componentDidUpdate() {
    //     console.log("componentDidUpdate")
    //     console.log(123123);
    //     // this.setCloseInfoWindow = this.setCloseInfoWindow.bind(this);
    //     // console.log("this.props : ", this.props)
    // }

    onClick = (e) => {
        if (e) {
            e.preventDefault();
        }

        console.log(123123);
        console.log('asdfsadf');
    }

    

    render() {
        
        return (
            <div ref={this.props.outerDivRef}>
                <div className="card shadow infoWindow">
                    <div className="card-header py-3">
                        <h6 className="d-inline-block m-0 font-weight-bold text-primary">{this.props.selectedLocation ? this.props.selectedLocation.property_SIDO_NM : ''}</h6>
                        <button type="button" className="close" onClick={this.onClick}>
                            <span aria-hidden="true" >×</span>
                        </button>
                        {/* <a href="#" onClick={this.onClick}>123123</a> */}
                    </div>
                    <div className="card-body">
                        {this.props.selectedLocation ? this.props.selectedLocation.property_SIDO_NM : ""}
                    </div>
                </div>
            </div>
        );
    }
}