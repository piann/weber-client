import React from "react";
import Helmet from "react-helmet"; 
// import {RouteComponentProps} from 'react-router-dom';
import styled from "../../typed-components";
import BackArrow from "../../Components/BackArrow";
import countries from "../../countries";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import whiteCar from "../../images/whiteCar.png";

const Container = styled.div`
    min-height: 600px;
    height : 100vh;
    background:url(${whiteCar});
    background-size:cover;
    
`;

const Title = styled.div`
  padding-top:35px;
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
  height: 340px;
  background-color: whitesmoke;
  opacity:0.65;
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

const PhoneLoginPresenter = () => (
    <Container>
    <Helmet>
      <title>Phone Login</title>
    </Helmet>
    <BackArrow backTo={"/"} />
    <Card>
    <Title>Enter your Mobile Number</Title>
    <CountrySelect>
      {countries.map((country, index) => (
          <CountryOption key={index} value={country.dial_code}>
          {country.flag} {country.name} ({country.dial_code})
        </CountryOption>
      ))}
    </CountrySelect>
    <FormExtended >
      <InputTrans
        placeholder={"01012345678 (No hyphen)"}
        />
      <ButtonExtended value="Send SMS Verification">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={"white"}
            >
            <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
          </svg>
      </ButtonExtended>
    </FormExtended>
    </Card>
  </Container>
);  

export default PhoneLoginPresenter;