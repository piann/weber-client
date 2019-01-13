import React from "react";
import {graphql} from "react-apollo";
import AppPrensenter from "./AppPresenter";
import {IS_LOGGED_IN} from "./AppQueries";

const AppContainer = ({data}) => <AppPrensenter isLoggedIn={data.auth.isLoggedIn}/>;

export default graphql(IS_LOGGED_IN)(AppContainer);