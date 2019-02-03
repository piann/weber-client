import React from "react";
import styled from "../../typed-components";


const Container = styled.input`
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  margin: auto;
  background-color: none;
  border-radius: 5px;
  -webkit-appearance: none;
  z-index: 2;
  width: 75%;
  border: 0;
  font-size: 14px;
  padding: 15px 10px;
  box-shadow: 0 18px 35px rgba(50, 50, 93, 0.1), 0 8px 15px rgba(0, 0, 0, 0.07);
  
  height: auto;
`;


interface IProps{
    value:string;
    onBlur: ()=>void;
    name:string;
    onChange: (event:React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?:string;
}

const AddressBar :React.SFC<IProps> = ({value, onBlur, name, onChange, placeholder}) => (
    <Container
        value={value}
        onBlur={onBlur}
        onSubmit={onBlur}
        name={name}
        onChange={onChange}
        placeholder={placeholder||""}
    />
)


export default AddressBar;