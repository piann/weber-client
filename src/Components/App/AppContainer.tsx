import React from "react";
import {graphql} from "react-apollo";
import AppPrensenter from "./AppPresenter";
import {IS_LOGGED_IN} from "./AppQueries";
import theme from '../../theme';
import {ThemeProvider } from '../../typed-components';
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const AppContainer = ({data}) => (
<React.Fragment>
<ThemeProvider theme={theme}>
    <>
    <AppPrensenter isLoggedIn={data.auth.isLoggedIn}/>
    </>
</ThemeProvider>
<ToastContainer draggable={true} position={"bottom-center"} className='toast-container'/>
</React.Fragment>

);
export default graphql(IS_LOGGED_IN)(AppContainer);