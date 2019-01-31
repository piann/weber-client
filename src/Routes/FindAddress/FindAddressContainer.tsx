import FindAddressPresenter from "./FindAddressPresenter";
import React from "react";
import ReactDOM from "react-dom";
import { reverseGeoCode } from 'src/mapHelpers';

interface IState{
    lat:number
    lng:number
    address:string
}


class FindAddressContainer extends React.Component<any, IState>{
    public mapRef:any;
    public map: google.maps.Map;
    public state = {
        lat:0,
        lng:0,
        address:""
    }
    constructor(props){
        super(props);
        this.mapRef = React.createRef();
    }
    public componentDidMount(){
        navigator.geolocation.getCurrentPosition(this.handleGeoSuccess, this.handleGeoError);
    }
    public render(){
        return(<FindAddressPresenter 
            mapRef={this.mapRef}
            address={this.state.address}
            onInputChange={this.onInputChange}
            onInputBlur={()=>""}
            />
            
        );
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

    public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
          target: { name, value }
        } = event;
        this.setState({
          [name]: value
        } as any);
      };

    public onInputBlur = async () => {

        // const { address } = this.state;
        // const result = await geoCode(address);
        // if (result !== false) {
        //   const { lat, lng, formatted_address: formatedAddress } = result;
        //   this.setState({
        //     address: formatedAddress,
        //     lat,
        //     lng
        //   });
        //   this.map.panTo({ lat, lng });
        // }
      };

    public handleDragEnd = async () =>{
        const newCenter = this.map.getCenter();
        const lat = newCenter.lat();
        const lng = newCenter.lng();
        const address:string = await reverseGeoCode(lat,lng);
        this.setState({
            address,
            lat,
            lng
        });
        console.log(this.state);
       
    }
}


export default FindAddressContainer;