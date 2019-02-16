import {gql} from "apollo-boost";

export const GET_CHAT = gql`
    query getChat($chatId:Int!){
        GetChat(chatId:$chatId){
            ok
            error
            chat{
                passengerId
                driverId
                rideId
                messages{
                    id
                    text
                    userId
                }
            }
        }
    }
`;