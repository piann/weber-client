import React from "react";
import { Link } from "react-router-dom";
import styled from "../../typed-components";

const Container = styled.div`
  transform: scale(0.8);
  margin-left: 14px;
  margin-right:23px;
  padding-top:3px;
`;

interface IProps {
  backTo: string;
  className?: string;
  color?: string;
}

const BackArrow: React.SFC<IProps> = ({ backTo, className, color}) => (
  <Container className={className}>
    <Link to={backTo}>
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
    <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" fill={color}/></svg>
    </Link>
  </Container>
);

export default BackArrow;