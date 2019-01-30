import FindAddressPresenter from "./FindAddressPresenter";
import React from "react";
import ReactDOM from "react-dom";

interface IState{
    lat:number
    lng:number
}


class FindAddressContainer extends React.Component<any, IState>{
    public mapRef:any;
    public map: google.maps.Map;
    
    constructor(props){
        super(props);
        this.mapRef = React.createRef();
    }
    public componentDidMount(){
        navigator.geolocation.getCurrentPosition(this.handleGeoSuccess, this.handleGeoError);
    }
    public render(){
        return(<FindAddressPresenter mapRef={this.mapRef}/>);
    }

    public handleGeoSuccess = (position:Position) => {
        const {coords:{latitude, longitude}} = position;
        this.setState({lat:latitude, lng:longitude});
        this.loadMap(latitude, longitude);
    }
    public handleGeoError = () => {
        return
    }

    public loadMap = (lat, lng) => {
        const {google} = this.props;
        const maps = google.maps;
        const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
        const latlng = new google.maps.LatLng(lat, lng);
        const mapConfig:google.maps.MapOptions = {
            zoom:15,
            center:latlng,
            disableDefaultUI:true
        }
        this.map = new maps.Map(mapNode, mapConfig);
        this.map.addListener("dragend", this.handleDragEnd);

    }

    public handleDragEnd = () =>{
        const newCenter = this.map.getCenter();
        const lat = newCenter.lat();
        const lng = newCenter.lng();
        this.setState({lat, lng});
       
    }
}


export default FindAddressContainer;