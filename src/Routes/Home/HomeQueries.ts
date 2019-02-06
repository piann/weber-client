import {gql} from "apollo-boost";

export const REPORT_LOCATION = gql`
    mutation reportMovement($lat:Float!, $lng:Float!){
        ReportMovement(lastLat:$lat, lastLng:$lng){
            ok
            error
        }
    }
`;

export const GET_NEARBY_DRIVERS = gql`
    query getDrivers{
        GetNearbyDrivers{
            ok
            drivers{
                id
                lastLat
                lastLng
            }
        }
    }
`;

export const REQUEST_RIDE = gql`
    mutation requestRide(
        $pickUpAddress: String!
        $pickUpLat: Float!
        $pickUpLng: Float!
        $dropOffAddress: String!
        $dropOffLat: Float!
        $dropOffLng: Float!
        $price: Float!
        $duration: String!
        $distance: String!
    ){
        RequestRide(
            pickUpAddress: $pickUpAddress
            pickUpLat: $pickUpLat
            pickUpLng: $pickUpLng
            dropOffAddress: $dropOffAddress
            dropOffLat: $dropOffLat
            dropOffLng: $dropOffLng
            price: $price
            duration: $duration
            distance: $distance
        ){
            ok,
            error
            ride{
                id
            }
        }
    }
`;