import React from "react";
import MenuPresenter from "./MenuPresenter";
import {Mutation, Query, MutationFn} from "react-apollo";
import { userProfile, modifyDrivingStatus, modifyDrivingStatusVariables } from 'src/types/api';
import { USER_PROFILE } from 'src/sharedQueries';
import { MODIFY_DRIVING_STATUS } from "./MenuQueries";
import { toast } from 'react-toastify';
import {css} from 'glamor';

class ProfileQuery extends Query<userProfile>{}
// class ToggleDrivingMutation extends Mutation<toggleDriving>{}
class ModifyDrivingStatusMutation extends Mutation<modifyDrivingStatus, modifyDrivingStatusVariables>{}

interface IState{
    driverModeOn:boolean,
    isDriving:boolean
}


class MenuContainer extends React.Component<any, IState>{
    
    public drivingStatusMutation: MutationFn<modifyDrivingStatus, modifyDrivingStatusVariables>;
    public state = {
        driverModeOn:false,
        isDriving:false,
    };

    public render(){
        
        const {driverModeOn, isDriving} = this.state;
        return(
            <ModifyDrivingStatusMutation
            mutation={MODIFY_DRIVING_STATUS}
            variables={{driverModeOn, isDriving}}
            
            update = {(cache, {data}) => {
                if(data){
                    
                    const {ModifyDrivingStatus} = data;
                    if(!ModifyDrivingStatus.ok){
                        toast.error(ModifyDrivingStatus.error, {hideProgressBar:true, className: css({
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
                            user.isDriving = isDriving;
                            user.driverModeOn = driverModeOn;
                        }
                    }
                    
                    cache.writeQuery({
                        query:USER_PROFILE, data:query
                    });
                }

            }
            }
            >
                {modifyDrivingStatusFn => {
                    this.drivingStatusMutation = modifyDrivingStatusFn;
                    
                    return(
                    <ProfileQuery query={USER_PROFILE} fetchPolicy={"network-only"} onCompleted={this.updateFields}>
                    {
                        ({data, loading}) => (<MenuPresenter data={data} loading={loading} onSelectChange={this.onSelectChange}/>)
                    }
                </ProfileQuery>)
                }}
            
            </ModifyDrivingStatusMutation>
        );

    }
    
    public onSelectChange = (ev)=>{
       
        let driverModeOn = false;
        let event:any;
        if(ev.event === undefined){
            event = ev
        } else {
            event = ev.event
        }
            
            const target = event.target;
            
            const value = target.value;
            const name = target.name;
        
        if(name==="isDriving"){ // for toggle driving mode button
            
            this.setState({
                isDriving: !this.state.isDriving
            }as any, ()=> {
                
                this.drivingStatusMutation({
                variables:{
                    driverModeOn: this.state.driverModeOn,
                    isDriving: this.state.isDriving
                }
            })});
        } // this is bug of ts. so just use "as any".
        else if(name==="driverModeOn"){ // for radio button 
            
            if(value==="Driver"){
                driverModeOn = true;
                this.setState({
                    driverModeOn
                    
                }as any,()=> {
                    this.drivingStatusMutation({
                    variables:{
                        driverModeOn: this.state.driverModeOn,
                        isDriving: this.state.isDriving
                    }
                })});
            }else if(value==="Customer"){
                const isDrivingNow = this.state.isDriving
                driverModeOn = false;
                this.setState({
                    driverModeOn,
                    isDriving:false
                }as any,()=> {
                    this.drivingStatusMutation({
                    variables:{
                        driverModeOn: this.state.driverModeOn,
                        isDriving: this.state.isDriving
                    }
                })});
                if(isDrivingNow===true){
                    toast.error("Automatically cancel the drive.", {hideProgressBar:true, className: css({
                        background: "#efeff2 !important",
                        color:"#a1887f",
                        fontSize:14
                    })});
                }

            }
            

        }

    }

    public updateFields = (data:{}|userProfile) =>{
       
        if("GetMyProfile" in data){
            
            
            const {GetMyProfile:{user}} = data;
            if(user !== null){
                
                const {firstName, lastName, email, profilePhoto, isDriving, driverModeOn} = user;
                this.setState(
                    {firstName, lastName, email, profilePhoto,isDriving, driverModeOn} as any
                )
            }

        }
        
        
    }
}

export default MenuContainer;