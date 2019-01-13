import React, { Fragment } from "react";
import {graphql} from "react-apollo";
import AppPrensenter from "./AppPresenter";
import {IS_LOGGED_IN} from "./AppQueries";
import theme from '../../theme';
import {ThemeProvider } from '../../typed-components';

const AppContainer = ({data}) => (
<Fragment>
<ThemeProvider theme={theme}>
    <AppPrensenter isLoggedIn={data.auth.isLoggedIn}/>;
</ThemeProvider>
</Fragment>

);
export default graphql(IS_LOGGED_IN)(AppContainer);