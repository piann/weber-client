import axois from "axios";
import { MAPS_KEY } from './keys';
import { toast } from 'react-toastify';

export const geoCode = () => null;

export const reverseGeoCode = async (lat:number, lng:number) => {
    const API_URL =  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPS_KEY}`;
    const {status, data} = await axois(API_URL);
    if(status===200 && !data.error_message){
        const {results} = data;
        
        const firstPlace = results[0];
        const address = firstPlace.formatted_address;
        return address;
    } else {
        toast.error(data.error_message, {hideProgressBar:true});
        return;
    }

}