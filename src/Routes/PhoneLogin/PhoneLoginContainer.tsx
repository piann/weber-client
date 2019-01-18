import React from "react";
// import { RouteComponentProps } from "react-router-dom";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { RouteComponentProps } from 'react-router-dom';

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
        console.log(countryCode, phoneNumber);

    }

}

export default PhoneLoginContainer;