import React from "react";
import {getPlaces} from "../../types/api";
import styled from "../../typed-components";
import Helmet from "react-helmet";
import HeaderBar from '../../Components/HeaderBar';
import Place from "../../Components/Place";

const Container = styled.div``;

const CenterDiv = styled.div`
    display:flex;
    justify-content:center;
`;

const Spin = styled.div`
    margin-top:40vh;
`;

const Noti = styled.div`
    display:flex;
    justify-content:center;
`;

const BodyContainer = styled.div`
    margin-left:15px;
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
        </CenterDiv>
        }
        <BodyContainer>
        
        {!loading && places && places.length===0 && <Noti>Add Some Place</Noti>}
        {!loading && places && 
        places!.map(place=>(
            <Place
             id={place!.id}
             fav={place!.isFav}
             name={place!.name}
             address={place!.address}
            />
        ))
        }
        </BodyContainer>
        
    </Container>


)



export default PlacesPresenter;