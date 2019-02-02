import {GoogleApiWrapper} from "google-maps-react";
import HomeContainer from "./HomeContainer";
import {MAPS_KEY} from "../../keys";

export default GoogleApiWrapper(
{apiKey:MAPS_KEY}    
)(HomeContainer);