import React from "react";
import EditAccountPresenter from "./EditAccountPresenter";
import { RouteComponentProps } from 'react-router';
import {Mutation, Query} from "react-apollo";
import { editAccountVariables, editAccount, userProfile } from 'src/types/api';
import { EDIT_ACCOUNT } from './EditAccountQueries';
import { USER_PROFILE } from 'src/sharedQueries';
import {toast} from "react-toastify";
import {css} from "glamor";

interface IState {
    firstName: string
    lastName:string
    email:string
}
interface IProps extends RouteComponentProps<any>{}

class EditAccountMutation extends Mutation<editAccount,editAccountVariables>{}

class ProfileQuery extends Query<userProfile>{}

class EditAccountContainer extends React.Component<IProps, IState>{
    public state ={
        firstName:"",
        lastName:"",
        email:"",
        profilePhoto:""
    };
       
    render(){
        const {history} = this.props;    
        const {firstName, lastName, email, profilePhoto} = this.state;
        return(
        <ProfileQuery query={USER_PROFILE} fetchPolicy={"cache-and-network"}
        onCompleted={this.updateFields}>
        {()=>
        (<EditAccountMutation mutation={EDIT_ACCOUNT} 
            onCompleted={
                data => {
                    const {UpdateMyProfile} = data;
                    if(UpdateMyProfile.ok){
                        toast.info("Profile updated !", {hideProgressBar:true, className: css({
                            background: "#efeff2 !important",
                            color:"#a1887f",
                            fontSize:14
                        })});
                        history.push({
                            pathname: "/",
                        });
                    } else if (UpdateMyProfile.error){
                        toast.error(UpdateMyProfile.error, {hideProgressBar:true, className: css({
                            background: "#efeff2 !important",
                            color:"#a1887f",
                            fontSize:14
                        })});

                    }
                }
            }
            variables={{
            firstName, lastName, email, profilePhoto
        }}>
        {(editAccountMutation,{loading})=>
            (<EditAccountPresenter
                firstName={firstName}
                lastName={lastName}
                email={email}
                profilePhoto={profilePhoto}
                onInputChange={this.onInputChange}
                loading={loading}
                onSubmit={editAccountMutation}
                />)
        }
        </EditAccountMutation>)

        }
        
        </ProfileQuery>
        )
    };

    public onInputChange: React.ChangeEventHandler<HTMLInputElement> = ev =>{
        const {target : {name, value}} = ev;
        this.setState({[name]:value} as any);
    };

    public updateFields = (data:{}|userProfile) =>{
        console.log("updateFields");
        if("GetMyProfile" in data){
            
            
            const {GetMyProfile:{user}} = data;
            if(user !== null){
                console.log(user);
                const {firstName, lastName, email, profilePhoto,} = user;
                this.setState(
                    {firstName, lastName, email, profilePhoto,} as any
                )
            }

        }
        
        
    }
}
export default EditAccountContainer;