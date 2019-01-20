import React from "react";
import styled from "../../typed-components";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';


const SocialLogin = styled.div`
  border-top: 1px solid ${props => props.theme.greyColor};
  padding: 30px 20px;
`;

const SocialLink = styled.span`
  color: ${props => props.theme.greenColor};
  font-size: 16px;
  cursor: pointer;
`;

const Fb = styled.span`
  color: #3b5998;
  font-weight:600;
`

interface IProps {
  loginCallback: (response) => void;
}


const SocialLoginPresenter: React.SFC<IProps> = ({loginCallback}) => (
    <FacebookLogin
    appId="771223983234768"
    autoLoad="false"
    callback={loginCallback}
    render={renderProps => (
      <SocialLogin>
      
      <SocialLink onClick={renderProps.onClick}>Or connect with <Fb>Facebook</Fb></SocialLink>
     
      </SocialLogin>
    )}
    />
);

export default SocialLoginPresenter;