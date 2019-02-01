import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import HeaderBar from "../../Components/HeaderBar";
import Input from "../../Components/Input";
import styled from "../../typed-components";
import LoadingSpin from 'src/Components/LoadingSpin';

const Container = styled.div`
  padding: 0 40px;
`;

const InputExtended = styled(Input)`
  margin-bottom: 40px;
  
`;


interface IProps{
    loading:boolean
    name:string
    address:string
    onChange:(ev:React.ChangeEvent<HTMLInputElement>) => void; 
    onSubmit:MutationFn
    isAddressPicked:boolean
}

const AddPlacePresenter:React.SFC<IProps> = ({loading, name, address, onChange, onSubmit, isAddressPicked})=>{

    return(<React.Fragment>
        <Helmet>
            <title>Add Place | Weber</title>
        </Helmet>
        <HeaderBar backTo={"/"} text={"Add Place"}/>
        <Container>
        {loading?<LoadingSpin/>:
        <Form submitFn={onSubmit}>
        <InputExtended
          placeholder={"Name (ex: Home, Company)"}
          type={"text"}
          onChange={onChange}
          value={name}
          name={"name"}
        />
        <InputExtended
          placeholder={"Address"}
          type={"text"}
          onChange={onChange}
          value={address}
          name={"address"}
        />
        
        {isAddressPicked && (
          <Button
            onClick={null}
            value={"Add Place"}
          />
        )}
        </Form>
        }
        </Container>
        
    </React.Fragment>)
}

export default AddPlacePresenter;