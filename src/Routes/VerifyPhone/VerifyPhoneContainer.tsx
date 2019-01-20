import React from "react";
import {RouteComponentProps} from "react-router-dom";
import { Mutation } from 'react-apollo';
import { verifyPhone, verifyPhoneVariables } from 'src/types/api';
import VerifyPhonePresenter from './VerifyPhonePresenter';
import { VERIFY_PHONE } from './VerifyPhoneQueries';
import { toast } from 'react-toastify';
// import VerifyPhonePresenter from "./VerifyPhonePresenter";
import {css} from "glamor";
import { LOG_USER_IN } from 'src/sharedQueries.local';

interface IProps extends RouteComponentProps<any>{

}

interface IState{
    verificationCode: string;
    phoneNumber:string;
    processing:boolean;
}

class VerifyMutation extends Mutation<verifyPhone, verifyPhoneVariables>{

}

class VerifyPhoneContainer extends React.Component<IProps, IState>{
    
    constructor(props:IProps){
        super(props);
        if(!props.location.state){
            props.history.push("/");
            this.state = {
                verificationCode:"",
                phoneNumber:"",
                processing:false
            }
        }
        else{
        this.state = {
            verificationCode:"",
            phoneNumber:props.location.state.fullNumber,
            processing:false
        }
        }
    }
    public render(){
        
        const {verificationCode, phoneNumber} = this.state;
        return (
        <Mutation mutation={LOG_USER_IN}>
            {(logUserIn) => (
                <VerifyMutation mutation={VERIFY_PHONE} 
                variables={
                    {key:verificationCode, phoneNumber}
                }
                onCompleted={(data=>{
                    const {CompletePhoneVerification} = data;
                    if(CompletePhoneVerification.ok){
                        if(CompletePhoneVerification.token){
                            logUserIn({variables:{
                                token:CompletePhoneVerification.token
                            }});
                        }
                        this.setState({processing:true});
                        toast.success("Success! Now you are logged in...", {autoClose:1300, className: css({
                            background: "#efeff2 !important",
                            color:"#a1887f",
                            fontSize:14
                        })} )
                        
                    } else {
                        toast.error(CompletePhoneVerification.error, {hideProgressBar:true, className: css({
                            background: "#efeff2 !important",
                            color:"#a1887f",
                            fontSize:14
                        })} )
                    }
                })}
                >
                {
                    (mutation, {loading}) =>(
                        <VerifyPhonePresenter onSubmit={mutation} onChange={this.onInputChange} verificationCode={verificationCode} loading={loading} processing={this.state.processing}/>
                    )
                        
                    
                }
                </VerifyMutation>
            )}

        </Mutation>
        );
    }

    public onInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (ev) => {
        const {target:{name,value}} = ev;
        this.setState({
            [name]: value,

        }as any) // this is bug of ts. so just use "as any".

    }

}

export default VerifyPhoneContainer;