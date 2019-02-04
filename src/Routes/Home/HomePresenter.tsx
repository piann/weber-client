import React from "react";
import Helmet from "react-helmet";
import styled from "../../typed-components";
import Sidebar from "react-sidebar";
import Menu from 'src/Components/Menu';
import SearchBar from "../../Components/SearchBar";
import Button from "../../Components/Button";
import { userProfile } from 'src/types/api';

const Container = styled.div`

`;

const SideBarButton = styled.svg`
    justify-self:flex-end;
    z-index:5;
    padding-top:22px;
    padding-right:18px;
`;

const Map = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index:0;
`;

const Blank = styled.div`
    width:75vw;
`;


const ButtonExtended = styled(Button)`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 5;
  height: auto;
  width: 210px;
  font-size:15px;
  border-radius:15px;
`;

const Flex = styled.div`
    width:100vw;
    display:flex;
    flex-direction:row;
    justify-content: space-between;
`;


interface IProps{
    isMenuOpen:boolean;
    toggleMenu:()=>void;
    loading:boolean;
    mapRef:any;
    toAddress:string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onAddressSubmit:any;
    price:string;
    userData?:userProfile;
}



const HomePresenter: React.SFC<IProps> = ({isMenuOpen, toggleMenu, loading, mapRef, toAddress, onInputChange, onAddressSubmit, price, userData}) => {
    return (
    <Container>
        <Helmet>
            <title>Home | Weber</title>
        </Helmet>
        
        <Sidebar
        open={isMenuOpen}
        sidebar={<Menu/>}
        pullRight={true}
        onSetOpen={toggleMenu}
        styles={{ sidebar: {
            width:"75%", 
            background: "white",
            zIndex:"15"
         } }}
        >

        
        <React.Fragment>
        <Flex>
        {!loading && !userData!.GetMyProfile!.user!.isDriving && !userData!.GetMyProfile!.user!.driverModeOn &&
            <SearchBar
            placeholder={"Where to go?"}
            value={toAddress}
            name={"toAddress"}
            onChange={onInputChange}
            onClick={onAddressSubmit}
            onBlur={()=>null}
        />}
        {!loading && userData!.GetMyProfile!.user!.driverModeOn &&
            <Blank/>
        }
        <SideBarButton onClick={toggleMenu} xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 24 24">
            <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/> 
        </SideBarButton>
        </Flex>
        </React.Fragment>
      </Sidebar>
      <Map ref={mapRef}/>
      {price!=="" && toAddress!==""&& <ButtonExtended value={"REQUEST RIDE"} disabled={toAddress===""}/>}}
    </Container>
)};

export default HomePresenter;