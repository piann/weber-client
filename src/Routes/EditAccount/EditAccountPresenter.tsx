import React from "react";
import Helmet from "react-helmet";
import styled from "../../typed-components";
import HeaderBar from 'src/Components/HeaderBar';
import Form from "../../Components/Form";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import {MutationFn} from "react-apollo";
import PhotoInput from 'src/Components/PhotoInput/PhotoInput';

const Container = styled.div`
    height:100vh;
`;

const Headline = styled.div`

`;

const FormExtended = styled(Form)`
  padding: 0px 40px;
`;

const InputExtended = styled(Input)`
  margin-bottom: 30px;
`;

const CenterDiv = styled.div`
    display:flex;
    justify-content:center;
`;

const Spin = styled.div`
    margin-top:40vh;
`;

interface IProps{
    firstName:string
    lastName:string
    email:string
    profilePhoto?:string
    onInputChange: (event:any) => void;
    onSubmit:MutationFn
    loading:boolean
    uploading:boolean
}

const EditAccountPresenter: React.SFC<IProps> = ({firstName, lastName, email, profilePhoto, onInputChange, onSubmit, loading, uploading}) =>{

    return( 
        <Container>
            {loading?
            <CenterDiv>
                <Spin className="fa fa-spinner fa-spin"/>
            </CenterDiv> :
            <React.Fragment>
            <Helmet>
                <title>Edit Account | Weber</title>
            </Helmet>
            <Headline>
                <HeaderBar backTo={"/"} text={"Edit Account"}/>
            </Headline>
            <FormExtended submitFn={onSubmit}>
            <PhotoInput uploading={uploading} fileUrl={profilePhoto || ""} onChange={onInputChange}/>
            <InputExtended
            onChange={onInputChange}
            type={"text"}
            value={firstName}
            placeholder={"First name"}
            name={"firstName"}
            />
            <InputExtended
            onChange={onInputChange}
            type={"text"}
            value={lastName}
            placeholder={"Last name"}
            name={"lastName"}
            />
            <InputExtended
            onChange={onInputChange}
            type={"email"}
            value={email}
            placeholder={"Email"}
            name={"email"}
            />
            <Button onClick={null} value={"Complete"} />
            </FormExtended>
            </React.Fragment>
        }
        </Container>
        
    );
}

export default EditAccountPresenter;