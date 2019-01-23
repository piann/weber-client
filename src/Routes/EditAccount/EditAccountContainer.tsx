import React from "react";
import EditAccountPresenter from "./EditAccountPresenter";
import { RouteComponentProps } from 'react-router';


interface IState {
    firstName: string
    lastName:string
    email:string
}
interface IProps extends RouteComponentProps<any>{}

class EditAccountContainer extends React.Component<IProps, IState>{
    public state ={
        firstName:"",
        lastName:"",
        email:"",
    }   
    render(){
        const{firstName, lastName, email} = this.state;
        return(
            <EditAccountPresenter
                firstName={firstName}
                lastName={lastName}
                email={email}
                onInputChange={this.onInputChange}
                loading={true}
            />
        )
    };

    public onInputChange: React.ChangeEventHandler<HTMLInputElement> = ev =>{
        const {target : {name, value}} = ev;
        this.setState({[name]:value} as any);
    };
}
export default EditAccountContainer;