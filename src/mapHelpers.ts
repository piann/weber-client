import axois from "axios";
import { MAPS_KEY } from './keys';
import { toast } from 'react-toastify';


export const geoCode = async(address:string) => {
    const API_URL = `https://maps.googleapis.com/maps/api/geocode/json?language=ko&address=${address},+Mountain+View,+CA&key=${MAPS_KEY}`;
    const {status, data} = await axois(API_URL);
    if(status===200 && !data.error_message){
        console.log(data);
        const {results} = data;
        if(results.length===1){
            return false;
        }
        const firstPlace = results[0];
        const {
            formatted_address,
            geometry:{
                location:{lat, lng}
            }
        } = firstPlace;
        return {lat, lng, formatted_address}
    } else {
        toast.error(data.error_message || "Some Unknown Error Happened", {hideProgressBar:true});
        return false;
    }
};

export const reverseGeoCode = async (lat:number, lng:number) => {
    const API_URL =  `https://maps.googleapis.com/maps/api/geocode/json?language=ko&latlng=${lat},${lng}&key=${MAPS_KEY}`;
    const {status, data} = await axois(API_URL);
    if(status===200 && !data.error_message){
        const {results} = data;
        const firstPlace = results[0];
        const address = firstPlace.formatted_address;
        return address;
    } else {
        toast.error(data.error_message || "Some Unknown Error Happened", {hideProgressBar:true});
        return false;
    }

}