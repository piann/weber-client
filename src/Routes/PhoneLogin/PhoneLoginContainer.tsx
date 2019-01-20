import React from "react";
// import { RouteComponentProps } from "react-router-dom";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { RouteComponentProps } from 'react-router-dom';
import {toast} from "react-toastify";
import {css} from "glamor";
import {Mutation} from "react-apollo";
import { PHONE_SIGN_IN } from './PhoneQueries';
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
        const {history} = this.props;
        const {countryCode, phoneNumber} = this.state;
        let phoneNumberConverted = phoneNumber;
        if(phoneNumber.slice(0,2)==='01'){
            phoneNumberConverted = phoneNumber.slice(1,);
        }
        const fullNumber = `${countryCode}${phoneNumberConverted}`
        // tslint:disalbe-next-line
        console.log(fullNumber);
        return (
        <PhoneSignInMutation mutation={PHONE_SIGN_IN} variables={
            {phoneNumber:`${fullNumber}`}
        }
    
        onCompleted={data => {
            const {StartPhoneVerification} = data;
            if(StartPhoneVerification.ok){
                toast.success("SMS Sent!\n Redirecting you...", {autoClose:1900, className: css({
                    background: "#efeff2 !important",
                    color:"#a1887f",
                    fontSize:15
                })});
                setTimeout(() => {
                history.push({
                pathname: "/verify-phone",
                state: {
                  fullNumber
                }
              });
            }, 2000);
            } else {
                
                toast.error(StartPhoneVerification.error,{hideProgressBar:true, className: css({
                    background: "#efeff2 !important",
                    color:"#a1887f",
                    fontSize:14
                })} );
            }    
        }}
        >
        {(mutation, {loading}) => {
        const onSubmit:React.FormEventHandler<HTMLFormElement> = (ev) =>{
            
            
            
            const isValid = /^\+[1-9]{1}[0-9]{7,12}$/.test(fullNumber);
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



    

}

export default PhoneLoginContainer;