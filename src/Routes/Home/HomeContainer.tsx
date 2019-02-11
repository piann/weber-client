import React from "react";
import HomePresenter from './HomePresenter';
import { RouteComponentProps } from 'react-router';
import {Query, Mutation, MutationFn} from "react-apollo";
import { userProfile, reportMovement, reportMovementVariables, getDrivers, requestRide, requestRideVariables, accpetRide, accpetRideVariables} from 'src/types/api';
import { USER_PROFILE } from 'src/sharedQueries';
import ReactDOM from "react-dom";
import {SubscribeToMoreOptions} from "apollo-client";
import {geoCode, reverseGeoCode} from "../../mapHelpers";
import {toast} from "react-toastify";
import { graphql } from 'react-apollo'
import { REPORT_LOCATION, GET_NEARBY_DRIVERS, REQUEST_RIDE, GET_NEARBY_RIDE, ACCEPT_RIDE, SUBSCRIBE_NEARBY_RIDES } from './HomeQueries';
import carIcon from "../../images/car.png";
import {css} from "glamor";

interface IState{
    isMenuOpen: boolean;
    fromAddress:string;
    lat:number;
    lng:number;
    toAddress:string;
    toLat:number;
    toLng:number;
    distance?:string;
    duration?:string;
    price?:string;
    driverModeOn:boolean;
    isDriving:boolean;
}

interface IProps extends RouteComponentProps<any>{
    google:any;
    reportLocation: MutationFn;
}

class ProfileQuery extends Query<userProfile>{
}

class GetNearbyDriverQueries extends Query<getDrivers>{

}

class RequestRideMutation extends Mutation<requestRide, requestRideVariables>{

}

class GetNearbyRides extends Query<getDrivers>{}

class AcceptRideMutation extends Mutation<accpetRide, accpetRideVariables>{}



class HomeContainer extends React.Component<IProps,IState>{
    public mapRef:any;
    public map:any;
    public userMarker:google.maps.Marker;
    public toMarker:google.maps.Marker;
    public directions:google.maps.DirectionsRenderer;
    public drivers: google.maps.Marker[];
    public state ={
        isMenuOpen:false,
        fromAddress:"",
        lat:0,
        lng:0,
        toAddress:"",
        toLat: 0,
        toLng: 0,
        distance:"",
        duration:"",
        price:"",
        isDriving:false,
        driverModeOn:false,
    }
    constructor(props){
        super(props);
        this.mapRef = React.createRef();
        this.drivers = [];
    }
    public componentDidMount(){
        navigator.geolocation.getCurrentPosition(
            this.handleGeoSuccess,
            this.handleGeoError
        );
        
    }

