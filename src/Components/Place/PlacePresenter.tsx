import React from "react";
import { MutationFn } from "react-apollo";
import styled from "../../typed-components";

const Place = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
  & i {
    font-size: 12px;
  }
`;

const Container = styled.div`
    display:grid;

    grid-auto-flow:row;
    grid-gap:10px;
`;

const Name = styled.span`
  display: block;
`;

const Icon = styled.span`
  cursor: pointer;
  margin-right:20px;
  font-size:25px;
`;

const Address = styled.span`
  color: ${props => props.theme.greyColor};
  font-size: 14px;
  
`;

interface IProps {
  fav: boolean;
  name: string;
  address: string;
  onStarPress: MutationFn;
}

const PlacePresenter: React.SFC<IProps> = ({
  onStarPress,
  fav,
  name,
  address
}) => (
  <Place>
    <Icon onClick={onStarPress as any}>{fav ? "★" : "✩"}</Icon>
    <Container>
      <Name>{name}</Name>
      <Address>{address}</Address>
    </Container>
  </Place>
);

export default PlacePresenter;