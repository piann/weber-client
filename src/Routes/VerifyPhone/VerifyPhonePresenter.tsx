import React from "react";
import Helmet from "react-helmet"; 
// import {RouteComponentProps} from 'react-router-dom';
import styled from "../../typed-components";
import BackArrow from "../../Components/BackArrow";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import whiteCar from "../../images/whiteCar.png";
import { MutationFn } from 'react-apollo';

const Container = styled.div`
    min-height: 600px;
    height : 100vh;
    background:url(${whiteCar});
    background-size:cover;
    
`;

const Title = styled.div`
  padding-top:36px;
  font-size: 22px;
  font-weight:500;
  margin-bottom: 40px;
`;

const Card = styled.div`
  position:absolute;
  top:80px;
  left:0;
  right:0;
  margin-left:auto;
  margin-right:auto;
  width: 320px;
  height: 250px;
  background-color: rgba(245,245,245,0.35);
  border-radius: 10px;
  display: flex;
  flex-direction:column;
  
  align-items: center;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 -14px 28px rgba(0, 0, 0, 0.22);
`;


const ButtonExtended = styled(Button)`
    margin-top:40px;
    background-color:rgba(0,0,0,1);
    
`;

const FormExtended = styled(Form)`
    display:flex;
    flex-direction:column;
    align-items:center;
`;

const InputTrans = styled(Input)`
    background:transparent;
    margin-top: 15px;
`;

const Spin = styled.div`
    margin-top:30px;
    margin-bottom: 10px;
    margin-right:50px;
    margin-left:50px;
    font-size:25px;
`;



interface IProps{
    verificationCode: string;
    onChange: (ev: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => void;
    onSubmit: MutationFn;
    loading:boolean;
    processing?:boolean;
}

const VerifyPhonePresenter:React.SFC<IProps> = ({verificationCode, onChange, onSubmit, loading, processing}) => (// add code for loading state
    <Container>
    <Helmet>
      <title>Verify</title>
    </Helmet>
    <BackArrow backTo={"/phone-login"} />
    <Card>
    <Title>Input your Verification Code</Title>

    <FormExtended submitFn={onSubmit}>
      {(loading||processing)?
      <Spin className="fa fa-spinner fa-spin"/>
      :<InputTrans
      placeholder={"5 digits"}
      required={true}
      value={verificationCode}
      name={"verificationCode"}
      onChange={onChange}
      />
     }
      
      {(loading||processing) ?
         <div/>
         :<ButtonExtended value="Check"/>
      }
      
    </FormExtended>
    </Card>
  </Container>
);  


export default VerifyPhonePresenter;