import styled from "../../typed-components";
import React from "react";

const Spin = styled.div`
    margin:auto;
    margin-top:30px;
    margin-bottom: 10px;
    right:0;
    left:0;
    font-size:25px;
`;

const LoadingSpin:React.SFC = () => (
    <Spin className="fa fa-spinner fa-spin"/>
);

export default LoadingSpin;