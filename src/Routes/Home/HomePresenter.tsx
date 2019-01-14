import React from "react";
import { RouteComponentProps } from 'react-router-dom';



interface IProps extends RouteComponentProps<any>{
}

const HomePresenter: React.SFC<IProps> = () => (<span>stuff</span>);

export default HomePresenter;