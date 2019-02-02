import React from "react";
import Helmet from "react-helmet";
import styled from "../../typed-components";
import Sidebar from "react-sidebar";
import Menu from 'src/Components/Menu';

const Container = styled.div`

`;

const SideBarButton = styled.svg`
    float:right;
    margin-top:19px;
    margin-right:20px;
`;

const Map = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

interface IProps{
    isMenuOpen:boolean;
    toggleMenu:()=>void;
    loading:boolean;
    mapRef:any;
}



const HomePresenter: React.SFC<IProps> = ({isMenuOpen, toggleMenu, loading, mapRef}) => {
    
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

        {!loading && <SideBarButton onClick={toggleMenu} xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24">
            <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/> 
        </SideBarButton>}
      </Sidebar>
      <Map ref={mapRef}/>
    </Container>
)};

export default HomePresenter;