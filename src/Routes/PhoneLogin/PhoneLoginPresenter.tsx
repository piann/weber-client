import React from "react";
import Helmet from "react-helmet"; 
// import {RouteComponentProps} from 'react-router-dom';
import styled from "../../typed-components";
import BackArrow from "../../Components/BackArrow";
import countries from "../../countries";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import polar from "../../images/polar.png";

const Container = styled.div`
    height : 100vh;
    background:url(${polar});
    background-size:cover;
    
`;

const Title = styled.div`
  padding-top:10vh;
  margin-left:20px;
  font-size: 22px;
  font-weight:500;
  margin-bottom: 40px;
`;

const CountrySelect = styled.select`
  margin-left:20px;
  font-size: 20px;
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
    margin-top:30px;
    
`;

const FormExtended = styled(Form)`
    display:flex;
    flex-direction:column;
    align-items:center;
`;

const InputTrans = styled(Input)`
    background:transparent;
`;

const PhoneLoginPresenter = () => (
    <Container>
    <Helmet>
      <title>Phone Login</title>
    </Helmet>
    <BackArrow backTo={"/"} />
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
        placeholder={"010 0000 0000 (exclude ' - ')"}
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
  </Container>
);  

export default PhoneLoginPresenter;