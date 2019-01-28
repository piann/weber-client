import React from "react";
import {getPlaces} from "../../types/api";
import styled from "../../typed-components";
import Helmet from "react-helmet";
import HeaderBar from '../../Components/HeaderBar';

const Container = styled.div``;

const CenterDiv = styled.div`
    display:flex;
    justify-content:center;
`;

const Spin = styled.div`
    margin-top:40vh;
`;

const Text = styled.div`

`;

interface IProps{
    data?:getPlaces
    loading:boolean
}

const PlacesPresenter:React.SFC<IProps> = ({
    data:{GetMyPlace:{places=null}={}}={}, loading
})=>(

    <Container>
        <Helmet>
            <title>Places | Weber</title>
        </Helmet>
        <HeaderBar backTo={"/"} text={"Places"}/>
        {loading &&
        <CenterDiv>
            <Spin className="fa fa-spinner fa-spin"/>
        </CenterDiv> :
        }
        {(!loading && places && places.length===0)?
        <Text>Add Some Place</Text>:
        /*
        places.map(place=>(
            <Place
             key={place!.id}
             fav={place!.isFav}
             name={place!.name}
             address={place!.address}
            />
        ))
        */
        <></>
        }
        
    </Container>


)



export default PlacesPresenter;