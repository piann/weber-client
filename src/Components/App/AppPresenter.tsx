import PropTypes from "prop-types";
import React from "react";
import {
    BrowserRouter,
    Redirect,
    Route,
    Switch
} from "react-router-dom";

import Login from "../../Routes/Login";
import Home from "../../Routes/Home";
// import SocialLogin from "../../Routes/SocialLogin";
import PhoneLogin from "../../Routes/PhoneLogin";
import AddPlace from "../../Routes/AddPlace";
import EditAccount from "../../Routes/EditAccount";
import FindAddress from "../../Routes/FindAddress";
import Places from "../../Routes/Places";
import Ride from "../../Routes/Ride";
// import Settings from "../../Routes/Settings";
import VerifyPhone from "../../Routes/VerifyPhone";
import Chat from "../../Routes/Chat";

interface IProps{
    isLoggedIn:boolean;
}

// const AppPresenter:React.SFC<IProps> = ({isLoggedIn}) =>
//    isLoggedIn ? <span>U R In!</span>:<span>U R Out!</span>;
const AppPresenter:React.SFC<IProps> = ({isLoggedIn}) => 
<BrowserRouter>{isLoggedIn ?<LoggedInRoutes/>:<LoggedOutRoutes/>}</BrowserRouter>


const LoggedOutRoutes: React.SFC = () => (
    <Switch>
        <Route path ={"/"} exact={true} component={Login} />
        {/*<Route path ={"/social-login"} component={SocialLogin} />*/}
        <Route path ={"/phone-login"} component={PhoneLogin} />
        <Route path ={"/verify-phone"} component={VerifyPhone} />
        
        <Redirect from={"*"} to={"/"} />
    </Switch>
);

    const LoggedInRoutes: React.SFC = () => (
    <Switch>
        <Route path ={"/"} exact={true} component={Home} />
        <Route path ={"/edit-account"} component={EditAccount} />
        <Route path ={"/places"} component={Places} />
        <Route path ={"/find-address"} component={FindAddress} /> 
        <Route path ={"/add-place"} component={AddPlace} />
        <Route path ={"/ride/:rideId"} component={Ride} />
        <Route path ={"/chat/:chatId"} exact={true} component={Chat} />
        {/*<Route path ={"/settings"} component={Settings} />
        <Redirect from={"*"} to={"/"} />*/}

    </Switch>
);

AppPresenter.propTypes = {
    isLoggedIn:PropTypes.bool.isRequired
}

export default AppPresenter;