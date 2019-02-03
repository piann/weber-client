import React from "react";
import HomePresenter from './HomePresenter';
import { RouteComponentProps } from 'react-router';
import {Query} from "react-apollo";
import { userProfile } from 'src/types/api';
import { USER_PROFILE } from 'src/sharedQueries';
import ReactDOM from "react-dom";

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
            minZoom: 8,
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
    
    public onAddressSubmit = () => {
        return
    }


}

export default HomeContainer;