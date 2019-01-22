import React from "react";
import styled from "../../typed-components";
import { Link } from "react-router-dom";

// import image
import direction from "../../images/direction.jpg"
import emptyProfile from "../../images/emptyProfile.svg";
import trip from "../../images/trip.svg";
import setting from "../../images/setting.svg";
import edit from "../../images/edit.svg";
import {toggleDriving, userProfile} from 'src/types/api';
import {MutationFn} from "react-apollo";


const Container = styled.div`

`;

const MenuHeader = styled.div`
    background: url(${direction});
    background-size:cover;
    
    height: 210px;
    

`;


const CloudWrapper = styled.div`
    padding-left:17px;
    padding-right:17px;
    height:210px;
    background-color: rgba(0,0,0,0.7);
    display:grid;
    align-items:center;
    grid-template-columns: 1fr 2fr;
    grid-gap: 20px;
`;

const ProfileCircle = styled.div`
  height: 88px;
  width: 88px;
  background-color: #eaeee8;
  border-radius: 40px;
  overflow: hidden;
  display:flex;
  align-items:center;
  justify-content:center;
`;

const ProfileImage = styled.img`
    height:63px;
    width:63px;
`;

const FacebookImage = styled.img`
    height:90px;
    width:90px;
`;

const Text = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const Name = styled.h2`
  font-size: 22px;
  color: white;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Rating = styled.h5`
  font-size: 18px;
  color: white;
`;

const SLink = styled(Link)`
  font-size: 21px;
  display: block;
  margin-left: 15px;
  margin-top:26px;
  margin-bottom: 26px;
  font-weight: 400;
`;

interface IToggleProps{
    isDriving:boolean;
}

const ToggleDriving = styled<IToggleProps&any>("button")`
  -webkit-appearance: none;
  width: 100%;
  color: white;
  background-color:${props=> props.isDriving? props.theme.yelloColor :props.theme.blueColor};
  font-size: 20px;
  border: 0;
  padding: 15px 0px;
  cursor: pointer;
`;

const SmallIcon = styled.img`
    width: 18px;
    height:18px;
    margin-right:13px;
`;

interface IProps{
    data?:userProfile;
    loading:boolean;
    toggleDrivingFn:MutationFn<toggleDriving>;
}

const MenuPresenter:React.SFC<IProps> = ({
    data:{GetMyProfile:{user=null}={}}={}, loading, toggleDrivingFn
    }) =>(
    <Container>
        {!loading && user &&
        (<React.Fragment>
            <MenuHeader>
                <CloudWrapper>
                    <ProfileCircle>
                        {user.profilePhoto? <FacebookImage src={user.profilePhoto}/>:<ProfileImage src={emptyProfile}/> }
                    </ProfileCircle>
                    <Text>
                        <Name>{user.fullName || "Name Unknown"}</Name>
                        <Rating>3.7</Rating>
                    </Text>
                </CloudWrapper>
                <SLink to="/edit-account"><SmallIcon src={edit}/>Edit Account</SLink>
                <SLink to="/trips"><SmallIcon src={trip}/>Your Trips</SLink>
                <SLink to="/settings"><SmallIcon src={setting}/>Settings</SLink>
                <ToggleDriving isDriving={user.isDriving} onClick={toggleDrivingFn}>{user.isDriving? "Stop Driving":"Start Driving"}</ToggleDriving>
            </MenuHeader>

        </React.Fragment>)
        }

    </Container>

)



export default MenuPresenter;