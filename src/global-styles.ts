import reset from "styled-reset";
import {createGlobalStyle} from "./typed-components";


// tslint:disable-next-line
// font-family: 'Shadows Into Light', cursive;
// font-family: 'Nunito Sans', sans-serif;
// font-family: 'Baloo Thambi', cursive;
// font-family: 'Alegreya Sans SC', sans-serif;
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Maven+Pro');
@import url('https://fonts.googleapis.com/css?family=Shadows+Into+Light');
@import url('https://fonts.googleapis.com/css?family=Nunito+Sans|Shadows+Into+Light');
@import url('https://fonts.googleapis.com/css?family=Baloo+Thambi');
@import url('https://fonts.googleapis.com/css?family=Alegreya+Sans+SC');


    ${reset}
    * {
        box-sizing: border
    }
    body{
        font-family: 'Maven Pro', sans-serif;
    }
    a{
        color:inherit;
        text-decoration:none;
    }
    input,
    button{
        &:focus,
        &:active{outline:none}
    }
`

export default GlobalStyle;