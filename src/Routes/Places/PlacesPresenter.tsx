import React from "react";
import {getPlaces} from "../../types/api";
import styled from "../../typed-components";
import Helmet from "react-helmet";
import HeaderBar from '../../Components/HeaderBar';
import Place from "../../Components/Place";
import Plus from "../../images/plus.png";
import {Link} from "react-router-dom";

const Container = styled.div``;

const CenterDiv = styled.div`
    display:flex;
    justify-content:center;
`;

const Spin = styled.div`
    margin-top:40vh;
`;


const BodyContainer = styled.div`
    margin-left:15px;
    margin-bottom:50px;
`;

const Margin = styled.span`
    margin:5px;
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
        
        {!loading && places && 
        places!.map(place=>(
            <Place
             key={place!.id}
             id={place!.id}
             fav={place!.isFav}
             name={place!.name}
             address={place!.address}
            />
        ))
        }
        </BodyContainer>
        <CenterDiv>
            <Link to={"/find-address"}>
            <img src={Plus} width="20px" height="20px"/>
            </Link>
            <Margin/>
            {!loading && places && places.length===0 && "Add New Place"}
            {!loading && places && "Add More Place"}
        </CenterDiv>
        
    </Container>


)



export default PlacesPresenter;