    render(){
        const {isMenuOpen, isDriving, driverModeOn, price, duration, distance, fromAddress, toLat, toLng, toAddress, lat, lng} = this.state;
        return(
            <ProfileQuery query={USER_PROFILE} onCompleted={this.handleProfileQuery}>
                {
                    
                ({data, loading}) =>(
                    <GetNearbyDriverQueries
                    query={GET_NEARBY_DRIVERS}
                    skip={driverModeOn || isDriving}
                    pollInterval={5000}
                    onCompleted={this.handleNearbyDriverQuery}
                    >
                        {() => (
                    <RequestRideMutation mutation={REQUEST_RIDE} 
                    variables={{price:parseFloat(price), duration, distance, pickUpAddress:fromAddress, pickUpLat:lat, pickUpLng:lng, dropOffAddress: toAddress, dropOffLat: toLat, dropOffLng: toLng, }}
                    onCompleted={this.handleRideRequest}
                    >
                        {(requestRideFn) => (
                        <GetNearbyRides query={GET_NEARBY_RIDE} skip={!isDriving}>
                            {({subscribeToMore, data:nearbyRideData})=>{
                                const rideSubscriptionOption:SubscribeToMoreOptions = {
                                    document:SUBSCRIBE_NEARBY_RIDES,
                                    updateQuery: (prev, {subscriptionData}) => {
                                        if(!subscriptionData){
                                            return prev;
                                        }
                                        
                                        const newObject = Object.assign({}, prev, {
                                            GetNearbyRide: {
                                              ...prev.GetNearbyRide,
                                              ride: subscriptionData.data.NearbyRideSubscription
                                            }
                                        });
                                        console.log(newObject);
                                        return newObject;
                                        
                                    }
                                };
                                if(isDriving){
                                    subscribeToMore(rideSubscriptionOption);
                                }
                                return (
                                    <AcceptRideMutation mutation={ACCEPT_RIDE} onCompleted={this.handleRideAcceptance}>
                                    {(acceptRideFn)=>(
                                    <HomePresenter isMenuOpen={isMenuOpen} toggleMenu={this.toggleMenu} loading={loading} mapRef={this.mapRef}
                                    toAddress={this.state.toAddress} onInputChange={this.onInputChange} onAddressSubmit={this.onAddressSubmit} price={this.state.price} userData={data} requestRideFn={requestRideFn} nearbyRide={nearbyRideData} acceptRideFn={acceptRideFn}/>
                                    )
                                    }
                                    </AcceptRideMutation>
                                )
                            }}
                        </GetNearbyRides>   
                        )}
                    </RequestRideMutation>
                    )

                    }

                    </GetNearbyDriverQueries>
                )
                
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
        console.log(lat, lng);
        this.loadMap(lat, lng);

    }
    public handleGeoError = () =>{
        console.log("Error. No location.");
    }
    public handleGeoWatchSuccess = async (position:Position) => {
        const {reportLocation} = this.props;
        const {coords:{latitude:lat, longitude:lng}} = position;
        this.userMarker.setPosition({lat, lng});
        // this.map.panTo({lat, lng});
        reportLocation({
            variables:{
                lat,
                lng
            }
        });
        const fromAddress = await this.getAddressFromLatLng(lat, lng);
        if(fromAddress !== false){
            this.setState({
                fromAddress
            });
        }
    }
    public handleGeoWatchError = () =>{
        console.log("Error in tracking position")
    }

    public loadMap = (lat, lng) => {
        const{ google} = this.props;
        const maps = google.maps;
        const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
        if(!mapNode){
            setTimeout(()=>{this.loadMap(lat,lng)},200);
            return;
        }
        const mapConfig:google.maps.MapOptions = {
            center:{
                lat,
                lng
            },
            disableDefaultUI:true,
            disableDoubleClickZoom: true,
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
                scale:5
            }
        }
        this.userMarker = new maps.Marker(userMarkerOptions);
        this.userMarker.setMap(this.map);
        const watchOptions:PositionOptions ={
            enableHighAccuracy:true
        }
        navigator.geolocation.watchPosition(this.handleGeoWatchSuccess, this.handleGeoWatchError, watchOptions);

        maps.event.addListener(this.map, "dblclick", (e)=> 
        {   
            if(!this.state.driverModeOn){
                this.setMarkerByClick(e);
            }
        });    

    } 

    public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
          target: { name, value }
        } = event;
        this.setState({
          [name]: value
        } as any);
    }


    public getAddressFromLatLng = async (lat:number, lng:number) => {
        const address = await reverseGeoCode(lat,lng);
        return address;
    }

    public setMarkerByClick = async (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        await this.setMarkerByLatLng(lat,lng);

    }

    public setMarkerByLatLng = async (lat, lng) => {
        if(this.toMarker){
            this.toMarker.setMap(null);
        }
        const toMarkerOptions:google.maps.MarkerOptions = {
            position:{
                lat,
                lng
            },
        }
        this.toMarker = new google.maps.Marker(toMarkerOptions);
        this.toMarker.setMap(this.map);
        const bounds = new google.maps.LatLngBounds();
        bounds.extend({lat, lng});
        bounds.extend({lat:this.state.lat, lng:this.state.lng});
        this.map.fitBounds(bounds);
        this.setState({
            toLat:lat,
            toLng:lng
          }, this.createPath);
        const toAddress = await this.getAddressFromLatLng(lat,lng);
        if(toAddress !== false){
            this.setState({
                toAddress
            });
        }

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
          }, this.createPath);

        } else {
            toast.error("Can't get Address. Pick from the map by double-click",{hideProgressBar:true});
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
              travelMode: google.maps.TravelMode.TRANSIT
          };
          console.log("direction setting");
          directionService.route(directionOptions, this.handleRoute);
      }

      public handleRoute = (
        result: google.maps.DirectionsResult,
        status: google.maps.DirectionsStatus
      ) => {
          console.log(result, status);
          if(status === google.maps.DirectionsStatus.OK){
            const {routes} = result;
            const {
                distance:{text: distance},
                duration:{text: duration}
            } = routes[0].legs[0];
            console.log(distance, duration);
            this.directions.setDirections(result);
            this.directions.setMap(this.map);
            this.setState({
                distance,
                duration
            }, this.setPrice)
          } else {
            toast.error("No proper Routes for this destination!",{hideProgressBar:true});
          }
      }
      public handleSubscriptionUpdate = (data) => {
        console.log(data);
      }
      public setPrice = () =>{
        const {distance} = this.state;
        if(distance !== ""){
            const distanceNumber = Number(parseFloat(distance.replace(",","."))).toFixed(2);
            this.setState({
                price: distanceNumber
            });
        }
      }

      public handleProfileQuery = (data:userProfile) => {
          const {GetMyProfile} = data;
          if(GetMyProfile.user){
              const {isDriving, driverModeOn} = GetMyProfile.user;
              this.setState({
                  isDriving,
                  driverModeOn
              })
          } else {
              console.log("Error on getting user profile")
          }
          
      }

      public handleRideRequest = (reqRideData:requestRide) => {
        const {history} = this.props;
        const {RequestRide} = reqRideData;
        if(RequestRide.ok){
            toast.success(`Drive requested, finding a driver`,{hideProgressBar:true, className: css({
                background: "#efeff2 !important",
                color:"#a1887f",
                fontSize:14
            })});
            history.push(`/ride/${RequestRide.ride!.id}`)
        } else {
            toast.error(RequestRide.error,{hideProgressBar:true});
        }
      }

      public handleRideAcceptance = (data: accpetRide) => {
          const {UpdateRideStatus} = data; 
          const {history} = this.props;
          if(UpdateRideStatus.ok){
              history.push(`/ride/${UpdateRideStatus.rideId}`);
          }

      }
      public handleNearbyDriverQuery = (data: {}|getDrivers) => {
        if("GetNearbyDrivers" in data){
            const {
                GetNearbyDrivers:{
                    drivers, ok
                } 
            } = data;
            if(drivers && ok){
                for(const driver of drivers){
                    if(driver && driver.lastLat && driver.lastLng){
                        const existingDriver:
                        |google.maps.Marker 
                        |undefined = this.drivers.find(
                            (driverMarker:google.maps.Marker) => {
                                const markerId = driverMarker.get("ID");
                                return markerId === driver.id;
                            }
                        );

                        if(existingDriver){
                            existingDriver.setPosition({
                                lat:driver.lastLat,
                                lng:driver.lastLng
                            });
                          existingDriver.setMap(this.map);
                        } else {
                        const markerOptions: google.maps.MarkerOptions = {
                            position:{
                                lat:driver.lastLat!,
                                lng:driver.lastLng!
                            },
                            icon:{
                                path:google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                                scale:5
                            }
                            
                        }
                        const newMarker: google.maps.Marker = new google.maps.Marker(
                            markerOptions
                        );
                        console.log(`${carIcon}`);
                        newMarker.set("ID", driver.id);
                        newMarker.setMap(this.map);
                        this.drivers.push(newMarker);
                        }
                    }
                }
            }
        }
      }


}

export default graphql<any,reportMovement, reportMovementVariables>(REPORT_LOCATION, {
    name:"reportLocation"
})(HomeContainer);