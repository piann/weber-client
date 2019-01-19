import React from "react";
// import { RouteComponentProps } from "react-router-dom";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { RouteComponentProps } from 'react-router-dom';
import {toast} from "react-toastify";
import {css} from "glamor";
import {Mutation, MutationUpdaterFn} from "react-apollo";
import { PHONE_SIGN_IN } from './PhoneQueries.queries';
import { startPhoneVerificationVariables, startPhoneVerification } from 'src/types/api';

interface IState{
    countryCode:string;
    phoneNumber:string;
}

class PhoneSignInMutation extends Mutation<startPhoneVerification, startPhoneVerificationVariables>{

}


class PhoneLoginContainer extends React.Component<
    RouteComponentProps<any>,
    IState
    >{

    public state ={
        countryCode: "+82",
        phoneNumber:""
    }

    public render(){
        const {countryCode, phoneNumber} = this.state;
        return (
        <PhoneSignInMutation mutation={PHONE_SIGN_IN} variables={
            {phoneNumber:`${countryCode}${phoneNumber}`}
        }
        update={this.afterSubmit}
        >
        {(mutation, {loading}) => {
        const onSubmit:React.FormEventHandler<HTMLFormElement> = (ev) =>{
            // tslint:disable-next-line
            const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(`${countryCode}${phoneNumber}`);
            // tslint:disable-next-line
            if(isValid){
                mutation();
            } else {
                toast.warn("Please input a valid phone number",{hideProgressBar:true, className: css({
                    background: "#efeff2 !important",
                    color:"#a1887f"
                })});
            }
            
    
        };
        return(
        <PhoneLoginPresenter 
        countryCode={countryCode}
        phoneNumber={phoneNumber}
        onInputChange={this.onInputChange}
        onSubmit={onSubmit}
        loading={loading}
        />);
        }}
        </PhoneSignInMutation>
        );
    }

    public onInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (ev) => {
        const {target:{name,value}} = ev;
        this.setState({
            [name]: value,

        }as any) // this is bug of ts. so just use "as any".

    }

    public afterSubmit:MutationUpdaterFn = (cache, result:any) =>{
        const data:startPhoneVerification = result.data;
        const {StartPhoneVerification} = data;
        if(StartPhoneVerification.ok){
            return;
        } else {
            
            toast.error(StartPhoneVerification.error,{hideProgressBar:true, className: css({
                background: "#efeff2 !important",
                color:"#a1887f"
            })} );
        }    
    }

    

}

export default PhoneLoginContainer;