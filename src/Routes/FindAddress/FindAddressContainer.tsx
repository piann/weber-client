import FindAddressPresenter from "./FindAddressPresenter";
import React from "react";
import ReactDOM from "react-dom";
import { geoCode, reverseGeoCode } from 'src/mapHelpers';
import { toast } from 'react-toastify';
import { RouteComponentProps } from 'react-router-dom';

interface IState{
    lat:number
    lng:number
    address:string
}

interface IProps extends RouteComponentProps<any>{
    google: any    
}


class FindAddressContainer extends React.Component<IProps, IState>{
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
            onInputBlur={this.onInputBlur}
            onPickPlace={this.onPickPlace}
            />
            
        );
    }

    public handleGeoSuccess = (position:Position) => {
        const {coords:{latitude, longitude}} = position;
        this.setState({lat:latitude, lng:longitude});
        this.loadMap(latitude, longitude);
        this.reverseGeoCodeAddress(latitude, longitude);
    }
    public handleGeoError = () => {
        return;
    }

    public loadMap = (lat, lng) => {
        const {google} = this.props;
        const maps = google.maps;
        const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
        const latlng = new google.maps.LatLng(lat, lng);
        const mapConfig:google.maps.MapOptions = {
            zoom:15,
            minZoom : 9,
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
        
        const { address } = this.state;
        console.log("IoIB")
        const result = await geoCode(address);
        if (result !== false) {
        const { lat, lng, formatted_address} = result;
        this.setState({
            address:formatted_address,
            lat,
            lng
          });
          this.map.panTo({ lat, lng });
        } else {
            toast.error("Can't get Address. Just move the map",{hideProgressBar:true});
        }
        
      };

    public handleDragEnd = async () =>{
        const newCenter = this.map.getCenter();
        const lat = newCenter.lat();
        const lng = newCenter.lng();
        this.setState({
            lat,
            lng
        });
        this.reverseGeoCodeAddress(lat,lng);
    }

    public reverseGeoCodeAddress = async (lat:number, lng:number) => {
        const address = await reverseGeoCode(lat,lng);
        if(address !==false){
            this.setState({
                address
            })
        }
    }

    public onPickPlace = () => {
        const { lat, lng, address } = this.state;
        const {history} = this.props;
        history.push({
            pathname:"/add-place",
            state:{
                lat,
                lng,
                address
            }
        })
        console.log(lat, lng, address);
    }
}


export default FindAddressContainer;