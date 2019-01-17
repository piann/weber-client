import React from "react";
import Helmet from "react-helmet"; 
import { RouteComponentProps} from 'react-router-dom';
import styled from "../../typed-components";

const Container = styled.div`
    height : 100vh;
`;


interface IProps extends RouteComponentProps<any>{
}

const PhoneLoginPresenter: React.SFC<IProps> = () => (
    <Container>
        <Helmet>
            <title>pho</title>
        </Helmet>
        phoneLogin
    </Container>    
);

export default PhoneLoginPresenter;