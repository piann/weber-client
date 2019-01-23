import React from "react";
import Helmet from "react-helmet"; 
// import {RouteComponentProps} from 'react-router-dom';
import styled from "../../typed-components";
// import HeaderBar from "../../Components/HeaderBar";
import countries from "../../countries";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import whiteCar from "../../images/whiteCar.png";
import BackArrow from 'src/Components/BackArrow';
import LoadingSpin from 'src/Components/LoadingSpin';

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
  top:110px;
  left:0;
  right:0;
  margin-left:auto;
  margin-right:auto;
  width: 320px;
  height: 330px;
  background-color: rgba(245,245,245,0.35);
  border-radius: 10px;
  display: flex;
  flex-direction:column;
  
  align-items: center;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 -14px 28px rgba(0, 0, 0, 0.22);
`;


const CountrySelect = styled.select`
  margin-left:20px;
  font-size: 17px;
  color: "#2c3e50";
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: white;
  border: 0;
  font-family: "Maven Pro";
  margin-bottom: 20px;
  width: 90%;
  background:transparent;
`;

const CountryOption = styled.option``;



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

const BackArrowExtended = styled(BackArrow)`
  position:absolute;
  top:16px;
  left:12px;
`;


interface IProps{
    countryCode:string;
    phoneNumber: string;
    onInputChange: (ev: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => void;
    onSubmit: (ev: React.FormEvent<HTMLFormElement>) =>void;
    loading:boolean;
}

const PhoneLoginPresenter:React.SFC<IProps> = ({countryCode, phoneNumber, onInputChange, onSubmit, loading}) => (// add code for loading state
    <Container>
    <Helmet>
      <title>Phone Login</title>
    </Helmet>
    <BackArrowExtended backTo={"/"}/>
    <Card>
    <Title>Enter your Mobile Number</Title>
    <CountrySelect value={countryCode} name={"countryCode"} onChange={onInputChange}>
      {countries.map((country, index) => (
          <CountryOption key={index} value={country.dial_code}>
          {country.flag} {country.name} ({country.dial_code})
        </CountryOption>
      ))}
    </CountrySelect>
    <FormExtended submitFn={onSubmit}>
      {loading?
      <LoadingSpin/>
      :<InputTrans
      placeholder={"01012345678 (No hyphen)"}
      required={true}
      value={phoneNumber}
      name={"phoneNumber"}
      onChange={onInputChange}
      />
     }
      
      {loading ?
         <div/>
         :<ButtonExtended value="Send SMS Verification"/>
      }
      
    </FormExtended>
    </Card>
  </Container>
);  


export default PhoneLoginPresenter;