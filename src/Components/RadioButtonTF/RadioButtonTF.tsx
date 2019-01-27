import React from "react";
import {RadioButton} from "gestalt";
import styled from "../../typed-components";

const Container = styled.div`
    margin-top:20px;
    margin-bottom:40px;
    width:100%;
    display:flex;
    justify-content:center;
    flex-direction: center;
`;

const Text = styled.div`
    margin-left:10px;
    margin-right:10px;
`;

interface IProps{
    driverModeOn:boolean
    onSelectChange:any
}


const RadioButtonTF:React.SFC<IProps> = ({driverModeOn, onSelectChange})=>{

    return(
        <Container>
            <RadioButton
            checked={driverModeOn === false}
            id="customerMode"
            name="driverModeOn"
            onChange={onSelectChange} 
            value="Customer"
            />
            <Text>Customer</Text>
            <RadioButton
            checked={driverModeOn === true}
            id="driverMode"
            name="driverModeOn"
            onChange={onSelectChange} 
            value="Driver"
            />
            <Text>Driver</Text>
        </Container>
    );
}

export default RadioButtonTF;