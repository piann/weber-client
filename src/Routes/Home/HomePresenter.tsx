import React from "react";
import Helmet from "react-helmet";
import styled from "../../typed-components";
import Sidebar from "react-sidebar";
import Menu from 'src/Components/Menu';

const Container = styled.div`

`;

const SideBarButton = styled.svg`
    position:absolute;
    
    padding-top:19px;
    padding-right:17px;
    z-index:5;
`;

const Map = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index:0;
`;

const AdjRight = styled.div`
    display:flex;
    justify-content: flex-end;
`;

interface IProps{
    isMenuOpen:boolean;
    toggleMenu:()=>void;
    loading:boolean;
    mapRef:any;
    toAddress:string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onAddressSubmit:any;
}



const HomePresenter: React.SFC<IProps> = ({isMenuOpen, toggleMenu, loading, mapRef, toAddress, onInputChange, onAddressSubmit}) => {
    
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
            zIndex:"10"
         } }}
        >

        {!loading && 
        <AdjRight>
        <SideBarButton onClick={toggleMenu} xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 24 24">
            <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/> 
        </SideBarButton></AdjRight>}
      <Map ref={mapRef}/>
      </Sidebar>
    </Container>
)};

export default HomePresenter;