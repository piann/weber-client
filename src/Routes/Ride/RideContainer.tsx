import React from "react";
import {Query, Mutation} from "react-apollo";
import {RouteComponentProps} from "react-router-dom";
import RidePresenter from "./RidePresenter";
import { getRide, getRideVariables, userProfile, updateRide, updateRideVariables } from 'src/types/api';
import { GET_RIDE, UPDATE_RIDE_STATUS } from './RideQueries';
import { USER_PROFILE } from "../../sharedQueries";
import { SubscribeToMoreOptions } from 'apollo-client';
import {RIDE_SUBSCRIPTION} from "./RideQueries";


class RideQuery extends Query<getRide,getRideVariables>{}
class ProfileQuery extends Query<userProfile>{}
class RideUpdateMutation extends Mutation<updateRide, updateRideVariables>{}


interface IProps extends RouteComponentProps<any>{}



class RideContainer extends React.Component<IProps>{
    constructor(props:IProps){
        super(props);
        if(!props.match.params.rideId){
            props.history.push("/");
        }
    }
    public render(){
        const {
            match:{
                params:{ rideId }
            }
        } = this.props;
        const rId = parseInt(rideId, 10);
        console.log(this.props);

        return(
        <ProfileQuery query={USER_PROFILE}>{
            ({data:userData}) => (
                <RideQuery query={GET_RIDE} variables={{rideId:rId}}>{

                    ({data, loading, subscribeToMore})=>{
                        const subscribeOption:SubscribeToMoreOptions = {
                            document:RIDE_SUBSCRIPTION,
                            updateQuery:(prev, {subscriptionData})=>{
                                if(subscriptionData.data){
                                    return prev;
                                }
                                console.log(prev, subscriptionData);
                            }
                        }
                        subscribeToMore(subscribeOption);
                        return(
                        <RideUpdateMutation
                        mutation={UPDATE_RIDE_STATUS}
                        refetchQueries={[{query:GET_RIDE, variables:{rideId:rId}}]}>
                        {(updateRideFn)=>(<RidePresenter userData={userData} data={data} loading={loading} updateRideFn={updateRideFn}/>)}
                        </RideUpdateMutation>
                        );
                    }
                }</RideQuery>
            )
        
        }</ProfileQuery>
        );
    }

}

export default RideContainer;