import React from "react";
import Helmet from "react-helmet";
import styled from "../../typed-components";
import Sidebar from "react-sidebar";
import Menu from 'src/Components/Menu';
import AddressBar from "../../Components/AddressBar";
import Button from "../../Components/Button";

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

const AddressBarEx = styled(AddressBar)`
    top: 10px;
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

const FlexLeft = styled.div`
    display:flex;
    justify-content: flex-start;
`;

const FlexRight = styled.div`
    display:flex;
    justify-content: flex-end;
`

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
            zIndex:"15"
         } }}
        >

        {!loading &&
        <React.Fragment>
        <FlexLeft>
            <AddressBarEx
            placeholder={"Where to go?"}
            value={toAddress}
            name={"toAddress"}
            onChange={onInputChange}
            onBlur={()=>null}
        />
        </FlexLeft>
        <FlexRight>
        <SideBarButton onClick={toggleMenu} xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 24 24">
            <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/> 
        </SideBarButton>
        </FlexRight>
        </React.Fragment>}
      </Sidebar>
      <Map ref={mapRef}/>
      {<ButtonExtended onClick={onAddressSubmit} value={"PICK THIS PLACE"} disabled={toAddress===""}/>}
    </Container>
)};

export default HomePresenter;