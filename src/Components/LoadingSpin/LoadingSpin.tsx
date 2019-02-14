import styled from "../../typed-components";
import React from "react";

const Spin = styled.div`
    margin-top:30px;
    margin-bottom: 10px;
    margin-right:50px;
    margin-left:50px;
    font-size:25px;
`;

const LoadingSpin:React.SFC = () => (
    <Spin className="fa fa-spinner fa-spin"/>
);

export default LoadingSpin;