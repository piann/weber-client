import React from "react";
import HomePresenter from './HomePresenter';
import { RouteComponentProps } from 'react-router';
import {Query} from "react-apollo";
import { userProfile } from 'src/types/api';
import { USER_PROFILE } from 'src/sharedQueries';
import ReactDOM from "react-dom";

import {geoCode} from "../../mapHelpers";
import {toast} from "react-toastify";

interface IState{
    isMenuOpen: boolean;
    lat:number;
    lng:number;
    toAddress:string;
    toLat:number;
    toLng:number;
}

interface IProps extends RouteComponentProps<any>{
    google:any;
}

class ProfileQuery extends Query<userProfile>{

}

class HomeContainer extends React.Component<IProps,IState>{
    public mapRef:any;
    public map:any;
    public userMarker:google.maps.Marker;
    public toMarker:google.maps.Marker;
    public directions:google.maps.DirectionsRenderer;
    public state ={
        isMenuOpen:false,
        lat:0,
        lng:0,
        toAddress:"",
        toLat: 0,
        toLng: 0,
    }
    constructor(props){
        super(props);
        this.mapRef = React.createRef();
    }
    public componentDidMount(){
        navigator.geolocation.getCurrentPosition(
            this.handleGeoSuccess,
            this.handleGeoError
        );
        
    }

    render(){
        const {isMenuOpen} = this.state;
        return(
            <ProfileQuery query={USER_PROFILE}>
                {
                    
                ({loading}) =>(<HomePresenter isMenuOpen={isMenuOpen} toggleMenu={this.toggleMenu} loading={loading} mapRef={this.mapRef}
                toAddress={this.state.toAddress} onInputChange={this.onInputChange} onAddressSubmit={this.onAddressSubmit} />)
                }
            </ProfileQuery>        
        )
    }
    public toggleMenu = () => {
        this.setState(state =>{
            return {
                isMenuOpen: !state.isMenuOpen
            };
        });
    }

    public handleGeoSuccess = (position:Position) => {
        const {coords:{latitude:lat, longitude:lng}} = position;
        this.setState({
            lat,
            lng
        });
        this.loadMap(lat, lng);

    }
    public handleGeoError = () =>{
        console.log("Error. No location.");
    }
    public handleGeoWatchSuccess = (position:Position) => {
        const {coords:{latitude:lat, longitude:lng}} = position;
        this.userMarker.setPosition({lat, lng});
        this.map.panTo({lat, lng});
    }
    public handleGeoWatchError = () =>{
        console.log("Error in tracking position")
    }

    public loadMap = (lat, lng) => {
        const{ google} = this.props;
        const maps = google.maps;
        const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
        const mapConfig:google.maps.MapOptions = {
            center:{
                lat,
                lng
            },
            disableDefaultUI:true,
            zoom:13
        }
        this.map = new maps.Map(mapNode, mapConfig);
        const userMarkerOptions:google.maps.MarkerOptions = {
            position:{
                lat,
                lng
            },
            icon:{
                path:maps.SymbolPath.CIRCLE,
                scale:6
            }
        }
        this.userMarker = new maps.Marker(userMarkerOptions);
        this.userMarker.setMap(this.map);
        const watchOptions:PositionOptions ={
            enableHighAccuracy:true
        }
        navigator.geolocation.watchPosition(this.handleGeoWatchSuccess, this.handleGeoWatchError, watchOptions);
    } 

    public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
          target: { name, value }
        } = event;
        this.setState({
          [name]: value
        } as any);
    }
    
    public onAddressSubmit = async () => {
        const { toAddress } = this.state;
        const {google} = this.props;
        const maps = google.maps;
        const result = await geoCode(toAddress);
        if (result !== false) {
        
        const { lat:toLat, lng:toLng, formatted_address} = result;
        
          if(this.toMarker){
              this.toMarker.setMap(null);
          }
          const toMarkerOptions:google.maps.MarkerOptions = {
            position:{
                lat:toLat,
                lng:toLng
            },
        }
        this.toMarker = new maps.Marker(toMarkerOptions);
        this.toMarker.setMap(this.map);
        const bounds = new maps.LatLngBounds();
        bounds.extend({lat:toLat, lng:toLng});
        bounds.extend({lat:this.state.lat, lng:this.state.lng});
        this.map.fitBounds(bounds);
        this.setState({
            toAddress:formatted_address,
            toLat,
            toLng
          } this.createPath);

        } else {
            toast.error("Can't get Address. Just move the map",{hideProgressBar:true});
        }
        
      }
      public createPath = () => {
          const {toLat, toLng, lat, lng} = this.state;
          if(this.directions){
              this.directions.setMap(null);
          }
          const renderOptions:google.maps.DirectionsRendererOptions = {
              suppressMarkers:true,
              polylineOptions:{
                  strokeColor:"#000"
              }
          }
          this.directions = new google.maps.DirectionsRenderer(renderOptions);
          const to = new google.maps.LatLng(toLat, toLng);
          const from = new google.maps.LatLng(lat, lng);
          const directionService:google.maps.DirectionsService = new google.maps.DirectionsService();
          const directionOptions:google.maps.DirectionsRequest = {
              destination: to,
              origin: from,
              travelMode: google.maps.TravelMode.DRIVING
          };
          directionService.route(directionOptions, this.handleRoute);
      }

      public handleRoute = (result, status) => {
          if(status === google.maps.DirectionsStatus.OK){
            const {routes} = result;
            const {
                disatnce:{text: disatnce},
                duration:{text: duration}
            } = routes[0].legs[0];
            console.log(disatnce, duration);
            this.directions.setDirections(result);
            this.directions.setMap(this.map);

          } else {
            toast.error("No proper Routes for this destination!",{hideProgressBar:true});
          }
      }


}

export default HomeContainer;