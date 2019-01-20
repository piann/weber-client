import React from "react";
import { Mutation, MutationFn} from "react-apollo";
import { facebookConnect, facebookConnectVariables} from "../../types/api";
import { FACEBOOK_CONNECT } from './SocialLoginQueries';
import SocialLoginPresenter from "./SocialLoginPresenter";
import {toast} from "react-toastify";
import {css} from "glamor";

class LoginMutation extends Mutation<
  facebookConnect,
  facebookConnectVariables
> {}

interface IState{
    firstName : string;
    lastName :string;
    email?: string;
    fbId: string;
}

class SocialLoginContainer extends React.Component<any,IState>{
    public state = {
        email: "",
        fbId: "",
        firstName: "",
        lastName: ""
      };
    public facebookMutation:MutationFn;

    public render(){
        return(
        <LoginMutation
            mutation={FACEBOOK_CONNECT}
            onCompleted={data => {
              const { FacebookConnect } = data;
              if (FacebookConnect.ok) {
                 alert("good")
              } else {
                toast.error(FacebookConnect.error);
              }
            }}
          >
            {(facebookMutation, { loading }) => {
              this.facebookMutation = facebookMutation;
              return (
                <SocialLoginPresenter loginCallback={this.loginCallback} />
              );
            }}
          </LoginMutation>
        )   
    }

    public loginCallback = response => {
        const { name, first_name, last_name, email, id, accessToken } = response;
        if (accessToken) {
          toast.success(`Welcome ${name}!`,{hideProgressBar:true, className: css({
            background: "#efeff2 !important",
            color:"#a1887f",
            fontSize:14
        })});
          this.facebookMutation({
            variables: {
              email,
              fbId: id,
              firstName: first_name,
              lastName: last_name
            }
          });
        } else {
          toast.error("Could not log you in 😔", {hideProgressBar:true, className: css({
            background: "#efeff2 !important",
            color:"#a1887f",
            fontSize:14
        })} );
        }
      };
}

export default SocialLoginContainer;