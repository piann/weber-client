import React from "react";
import Helmet from "react-helmet"; 
import { RouteComponentProps, Link} from 'react-router-dom';
import frontImg from "../../images/front.png";
import styled from "../../typed-components";

const Container = styled.div`
    height : 100vh;
`;

const Gate = styled.div`
    height:70vh;
    background:url(${frontImg});
    background-size:100% 100%;
    display:flex;
    justify-content:center;
`;

const Title = styled.h1``;

const Logo = styled.div`
  margin:16vh;
  width: 110px;
  height: 110px;
  background-color: ${props => props.theme.greenColor};
  opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 -14px 28px rgba(0, 0, 0, 0.22);
  font-family: 'Shadows Into Light', cursive;
  color: ${props => props.theme.indigoColor};
  font-weight: 300;
  font-size: 22px;
`;

const Content = styled.body`

`;
const Subtitle = styled.h2`
  font-size: 27px;
`;

const FakeInput = styled.div`
  margin: 50px 0px;
  font-size: 16px;
  font-weight: 200;
`;

const PhoneLogin = styled.div`
  padding: 20px;
`;

const Grey = styled.span`
  color: ${props => props.theme.greyColor};
  margin-left: 10px;
`;

const SocialLogin = styled.div`
  border-top: 1px solid ${props => props.theme.greyColor};
  padding: 30px 20px;
`;

const SocialLink = styled.span`
  color: ${props => props.theme.greenColor};
  font-size: 16px;
  cursor: pointer;
`;



interface IProps extends RouteComponentProps<any>{
}

const LoginPresenter: React.SFC<IProps> = () => (
    <Container>
    <Helmet>
      <title>Login | Weber</title>
    </Helmet>
    <Gate>
      <Logo>
        <Title>Weber</Title>
      </Logo>
    </Gate>
    <Content>
      
        <PhoneLogin>
          <Subtitle>Add Wing to Your Life</Subtitle>
          <Link to={"/phone-login"}>
          <FakeInput>
            🇰🇷 +82 <Grey>Enter your mobile number</Grey>
          </FakeInput>
          </Link>
        </PhoneLogin>
      
        <SocialLogin>
        <Link to={"/social-login"}>
          <SocialLink>Or connect with Facebook</SocialLink>
        </Link>
        </SocialLogin>
    </Content>
  </Container>    
);

export default LoginPresenter;