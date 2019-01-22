import React from "react";
import MenuPresenter from "./MenuPresenter";
import {Mutation, Query} from "react-apollo";
import { userProfile, toggleDriving } from 'src/types/api';
import { USER_PROFILE } from 'src/sharedQueries';
import { TOGGLE_DRIVING } from "./MenuQueries";
import { toast } from 'react-toastify';
import {css} from 'glamor';

class ProfileQuery extends Query<userProfile>{}
class ToggleDrivingMutation extends Mutation<toggleDriving>{}

class MenuContainer extends React.Component{
    public state ={

    };

    public render(){
        return(
            <ToggleDrivingMutation
            mutation={TOGGLE_DRIVING}
            update = {(cache, {data}) => {
                if(data){
                    const {ToggleDrivingMode} = data;
                    if(!ToggleDrivingMode.ok){
                        toast.error(ToggleDrivingMode.error, {hideProgressBar:true, className: css({
                            background: "#efeff2 !important",
                            color:"#a1887f",
                            fontSize:14
                        })});
                        return;
                    }
                    const query:userProfile | null = cache.readQuery({
                        query:USER_PROFILE
                    });
                    
                    if(query){
                        const{GetMyProfile:{user}} = query;
                        if(user){
                            user.isDriving = !user.isDriving;
                        }
                    }
                    
                    cache.writeQuery({
                        query:USER_PROFILE, data:query
                    });
                }

            }
            }
            >
                {toggleDrivingFn => (
                    <ProfileQuery query={USER_PROFILE}>
                    {
                        ({data, loading}) => (<MenuPresenter data={data} loading={loading} toggleDrivingFn={toggleDrivingFn}/>)
                    }
                </ProfileQuery>
                )}
            
            </ToggleDrivingMutation>
        );

    }
}

export default MenuContainer;