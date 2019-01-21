import React from "react";
import Helmet from "react-helmet";
import styled from "../../typed-components";
import Sidebar from "react-sidebar";
import MenuContainer from 'src/Components/Menu';

const Container = styled.div`

`;

const SideBarButton = styled.svg`
    float:right;
    margin-top:18px;
    margin-right:18px;
`;


interface IProps{
    isMenuOpen:boolean;
    toggleMenu:()=>void;
    loading:boolean;
}



const HomePresenter: React.SFC<IProps> = ({isMenuOpen, toggleMenu, loading}) => {
    
    return (
    <Container>
        <Helmet>
            <title>Home | Weber</title>
        </Helmet>
        <Sidebar
        open={isMenuOpen}
        sidebar={<MenuContainer/>}
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
    </Container>
)};

export default HomePresenter;