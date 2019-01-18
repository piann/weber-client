import React from "react";
// import { RouteComponentProps } from "react-router-dom";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { RouteComponentProps } from 'react-router-dom';
import {toast} from "react-toastify";
import {css} from "glamor";

interface IState{
    countryCode:string;
    phoneNumber:string;
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
        return <PhoneLoginPresenter 
        countryCode={countryCode}
        phoneNumber={phoneNumber}
        onInputChange={this.onInputChange}
        onSubmit={this.onSubmit}
        />;
    }

    public onInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (ev) => {
        const {target:{name,value}} = ev;
        this.setState({
            [name]: value,

        }as any) // this is bug of ts. so just use "as any".

    }

    public onSubmit:React.FormEventHandler<HTMLFormElement> = (ev) =>{
        const {countryCode, phoneNumber} = this.state;
        // tslint:disable-next-line
        const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(`${countryCode}${phoneNumber}`);
        // tslint:disable-next-line
        if(isValid){
            return;
        } else {
            toast.warn("Please input a valid phone number",{hideProgressBar:true, className: css({
                background: "#efeff2 !important",
                color:"#a1887f"
            })});
        }
        

    }

}

export default PhoneLoginContainer;